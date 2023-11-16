---
title: 博客
pageInfo: false
contributors: false
editLink: false
lastUpdated: false
---

<SiteSection :title="frontmatter.title"/>

<script setup lang="ts">
import SiteSection from "@SiteSection";
import { usePageFrontmatter } from "@vuepress/client";
import type { ThemeHopePageFrontmatter } from "vuepress-theme-hope";
import { ref, onBeforeMount } from "vue";

const frontmatter = usePageFrontmatter<ThemeHopePageFrontmatter>();

</script>

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
