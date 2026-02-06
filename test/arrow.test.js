import { test, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { Arrow } from "../src/index.js"

test("Arrow", async () => {
  const arrow = mount(Arrow, { props: { direction: "up" } })
  expect(arrow.props()).toEqual({ direction: "up", clickable: false })

  const root = arrow.get("div")
  expect(root.classes()).toStrictEqual(["jskos-vue-arrow"])
  expect(root.get("div").classes()).toStrictEqual(["jskos-vue-arrow-up"])

  await arrow.setProps({ clickable: true, direction: "down" })
  expect(root.classes()).toStrictEqual(["jskos-vue-arrow", "jskos-vue-arrow-clickable"])
  expect(root.get("div").classes()).toStrictEqual(["jskos-vue-arrow-down"])
})
