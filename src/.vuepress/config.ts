import { getDirname, path } from "@vuepress/utils";
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import { viteBundler } from '@vuepress/bundler-vite'

import { enNavbar, zhNavbar } from "./navbar/index.js";
import { getAllFrontmatter } from "./getAllFrontmatter.js";

import { redirectPlugin } from "@vuepress/plugin-redirect";

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  bundler: viteBundler(),
  base: "/",
  head: [
    [
      "meta",
      {
        "http-equiv": "Cache-Control",
        content: "max-age=3600, must-revalidate"
      }
    ],
    [
      "meta",
      {
        name: "description",
        content: "Non-profit organization where open-source enthusiasts gather."
      }
    ],
    ["script", { src: "https://cdn.wwads.cn/js/makemoney.js", async: true }]
  ],

  locales: {
    "/": {
      lang: "en-US",
      description: "A official website for dromara"
    },
    "/zh/": {
      lang: "zh-CN",
      description: "dromara的官网文档"
    }
  },

  theme: hopeTheme(
    {
      hostname: "https://vuepress-theme-hope-docs-demo.netlify.app",
      logo: "/logo.svg",
      repo: "dromara",
      docsDir: "src",

      breadcrumb: false,
      darkmode: "disable",
      editLink: false,

      iconAssets: "fontawesome-with-brands",

      navbarLayout: {
        start: ["Brand"],
        center: ["Links"],
        end: ["Language", "GiteeRepo", "Repo", "Outlook", "Search"]
      },
      sidebarSorter: ["date-desc"],

      locales: {
        "/": {
          // navbar
          navbar: enNavbar,
          // sidebar
          sidebar: false
        },

        /**
         * Chinese locale config
         */
        "/zh/": {
          // navbar
          navbar: zhNavbar,
          // sidebar
          sidebar: false
        }
      },

      plugins: {
        // All features are enabled for demo, only preserve features you need here
        mdEnhance: {
          figure: true
        },
        photoSwipe: false
      }
    },
    { custom: true }
  ),

  plugins: [
    // Search
    searchProPlugin({
      // index all content
      indexContent: true
    }),
    redirectPlugin({
      locales: true,
      autoLocale: true
    }),
    getAllFrontmatter
  ],

  alias: {
    // 你可以在这里将别名定向到自己的组件
    "@theme-hope/components/HomePage": path.resolve(
      __dirname,
      "./components/HomePage.vue"
    ),
    "@theme-hope/components/PageFooter": path.resolve(
      __dirname,
      "./components/PageFooter.vue"
    ),
    "@MembersPage": path.resolve(__dirname, "./components/MembersPage.vue"),
    "@ProjectsPage": path.resolve(__dirname, "./components/ProjectsPage.vue"),
    "@HonorComp": path.resolve(__dirname, "./components/HonorComp.vue"),
    "@SiteSection": path.resolve(__dirname, "./components/SiteSection.vue")
  },

  shouldPrefetch: false
});
