import { test, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { ItemName } from "../src/index.js"

test("ItemName", async () => {
  const notation = "123"
  const en = "Test Item"
  const item = {
    uri: "test:item",
    prefLabel: { en },
    notation: [notation],
  }

  const processedLabel = `${en}!`
  const processedNotation = `:${notation}`

  ItemName.addLabelPlugin(label => `${label}!`)
  ItemName.addNotationPlugin(notation => `:${notation}`)

  const wrapper = mount(ItemName, { props: { item } })

  expect(wrapper.text()).toContain(notation)
  expect(wrapper.text()).toContain(processedLabel)
  expect(wrapper.classes()).toContain("jskos-vue-itemName")

  const notationSpan = wrapper.find(".jskos-vue-itemName-notation")
  expect(notationSpan.exists()).toBe(true)
  expect(notationSpan.text()).toBe(processedNotation)

  await wrapper.setProps({ showNotation: false })
  expect(wrapper.text()).not.toContain(notation)
  expect(wrapper.text()).toBe(processedLabel)

  await wrapper.setProps({ showNotation: true, showLabel: false })
  expect(wrapper.text()).toBe(processedNotation)

  await wrapper.setProps({ showNotation: false, showLabel: false })
  expect(wrapper.text()).toBe("???")

  await wrapper.setProps({ fallbackLabel: "Nothing here" })
  expect(wrapper.text()).toBe("Nothing here")

  await wrapper.setProps({ clickable: true })
  expect(wrapper.classes()).toContain("jskos-vue-clickable")
})
