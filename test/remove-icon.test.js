import { test, expect } from "vitest"
import { mount } from "@vue/test-utils"
import RemoveIcon from "../src/components/RemoveIcon.vue"

test("RemoveIcon: renders defaults and emits click", async () => {
  const w = mount(RemoveIcon)

  const btn = w.get("button.jskos-vue-removeIcon")

  // defaults
  expect(btn.attributes("aria-label")).toBe("Remove")
  expect(btn.attributes("title")).toBe("Remove")

  // click emit
  await btn.trigger("click")
  expect(w.emitted("click")).toBeTruthy()
  expect(w.emitted("click").length).toBe(1)
})

test("RemoveIcon: applies color style", () => {
  const w = mount(RemoveIcon, { props: { color: "black" } })
  const btn = w.get("button.jskos-vue-removeIcon")

  // inline style should include the color
  expect(btn.attributes("style") || "").toContain("color: black")
})
