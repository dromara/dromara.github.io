<script setup lang="ts">
import { computed } from "vue";
import { usePageFrontmatter } from "@vuepress/client";
import { type ThemeHopePageFrontmatter } from "vuepress-theme-hope/client";

import { useFooterLocale } from "../composables/index.js";

const frontmatter = usePageFrontmatter<ThemeHopePageFrontmatter>();
const footerLocale = useFooterLocale();

const linkOption = computed(() => [
  {
    title: footerLocale.value.RESOURCES,
    links: [
      { name: "Github", href: "https://github.com/dromara" },
      { name: "Gitee", href: "https://gitee.com/dromara" }
    ]
  },
  {
    title: footerLocale.value.INVOLVED,
    links: [
      {
        name: footerLocale.value.COMMUNITY,
        href: "https://dromara.org/zh/community"
      },
      { name: footerLocale.value.BLOG, href: "https://dromara.org/zh/blog" }
    ]
  },
  {
    title: footerLocale.value.DOCUMENT,
    links: [
      {
        name: "Hmily",
        href: "https://gitee.com/dromara/hmily"
      },
      {
        name: "Raincat",
        href: "https://gitee.com/dromara/Raincat"
      },
      {
        name: "Myth",
        href: "https://gitee.com/dromara/myth"
      }
    ]
  }
]);

const qrcodeOption = computed(() => [
  { title: footerLocale.value.WECHAT, name: "qrcode_wx" },
  { title: footerLocale.value.KNOWLEDGE_PLANET, name: "qrcode_zsxq" }
]);

const getImageSrc = (name: string): string => `/assets/img/${name}.webp`;
</script>

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
        <div v-for="item in qrcodeOption" :key="item.name">
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
      <p>
        Copyright &copy;2018-{{ new Date().getFullYear() }}&nbsp;<a href="/"
          >@dromara. org. All Rights Reserved</a
        >
      </p>
    </div>
  </footer>
</template>

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

    > .cate {
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
    align-items: flex-end;

    @media (max-width: 719px) {
      flex-direction: column;
    }

    > div {
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

    > p {
      margin: 12px;
      text-align: center;
      font-size: 12px;
      color: #d5d7dc;
    }
  }
}
</style>
