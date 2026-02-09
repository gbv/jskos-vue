import { test, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { ItemList, ItemName, LoadingIndicator } from "../src/index.js"

const items = [
  { uri: "http://test.org/1" },
  { uri: "http://test.org/2", prefLabel: { en: "x" } },
  null, // for LoadingIndicator
]

const mountList = props => mount(ItemList, { props })

test("ItemList", async () => {
  const list = mountList({ items })

  // Check length
  expect(list.findAll(".jskos-vue-itemList-item").length).toBe(items.length)

  // Check ItemName rendering
  const itemNames = list.findAllComponents(ItemName)
  expect(itemNames.length).toBe(2)
  expect(itemNames[0].text()).toBe(items[0].uri)
  expect(itemNames[1].text()).toBe(items[1].prefLabel.en)

  // Check LoadingIndicator
  expect(list.findComponent(LoadingIndicator).exists()).toBe(true)
})

test("ItemList selection", async () => {
  const list = mountList({ items, rowMode: true })

  // Click on the row
  await list.find(".jskos-vue-itemList-item").trigger("click")

  // Check emitted event
  expect(list.emitted("select")).toBeTruthy()
  expect(list.emitted("select")[0][0].item).toEqual(items[0])
  expect(list.emitted("select")[0][0].row).toBe(true)
})
