import { test, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { reactive, nextTick } from "vue"
import ItemSelected from "../src/components/ItemSelected.vue"

const stubs = {
  ItemName: {
    name: "ItemName",
    props: ["modelValue"],
    emits: ["click"],
    template: `
      <span class="stub-itemName" @click="$emit('click')">
        {{ item?.uri }}
      </span>
    `,
  },
  RemoveIcon: {
    name: "RemoveIcon",
    props: ["ariaLabel", "title"],
    emits: ["click"],
    template: `
      <button class="jskos-vue-removeIcon" @click="$emit('click', $event)">
        x
      </button>
    `,
  },
  Arrow: {
    name: "Arrow",
    props: ["direction"],
    template: "<span class=\"stub-arrow\">{{ direction }}</span>",
  },
  ItemList: {
    name: "ItemList",
    props: ["modelValue"],
    emits: ["select"],
    template: `
      <div class="stub-itemList">
        <div
          v-for="(it, i) in items"
          :key="it?.uri || i"
          class="stub-itemList-row"
          @click="$emit('select', { item: it })"
        >
          <slot name="afterItem" :item="it" />
        </div>
      </div>
    `,
  },
}

const mountSelected = (props) =>
  mount(ItemSelected, {
    props,
    global: { stubs },
  })

test("ItemSelected: empty items renders nothing", () => {
  const items = reactive([])
  const w = mountSelected({ items, view: "tags" })

  expect(w.find(".jskos-vue-itemSelected-tags").exists()).toBe(false)
  expect(w.find(".jskos-vue-itemSelected-table").exists()).toBe(false)
  expect(w.find(".jskos-vue-itemSelected-list").exists()).toBe(false)
})

test("ItemSelected: tags view emits select and removes items (change + in-place splice)", async () => {
  const items = reactive([
    { uri: "urn:1" },
    { uri: "urn:2" },
    { uri: "urn:3" },
  ])
  const w = mountSelected({ items, view: "tags" })

  expect(w.findAll(".jskos-vue-itemSelected-tag").length).toBe(3)

  // select (click on ItemName stub)
  await w.findAll(".stub-itemName")[0].trigger("click")
  expect(w.emitted("select")).toBeTruthy()
  expect(w.emitted("select")[0][0].item).toEqual({ uri: "urn:1" })

  // remove first item
  await w.findAll(".jskos-vue-removeIcon")[0].trigger("click")
  await nextTick()

  // in-place mutation happened
  expect(items.map((i) => i.uri)).toEqual(["urn:2", "urn:3"])

  // change event payload
  expect(w.emitted("change")).toBeTruthy()
  const payload = w.emitted("change")[0][0]
  expect(payload.type).toBe("remove")
  expect(payload.index).toBe(0)
  expect(payload.item.uri).toBe("urn:1")
  expect(payload.items.map((i) => i.uri)).toEqual(["urn:2", "urn:3"])
})

test("ItemSelected: table view orderable moves items in-place and emits change", async () => {
  const items = reactive([
    { uri: "urn:a" },
    { uri: "urn:b" },
    { uri: "urn:c" },
  ])
  const w = mountSelected({ "v-model": items, view: "table", orderable: true })

  // click "Move down" on first row
  const down = w.findAll("button[title=\"Move down\"]")
  expect(down.length).toBeGreaterThan(0)

  await down[0].trigger("click")
  await nextTick()

  // in-place reorder: a <-> b
  expect(items.map((i) => i.uri)).toEqual(["urn:b", "urn:a", "urn:c"])

  const payload = w.emitted("change")[0][0]
  expect(payload.type).toBe("move")
  expect(payload.from).toBe(0)
  expect(payload.to).toBe(1)
  expect(payload.items.map((i) => i.uri)).toEqual(["urn:b", "urn:a", "urn:c"])
})

test("ItemSelected: list view supports removable + emits select via ItemList", async () => {
  const items = reactive([{ uri: "urn:x" }, { uri: "urn:y" }])
  const w = mountSelected({ modelValue: items, view: "list", removable: true })

  // remove icons rendered via afterItem slot
  expect(w.findAll(".jskos-vue-removeIcon").length).toBe(2)

  // select via ItemList stub row click
  await w.findAll(".stub-itemList-row")[0].trigger("click")
  expect(w.emitted("select")).toBeTruthy()
  expect(w.emitted("select")[0][0].item.uri).toBe("urn:x")

  // remove first
  await w.findAll(".jskos-vue-removeIcon")[0].trigger("click")
  await nextTick()
  expect(items.map((i) => i.uri)).toEqual(["urn:y"])
})
