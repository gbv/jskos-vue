import { defineConfig } from "vitepress"
import fs from "node:fs"
const docsDir = "docs"

const mdfiles = dir => fs.readdirSync(`./${docsDir}${dir}`)
  .filter(file => file.endsWith(".md")).map(file => file.slice(0,-3))
  .map(text => ({ text, link: `${dir}/${text}` }))

const sidebar = [
  {
    text: "Introduction",
    link: "/",
    items: [
     { text: "Usage", link: "/usage" },
     { text: "Layout", link: "/layout" }
    ]
  },
  {
    text: "Components",
    items: mdfiles("/components")
  },
  {
    text: "Utilities",
    items: mdfiles("/utilities")
  },
  {
    text: "Contributing", link: "/contributing" 
  }
]

export default defineConfig({
  title: "jskos-vue",
  description: "Vue 3 components and plugins for interaction with JSKOS data",

  base: process.env.BASE || "/",
  lang: "en-US",

  themeConfig: {
    repo: "gbv/jskos-vue",
    docsDir,
    docsBranch: "dev",

    editLinks: true,
    editLinkText: "Edit this page on GitHub",

    nav: [
      { text: "Documentation", link: "/", activeMatch: ".*" },
      {
        text: "GitHub",
        link: "https://github.com/gbv/jskos-vue",
      },
      {
        text: "Release Notes",
        link: "https://github.com/gbv/jskos-vue/releases",
      },
    ],
    sidebar: {
      "/": sidebar,
      "/introduction/": sidebar,
      "/components/": sidebar,
      "/utilities/": sidebar,
    },
    search: {
      provider: "local"
    }
  },
})
