import { test, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { LoadingIndicator } from "../src/index.js"

test("LoadingIndicator", async () => {
  const wrapper = mount(LoadingIndicator)
  expect(wrapper.attributes("style")).toContain("width: 15px")
  expect(wrapper.attributes("style")).toContain("height: 15px")

  await wrapper.setProps({ size: "sm" })
  expect(wrapper.attributes("style")).toContain("width: 9px")
  expect(wrapper.attributes("style")).toContain("height: 9px")

  await wrapper.setProps({ size: "lg" })
  expect(wrapper.attributes("style")).toContain("width: 21px")
  expect(wrapper.attributes("style")).toContain("height: 21px")

  await wrapper.setProps({ size: "xl" })
  expect(wrapper.attributes("style")).toContain("width: 27px")
  expect(wrapper.attributes("style")).toContain("height: 27px")
})
