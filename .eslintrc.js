module.exports = {
  env: {
    es6: true,
    node: true,
    mocha: true,
    browser: true,
  },
  extends: [
    "gbv",
    "gbv/vue/3",
  ],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
  },
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
  },
}
