<template>
  <footer class="page-footer">
    <div v-if="frontmatter.home" class="container">
      <div class="links">
        <template v-for="item in linkOption" :key="item.title">
          <div class="cate">
            <h2 class="cate-title">{{ item.title }}</h2>
            <a
              class="link"
              v-for="link in item.links"
              :key="link.name"
              :href="link.href"
              >{{ link.name }}</a
            >
          </div>
        </template>
      </div>
      <div class="qrcode">
        <div v-for="item in QrcodeOption" :key="item.name">
          <img
            class="qrcode-img"
            :src="getImageSrc(item.name)"
            :alt="item.name"
          />
          <p class="qrcode-desc">{{ item.title }}</p>
        </div>
      </div>
    </div>
    <div class="copyright">
      <p>Copyright ©2021<a href="/">@dromara. org. All Rights Reserved</a></p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue';
import { type FooterOption } from './types';
import { useSiteLocaleData, usePageFrontmatter } from '@vuepress/client';
import type { DefaultThemePageFrontmatter } from '@vuepress/theme-default/lib/shared/index.js';
import enFooterOption from './en';
import zhFooterOption from './zh';
// import { useSidebarItems } from "@vuepress/theme-default/lib/client/composables/index.js";

let footerOption: FooterOption = reactive({
  RESOURCES: '',
  INVOLVED: '',
  FEEDBACK: '',
  COMMUNITY: '',
  BLOG: '',
  DOCUMENT: '',
  WECHAT: '',
  QQ: '',
  KNOWLEDGE_PLANET: ''
});

const siteLocaleData = useSiteLocaleData();
const lang = ref(siteLocaleData.value.lang);
const frontmatter = usePageFrontmatter<DefaultThemePageFrontmatter>();
// const sidebarItems = useSidebarItems();

watch(
  () => siteLocaleData.value.lang,
  (newLang) => {
    lang.value = newLang;
    if (lang.value === 'zh-CN' || lang.value === '/zh/') {
      footerOption = zhFooterOption;
    } else {
      footerOption = enFooterOption;
    }
  },
  {
    immediate: true
  }
);

const linkOption = ref([
  {
    title: footerOption.RESOURCES,
    links: [
      { name: 'Github', href: 'https://github.com/dromara' },
      { name: 'Gitee', href: 'https://gitee.com/dromara' }
    ]
  },
  {
    title: footerOption.INVOLVED,
    links: [
      {
        name: footerOption.FEEDBACK,
        href: 'https://github.com/dromara/soul/issues/new'
      },
      {
        name: footerOption.COMMUNITY,
        href: 'https://dromara.org/zh/community'
      },
      { name: footerOption.BLOG, href: 'https://dromara.org/zh/blog' }
    ]
  },
  {
    title: footerOption.DOCUMENT,
    links: [
      {
        name: 'Hmily',
        href: 'https://dromara.org/zh/projects/hmily/overview/'
      },
      {
        name: 'Raincat',
        href: 'https://dromara.org/zh/projects/raincat/overview/'
      },
      {
        name: 'Myth',
        href: 'https://dromara.org/zh/projects/myth/overview/'
      }
    ]
  }
]);

const QrcodeOption = ref([
  { title: footerOption.WECHAT, name: 'qrcode_wx' },
  { title: footerOption.QQ, name: 'qrcode_qq' },
  { title: footerOption.KNOWLEDGE_PLANET, name: 'qrcode_zsxq' }
]);

const getImageSrc = computed(() => {
  return (name: string) => {
    return `/assets/img/${name}.png`;
  };
});
</script>

<style scoped lang="scss">
.page-footer {
  background-color: #273352;
  a {
    color: inherit;
  }
  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 32px 24px;
    padding-bottom: 16px;
    display: flex;
    justify-content: space-between;
  }
  .links {
    display: flex;
    flex-wrap: wrap;
    & > .cate {
      margin-right: 70px;
    }
  }
  .cate-title {
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    margin: 12px 0;
  }
  .link {
    display: block;
    margin-right: 24px;
    margin-bottom: 10px;
    color: #e2e5ea;
    font-size: 14px;
    @media (max-width: 568px) {
      display: inline-block;
    }
  }
  .qrcode {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    @media (max-width: 719px) {
      flex-direction: column;
    }
    & > div {
      margin-right: 40px;
      width: 150px;
    }
    .qrcode-img {
      width: 100%;
    }
    .qrcode-desc {
      margin: 0;
      margin: 8px 0 16px;
      text-align: center;
      font-size: 14px;
      color: #fff;
    }
  }
  .copyright {
    padding: 12px;
    border-top: 1px solid #4f5c6d;
    & > p {
      margin: 12px;
      text-align: center;
      font-size: 12px;
      color: #d5d7dc;
    }
  }
}
</style>
