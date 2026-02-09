import { test, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { ItemDetails, ItemList, ItemName, ItemDetailsTabs, LicenseInfo } from "../src/index.js"

const mountDetails = props => mount(ItemDetails, { props })

test("ItemDetails", async () => {
  const item = {
    uri: "http://test.org/1",
    ancestors: [{ uri: "http://test.org/ancestor" }],
    broader: [{ uri: "http://test.org/broader" }],
    narrower: [{ uri: "http://test.org/narrower" }],
    license: [{ uri: "http://test.org/license" }],
    identifier: ["some:id"],
  }

  const details = mountDetails({ item })

  expect(details.findComponent(ItemName).exists()).toBe(true)

  // item + ancestors + broader + narrower
  expect(details.findAllComponents(ItemName).length).toBe(4)

  const itemLists = details.findAllComponents(ItemList)
  expect(itemLists.length).toBe(3)

  expect(itemLists[0].props("items")[0].uri).toBe("http://test.org/ancestor")

  expect(details.findComponent(LicenseInfo).exists()).toBe(true)
  expect(details.findComponent(ItemDetailsTabs).exists()).toBe(true)
})

test("ItemDetails toggles", async () => {
  const item = {
    uri: "http://test.org/1",
    ancestors: [{ uri: "http://test.org/ancestor" }],
  }
  const details = mountDetails({
    item,
    showAncestors: false,
    showTabs: false,
  })

  // only item
  expect(details.findAllComponents(ItemName).length).toBe(1)

  expect(details.findComponent(ItemDetailsTabs).exists()).toBe(false)
})
