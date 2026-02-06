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

  ItemName.addNotationPlugin(notation => `:${notation}`)

  const wrapper = mount(ItemName, { props: { item } })

  expect(wrapper.text()).toContain(notation)
  expect(wrapper.text()).toContain(en)
  expect(wrapper.classes()).toContain("jskos-vue-itemName")

  const notationSpan = wrapper.find(".jskos-vue-itemName-notation")
  expect(notationSpan.exists()).toBe(true)
  expect(notationSpan.text()).toBe(`:${notation}`)

  await wrapper.setProps({ showNotation: false })
  expect(wrapper.text()).not.toContain(notation)
  expect(wrapper.text()).toBe(en)

  await wrapper.setProps({ showNotation: true, showLabel: false })
  expect(wrapper.text()).toBe(`:${notation}`)

  await wrapper.setProps({ showNotation: false, showLabel: false })
  expect(wrapper.text()).toBe("???")

  await wrapper.setProps({ fallbackLabel: "Nothing here" })
  expect(wrapper.text()).toBe("Nothing here")

  await wrapper.setProps({ clickable: true })
  expect(wrapper.classes()).toContain("clickable")
})
