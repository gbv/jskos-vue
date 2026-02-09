import { test, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { Modal } from "../src/index.js"

describe("Modal", () => {
  const modal = mount(Modal, {
    props: { modelValue: true },
    slots: {
      default: "<div>Modal Body</div>",
      header: "<div>Modal Header</div>",
      footer: "<div>Modal Footer</div>",
    },
    global: {
      stubs: { teleport: true },
    },
  })

  test("mount", async () => {
    expect(modal.find(".jskos-vue-modal").exists()).toBe(true)
    expect(modal.text()).toContain("Modal Body")
    expect(modal.text()).toContain("Modal Header")
    expect(modal.text()).toContain("Modal Footer")
  })

  test("close button", async () => {
    await modal.find(".jskos-vue-modal-header > button").trigger("click")
    expect(modal.emitted("update:modelValue")[0]).toEqual([false])
  })

  test("backdrop click", async () => {
    await modal.find(".jskos-vue-modal-backdrop").trigger("click")
    expect(modal.emitted("update:modelValue")[1]).toEqual([false])
  })

  test("hidden", async () => {
    await modal.setProps({ modelValue: false })
    expect(modal.find(".jskos-vue-modal").exists()).toBe(false)
  })
})
