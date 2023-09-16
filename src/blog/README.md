---
title: Blog
index: false
sidebar: false
breadcrumb: false
pageInfo: false
contributors: false
editLink: false
lastUpdated: false
prev: false
next: false
---

<script setup lang="ts">
import NewsActivityBlogSection from "@NewsActivityBlogSection";
import { usePageFrontmatter } from "@vuepress/client";
import type { DefaultThemePageFrontmatter } from "@vuepress/theme-default/lib/shared/index.js";
import { ref, onBeforeMount } from "vue";

const frontmatter = usePageFrontmatter<DefaultThemePageFrontmatter>();

</script>

<NewsActivityBlogSection :title="frontmatter.title"/>

<style scoped lang="scss">
.theme-hope-content {
  margin: 0;
  padding: 0;
  max-width: none;
  position: relative;
  z-index: 1;
  top: -161px;
  @media (min-width: 1440px) {
    background: #f9fbff;
  }
}
</style>
