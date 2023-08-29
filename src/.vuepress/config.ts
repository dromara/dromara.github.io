import { getDirname, path } from '@vuepress/utils';
import { defineUserConfig } from 'vuepress';
import theme from './theme.js';
import { hopeTheme } from 'vuepress-theme-hope';
import { searchProPlugin } from 'vuepress-plugin-search-pro';
import { enNavbar, zhNavbar } from './navbar/index.js';
import { enSidebar, zhSidebar } from './sidebar/index.js';

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  base: '/',

  locales: {
    '/': {
      lang: 'en-US',
      description: 'A official website for dromara'
    },
    '/zh/': {
      lang: 'zh-CN',
      description: 'dromara的官网文档'
    }
  },
  // theme,
  theme: hopeTheme(
    {
      hostname: 'https://vuepress-theme-hope-docs-demo.netlify.app',
      breadcrumb: false,
      editLink: false,
      darkmode: 'disable',

      iconAssets: 'fontawesome-with-brands',

      logo: '/logo.svg',

      repo: 'vuepress-theme-hope/vuepress-theme-hope',

      docsDir: 'src',

      locales: {
        '/': {
          // navbar
          navbar: enNavbar,

          // sidebar
          sidebar: enSidebar,

          footer: 'Default footer',

          displayFooter: true,

          metaLocales: {
            editLink: 'Edit this page on GitHub'
          }
        },

        /**
         * Chinese locale config
         */
        '/zh/': {
          // navbar
          navbar: zhNavbar,

          // sidebar
          sidebar: zhSidebar,

          footer: '默认页脚',

          displayFooter: true,

          // page meta
          metaLocales: {
            editLink: '在 GitHub 上编辑此页'
          }
        }
      },

      plugins: {
        photoSwipe: false,
        // All features are enabled for demo, only preserve features you need here
        mdEnhance: {
          align: true,
          attrs: true,
          chart: true,
          codetabs: true,
          demo: true,
          echarts: true,
          figure: true,
          flowchart: true,
          gfm: true,
          imgLazyload: true,
          imgSize: true,
          include: true,
          katex: true,
          mark: true,
          mermaid: true,
          playground: {
            presets: ['ts', 'vue']
          },
          presentation: ['highlight', 'math', 'search', 'notes', 'zoom'],
          stylize: [
            {
              matcher: 'Recommended',
              replacer: ({ tag }) => {
                if (tag === 'em')
                  return {
                    tag: 'Badge',
                    attrs: { type: 'tip' },
                    content: 'Recommended'
                  };
              }
            }
          ],
          sub: true,
          sup: true,
          tabs: true,
          vPre: true,
          vuePlayground: true
        }
      },
      sidebarSorter: ['date-desc'],
      blog: { name: 'dromara' }
    },
    { custom: true }
  ),
  alias: {
    // 你可以在这里将别名定向到自己的组件
    '@theme-hope/components/HomePage': path.resolve(
      __dirname,
      './components/HomePage/HomePage.vue'
    ),
    '@theme-hope/components/PageFooter': path.resolve(
      __dirname,
      './components/PageFooter/PageFooter.vue'
    ),
    '@ProjectsPage': path.resolve(
      __dirname,
      'components/ProjectsPage/ProjectsPage.vue'
    ),
    '@GitHubStars': path.resolve(__dirname, 'components/GitHubStars.vue'),
    '@NewsActivityBlogSection': path.resolve(
      __dirname,
      'components/NewsActivityBlogSection/NewsActivityBlogSection.vue'
    )
  },
  plugins: [
    // Search
    searchProPlugin({
      // index all content
      indexContent: true

      // add supports for category and tags
      // customFields: [
      //   {
      //     getter: (page) => page.frontmatter.category,
      //     formatter: "Category: $content",
      //   },
      //   {
      //     getter: (page) => page.frontmatter.tag,
      //     formatter: "Tag: $content",
      //   },
      // ],
    }),
    require('./getAllFrontmatter')
  ]
  // Enable it with pwa
  // shouldPrefetch: false,
});
