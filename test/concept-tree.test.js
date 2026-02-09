import { test, expect } from "vitest"
import { mount } from "@vue/test-utils"
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
