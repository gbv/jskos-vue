import { test, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { AutoLink } from "../src/index.js"

test("AutoLink", async () => {
  const url = "https://example.com"
  const text = "Example Link"
  const plainText = "Just some text"

  const wrapperUrl = mount(AutoLink, { props: { href: url } })
  expect(wrapperUrl.element.tagName).toBe("A")
  expect(wrapperUrl.attributes("href")).toBe(url)
  expect(wrapperUrl.attributes("target")).toBe("_blank")
  expect(wrapperUrl.text()).toBe(url)

  const wrapperUrlText = mount(AutoLink, { props: { href: url, text } })
  expect(wrapperUrlText.text()).toBe(text)

  const wrapperText = mount(AutoLink, { props: { href: plainText } })
  expect(wrapperText.element.tagName).toBe("SPAN")
  expect(wrapperText.text()).toBe(plainText)

  const wrapperSlot = mount(AutoLink, {
    props: { href: url },
    slots: { default: "<span>Slot Content</span>" },
  })
  expect(wrapperSlot.text()).toBe("Slot Content")
})
