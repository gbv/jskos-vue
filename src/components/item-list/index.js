import ItemList from "./ItemList.vue"

ItemList.install = (vue) => {
  vue.component(ItemList.name, ItemList)
}

export default ItemList
