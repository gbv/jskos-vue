import { test, expect, vi } from "vitest"
import { mount, flushPromises } from "@vue/test-utils"
import { ConceptTree, Arrow, ItemList } from "../src/index.js"

const mountTree = props => mount(ConceptTree, { props })

test("ConceptTree", async () => {
  const concepts = [
    { uri: "http://test.org/1", narrower: [{ uri: "http://test.org/2" }] },
    { uri: "http://test.org/3" },
  ]
  const tree = mountTree({ concepts })

  // Check if ItemList is rendered
  expect(tree.findComponent(ItemList).exists()).toBe(true)

  // Initial state: 2 items (roots), narrower collapsed
  let items = tree.findComponent(ItemList).props("items")
  expect(items.length).toBe(2)
  expect(items[0].concept.uri).toBe("http://test.org/1")
  expect(items[1].concept.uri).toBe("http://test.org/3")
})

test("ConceptTree hierarchy expansion", async () => {
  const concepts = [
    {
      uri: "http://test.org/1",
      narrower: [
        { uri: "http://test.org/1/1" },
        { uri: "http://test.org/1/2" },
      ],
    },
  ]
  const tree = mountTree({ concepts })

  // Initially 1 item
  expect(tree.findAll(".jskos-vue-itemList-item").length).toBe(1)

  // Find the arrow and click it
  const arrows = tree.findAllComponents(Arrow)
  expect(arrows.length).toBe(1)
  await arrows[0].trigger("click")

  // Now should have 3 items
  expect(tree.findAll(".jskos-vue-itemList-item").length).toBe(3)

  // Check depth
  const depthSpacers = tree.findAll(".jskos-vue-conceptTree-depthSpacer")
  expect(depthSpacers.length).toBe(2)
})

test("ConceptTree updates when concepts prop changes", async () => {
  const tree = mountTree({
    concepts: [{ uri: "http://test.org/1" }],
  })

  let items = tree.findComponent(ItemList).props("items")
  expect(items.map((i) => i.concept.uri)).toEqual(["http://test.org/1"])

  await tree.setProps({
    concepts: [
      { uri: "http://test.org/2" },
      { uri: "http://test.org/3" },
    ],
  })

  items = tree.findComponent(ItemList).props("items")
  expect(items.map((i) => i.concept.uri)).toEqual([
    "http://test.org/2",
    "http://test.org/3",
  ])
})

test("ConceptTree loads top concepts from registry and scheme", async () => {
  const registry = {
    getTop: vi.fn().mockResolvedValue([
      { uri: "http://test.org/top1" },
      { uri: "http://test.org/top2" },
    ]),
  }

  const scheme = { uri: "http://test.org/scheme" }

  const tree = mountTree({ registry, scheme })
  await flushPromises()

  expect(registry.getTop).toHaveBeenCalledWith({ scheme })

  const items = tree.findComponent(ItemList).props("items")
  expect(items.length).toBe(2)
  expect(items[0].concept.uri).toBe("http://test.org/top1")
  expect(items[1].concept.uri).toBe("http://test.org/top2")
})

test("ConceptTree navigateToUri loads narrower via _getNarrower", async () => {
  const child = {
    uri: "http://test.org/1/1",
    broader: [{ uri: "http://test.org/1" }],
  }

  const root = {
    uri: "http://test.org/1",
    narrower: [null],
    _getNarrower: vi.fn().mockResolvedValue([child]),
  }

  const registry = {
    getConcepts: vi.fn(({ concepts }) => {
      const uri = concepts[0].uri
      if (uri === child.uri) {
        return Promise.resolve([{ uri: child.uri, broader: [{ uri: root.uri }] }])
      }
      if (uri === root.uri) {
        return Promise.resolve([{ uri: root.uri }])
      }
      return Promise.resolve([])
    }),
  }

  const tree = mountTree({
    concepts: [root],
    registry,
  })

  const ok = await tree.vm.navigateToUri(child.uri)
  await flushPromises()

  expect(ok).toBe(true)
  expect(root._getNarrower).toHaveBeenCalled()

  const items = tree.findComponent(ItemList).props("items")
  expect(items.map((i) => i.concept.uri)).toEqual([
    "http://test.org/1",
    "http://test.org/1/1",
  ])
})