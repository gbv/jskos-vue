import { test, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { LicenseInfo } from "../src/index.js"

const mountComponent = license => mount(LicenseInfo, { props: { item: { license } } })

test("LicenseInfo known license", async () => {
  const wrapper = mountComponent([{ uri: "http://creativecommons.org/publicdomain/zero/1.0/" }])

  expect(wrapper.find("a").attributes("href")).toBe("http://creativecommons.org/publicdomain/zero/1.0/")
  expect(wrapper.find("a").attributes("title")).toContain("License") // English message
  expect(wrapper.find("img").attributes("src")).toContain("cc-zero.svg")
})

test("LicenseInfo unknown license", async () => {
  const wrapper = mountComponent([{
    uri: "http://unknown-license.org",
    prefLabel: { en: "unknown license" },
    notation: ["UL"],
  }])

  expect(wrapper.find("a").attributes("href")).toBe("http://unknown-license.org")
  expect(wrapper.find("img").exists()).toBe(false)
  expect(wrapper.find("span").exists()).toBe(true)
  expect(wrapper.text()).toBe("unknown license (UL)")
})
