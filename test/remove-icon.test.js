import { test, expect } from "vitest"
import { mount } from "@vue/test-utils"
import RemoveIcon from "../src/components/RemoveIcon.vue"

test("RemoveIcon: emits click", async () => {
  const w = mount(RemoveIcon)
  const btn = w.get("button.jskos-vue-removeIcon")

  await btn.trigger("click")
  expect(w.emitted("click")).toBeTruthy()
  expect(w.emitted("click").length).toBe(1)
})

const tests = [
  [{}, {"aria-label": "Remove", title: "Remove"}],
  [{title: "xxx"}, {"aria-label": "Remove", title: "xxx"}],
  [{ariaLabel: "yyy"}, {"aria-label": "yyy", title: "yyy"}],
  [{ariaLabel: "a", title: "b"}, {"aria-label": "a", title: "b"}],
  [{title: ""}, {"aria-label": "Remove", title: ""}],
]

for (let [props, result] of tests) {
  test(`RemoveIcon: ${JSON.stringify(props)}`, () => {
    const w = mount(RemoveIcon, { props })
    const btn = w.get("button.jskos-vue-removeIcon")
    
    expect(btn.attributes("aria-label")).toBe(result["aria-label"])
    expect(btn.attributes("title")).toBe(result["title"])
  })
}
