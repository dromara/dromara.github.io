---
title: Blog
pageInfo: false
contributors: false
editLink: false
lastUpdated: false
---

<script setup lang="ts">
import SiteSection from "@SiteSection";
import { usePageFrontmatter } from "@vuepress/client";
import { ref, onBeforeMount } from "vue";
import type { ThemeHopePageFrontmatter } from "vuepress-theme-hope";

const frontmatter = usePageFrontmatter<ThemeHopePageFrontmatter>();

</script>

<SiteSection :title="frontmatter.title"/>

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
