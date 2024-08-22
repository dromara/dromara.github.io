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
  { title: footerLocale.value.DONATE, name: "donate" },
  { title: footerLocale.value.WECHAT, name: "qrcode_wx" },
  { title: footerLocale.value.KNOWLEDGE_PLANET, name: "qrcode_zsxq" },
  { title: footerLocale.value.Email, name: "Email" }
]);

</script>

<template>
  <footer class="page-footer">
    <div v-if="frontmatter.home" class="container">
      <div class="links">
        <template v-for="item in linkOption" :key="item.title">
          <div class="cate">
            <h2 class="cate-title">{{ item.title }}</h2>
            <a class="link" v-for="link in item.links" :key="link.name" :href="link.href">{{ link.name }}</a>
          </div>
        </template>
      </div>
      <div class="qrcode">
        <div v-for="item in qrcodeOption" :key="item.name">
          <a v-if="item.title === footerLocale.DONATE" class="qrcode-desc" href="//assets/img/donate.webp"
            target="_blank">
            <img class="qrcode_img" src="../public/assets/img/donation.webp">
            <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M591.62819 121.904762c7.68 0 21.187048 1.633524 31.524572 4.973714 50.907429 16.505905 80.213333 70.582857 68.339809 124.708572l-1.219047 5.071238-45.372953 170.179047h179.736381c21.820952 0 43.398095 8.094476 58.026667 24.283429 16.335238 18.090667 22.698667 42.032762 17.846857 65.267809l-1.219047 4.973715-94.768762 337.432381a59.294476 59.294476 0 0 1-52.662857 43.154285l-4.388572 0.146286H268.190476V444.001524c97.084952-21.016381 239.079619-279.28381 239.079619-279.28381C527.457524 137.337905 551.936 121.904762 591.62819 121.904762zM828.952381 501.126095c0-0.316952-0.146286-0.512-0.560762-0.975238 0.341333 0.390095-0.975238-0.170667-3.754667-0.170667H549.692952l69.900191-262.217142c5.022476-18.773333-4.144762-36.498286-18.968381-41.301334a52.589714 52.589714 0 0 0-9.020952-1.414095c-10.922667 0-15.457524 1.26781-21.065143 7.558095l-1.950477 2.29181-9.216 16.091428-9.874285 16.700953a1534.683429 1534.683429 0 0 1-72.216381 110.201905c-28.013714 38.765714-55.53981 72.167619-82.553905 98.816-17.968762 17.724952-35.59619 32.49981-53.394286 43.958857V828.952381h395.605334L828.952381 501.126095zM121.904762 438.857143h73.142857v463.238095H121.904762z" />
            </svg>
            <p class="qrcode-desc">{{ item.title }}</p>
          </a>
          <a v-if="item.title === footerLocale.WECHAT" class="qrcode-desc" href="//assets/img/qrcode_wx.webp"
            target="_blank">
            <img class="qrcode_img" src="../public/assets/img/qrcode_wx.webp">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" t="1722260304412"
              class="icon" viewBox="0 0 1152 1024" version="1.1" p-id="4320">
              <path
                d="M770.4 335.2c12.8 0 25.2 0.6 37.6 2.2C774.8 180.6 606.6 64 415.4 64 201 64 26 209.6 26 394.8c0 106.8 58.6 195 155.8 263.2l-38.6 117.2 136-68.2c48.8 9.6 87.6 19.4 136.4 19.4 12.4 0 24.2-0.6 36.6-1.6-8-25.8-12.4-53.2-12.4-81.6-0.2-169.8 145.8-308 330.6-308z m-209-105.8c29 0 48.4 19.4 48.4 48.8 0 29-19.4 48.4-48.4 48.4-29.6 0-58.6-19.4-58.6-48.4 0.2-29.4 29.2-48.8 58.6-48.8z m-272.8 97.2c-29 0-58.6-19.4-58.6-48.4 0-29.6 29.6-48.8 58.6-48.8 29.6 0 48.8 19.4 48.8 48.8 0 29.2-19.2 48.4-48.8 48.4zM1126 638.8c0-155.8-155.8-282.6-330.8-282.6-185.4 0-330.8 126.8-330.8 282.6S610 921.4 795.2 921.4c38.6 0 77.8-10.2 117.2-19.8l106.8 58.6-29.6-97.2C1068 804.2 1126 726.4 1126 638.8z m-438.2-49c-19.4 0-38.6-19.4-38.6-39.2 0-19.4 19.4-38.6 38.6-38.6 29.6 0 48.8 19.4 48.8 38.6 0 20-19.4 39.2-48.8 39.2z m214.2 0c-19.4 0-38.6-19.4-38.6-39.2 0-19.4 19.4-38.6 38.6-38.6 29 0 48.8 19.4 48.8 38.6 0.2 20-19.8 39.2-48.8 39.2z"
                p-id="4321" />
            </svg>
            <p class="qrcode-desc">{{ item.title }}</p>
          </a>
          <a v-if="item.title === footerLocale.KNOWLEDGE_PLANET" class="qrcode-desc"
            href="//assets/img/qrcode_zsxq.webp" target="_blank">
            <img class="qrcode_img" src="../public/assets/img/qrcode_zsxq.webp">
            <svg class="icon" width="100px" height="100.00px" viewBox="0 0 1024 1024" version="1.1"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M563.858286 911.60381a73.142857 73.142857 0 0 1-103.424 0L63.878095 515.120762a73.142857 73.142857 0 0 1 0-103.424L321.584762 154.014476a73.142857 73.142857 0 0 1 103.424 0l87.137524 87.161905 87.186285-87.161905a73.142857 73.142857 0 0 1 103.448381 0L960.365714 411.672381a73.142857 73.142857 0 0 1 0 103.424L563.858286 911.62819zM373.272381 205.775238L115.638857 463.384381 512.146286 859.91619l24.064-24.064-87.161905-87.161904 51.712-51.712 87.161905 87.161904 27.184762-27.184761-87.161905-87.161905 51.736381-51.736381 87.137524 87.161905 31.597714-31.597715-87.137524-87.161904 51.712-51.712 87.161905 87.161904 19.626667-19.651047-114.93181-114.93181-3.82781 3.82781a137.48419 137.48419 0 0 1-194.413714 0l-45.494857-45.494857a73.142857 73.142857 0 0 1 0-103.424l49.298286-49.322667-87.137524-87.161905z m277.747809 0l-188.196571 188.196572 45.494857 45.494857a64.316952 64.316952 0 0 0 90.940953 0.048762l3.85219-3.900953 51.687619-51.736381 10.044952-10.069333 166.716953 166.716952 77.116952-77.116952L651.02019 205.775238z" />
            </svg>
            <p class="qrcode-desc">{{ item.title }}</p>
          </a>
          <a v-if="item.title === footerLocale.Email" class="qrcode-desc" href="mailto:549477611@qq.com">
            <p class="mail">549477611@qq.com</p>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" t="1722434866328"
              class="icon" viewBox="0 0 1024 1024" version="1.1" p-id="5233" width="100" height="100">
              <path
                d="M869.12 832H154.88A74.88 74.88 0 0 1 80 757.12V266.88A74.88 74.88 0 0 1 154.88 192h714.24A74.88 74.88 0 0 1 944 266.88v490.24A74.88 74.88 0 0 1 869.12 832zM154.88 256A10.88 10.88 0 0 0 144 266.88v490.24A10.88 10.88 0 0 0 154.88 768h714.24A10.88 10.88 0 0 0 880 757.12V266.88A10.88 10.88 0 0 0 869.12 256z"
                p-id="5234" />
              <path
                d="M880 241.28l-386.24 278.4L144 249.92v80.96l329.6 254.08a32 32 0 0 0 19.52 6.72A32 32 0 0 0 512 585.6L880 320z"
                p-id="5235" />
            </svg>
            <p class="qrcode-desc">{{ item.title }}</p>
          </a>
        </div>

      </div>
    </div>
    <div class="copyright">
      <p>
        Copyright &copy;2018-{{ new Date().getFullYear() }}&nbsp;<a href="/">@dromara. org. All Rights Reserved</a>
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

    >.cate {
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

  a:hover .qrcode_img,
  a:hover .mail {
    display: block;
    z-index: 10;
  }

  .qrcode_img,
  .mail {
    position: absolute;
    z-index: 1;
    bottom: 80px;
    width: 180px;
    height: auto;
    display: none;
    transform: translate(-45px, -90px);
    color: #000;
  }

  .icon {
    width: 60px;
    height: auto;
    transform: translateX(-3px);
    align-items: center;
  }

  .qrcode {
    position: relative;
    text-align: center;
    padding-right: 100px;
    border-right: none;
    margin-right: 0;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    @media (max-width: 719px) {
      flex-direction: column;
    }

    >div {
      width: 100px;
    }

    .qrcode-img {
      width: 100%;
    }

    .qrcode-desc {
      text-align: center;
      padding-right: 8px;
      padding-left: 8px;
      margin: 8px 0 16px;
      font-size: 14px;
      color: #fff;
    }
  }

  .copyright {
    padding: 12px;
    border-top: 1px solid #4f5c6d;

    >p {
      margin: 12px;
      text-align: center;
      font-size: 12px;
      color: #d5d7dc;
    }
  }
}
</style>
