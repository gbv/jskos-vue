const fs = require("fs")
const docsDir = "docs"

module.exports = {
  base: process.env.BASE || "/",
  lang: "en-US",
  title: "jskos-vue",
  description: "",

  themeConfig: {
    repo: "gbv/jskos-vue",
    docsDir,
    docsBranch: "dev",

    editLinks: true,
    editLinkText: "Edit this page on GitHub",

    nav: [
      { text: "Documentation", link: "/", activeMatch: "^/$|^/introduction/|^/components/|^/utilities/" },
      {
        text: "Release Notes",
        link: "https://github.com/gbv/jskos-vue/releases",
      },
    ],

    sidebar: {
      "/": getGuideSidebar(),
      "/introduction/": getGuideSidebar(),
      "/components/": getGuideSidebar(),
      "/utilities/": getGuideSidebar(),
    },
  },
}

function getGuideSidebar() {
  return [
    {
      text: "Introduction",
      link: "/",
    },
    {
      text: "Components",
      children: fs.readdirSync(`./${docsDir}/components`).filter(file => file.endsWith(".md")).map(file => {
        const name = file.replace(".md", "")
        return {
          text: name,
          link: `/components/${name}`,
        }
      }),
    },
    {
      text: "Utilities",
      children: [
        { text: "dateToString", link: "/utilities/dateToString" },
        { text: "Click Handling", link: "/utilities/clickHandling" },
        { text: "debounce", link: "/utilities/debounce" },
      ],
    },
  ]
}
