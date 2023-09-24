<template>
  <div class="news-activity-blog-section">
    <div class="bg-white">
      <div class="news-activity-blog-container">
        <h1 class="title">{{ title }}</h1>
        <p class="description">{{ option.DESC }}</p>
      </div>
    </div>
  </div>
  <main class="news-activity-blog-main">
    <h2 class="tag">{{ langMapping === "中文" ? "标签" : "Tag" }}</h2>
    <div class="buttons">
      <div v-for="item in TAGS" :key="item">
        <button
          :class="{ selected: currentTag === item, 'tag-button': true }"
          @click="currentTag = item"
        >
          {{ item }}
        </button>
      </div>
    </div>
    <template v-if="filteredSectionDetail.length">
      <div class="cards">
        <div v-for="obj in filteredSectionDetail" :key="obj.title" class="card">
          <div class="tag-items">
            <div v-for="tag in obj.tag" :key="tag" class="tag-item">
              #{{ tag }}
            </div>
          </div>
          <img class="cover" :src="obj.cover" :alt="obj.title" />

          <a class="title" :href="obj.url">{{ obj.title }}</a>
          <div class="author-info">
            <div class="author-name">{{ obj.author }}</div>
            <div class="time">{{ obj.date }}</div>
          </div>
        </div>
      </div>
    </template>
    <div v-else class="no-data" style="">
      {{
        langMapping === "中文"
          ? "这是一个待开发的领域，欢迎加入我们共同创造！"
          : "This is a field that awaits development, welcome to join us and innovate!"
      }}
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive, watchEffect, computed } from "vue";
import {
  type ActivityOption,
  type GroupedPage,
  type GroupedPages
} from "./types";

import enActivityOption from "./enActivity";
import enBlogOption from "./enBlog";
import enNewsOption from "./enNews";
import zhActivityOption from "./zhActivity";
import zhBlogOption from "./zhBlog";
import zhNewsOption from "./zhNews";
import { siteData } from "@vuepress/client";

const allPagesFrontmatter = siteData.value.frontmatter;

const props = defineProps({
  title: String
});

let option: ActivityOption = reactive({
  DESC: "",
  CARDS: []
});

const currentTag = ref("All");
let sectionDetail: GroupedPage[] = reactive([]);

const options = {
  News: enNewsOption,
  新闻: zhNewsOption,
  Activity: enActivityOption,
  活动: zhActivityOption,
  Blog: enBlogOption,
  博客: zhBlogOption
};
// 初始化分组对象
const groupedPages: GroupedPages = {
  新闻: [],
  News: [],
  博客: [],
  Blog: [],
  活动: [],
  Activity: []
};

for (const frontmatter of allPagesFrontmatter) {
  if (frontmatter?.head.length > 0) {
    const headName = frontmatter.head[0][1].name; // 拿到每篇md文章frontmatter下meta的name属性
    // 如果是新闻、博客或活动，则添加到相应的数组中
    if (groupedPages[headName] !== undefined) {
      groupedPages[headName].push({
        cover: frontmatter.cover,
        tag: frontmatter.tag,
        title: frontmatter.title,
        url:
          extractPathFromURL(
            frontmatter.head
              .flat()
              .find(
                (item: { property: string; content: string }) =>
                  item.property === "og:url"
              ).content
          ) ?? "", // head的一个数组对象中包含url
        author: frontmatter.author,
        date: formatDate(frontmatter.date)
      });
    }
  }
}
for (const key in groupedPages) {
  groupedPages[key].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
// 从框架提供的url中拿到跳转路径
function extractPathFromURL(url: string): string | null {
  const match = url.match(/\/([^/]+\.html)$/);
  if (match?.[1] != null) {
    return match[1];
  } else {
    return null;
  }
}
const TAGS = [
  "All",
  "DreamCode",
  "Dromara",
  "GateWay",
  "hmily",
  "Reactor",
  "Soul",
  "TCC"
];
watchEffect(() => {
  if (props.title !== undefined) {
    option = options[props.title as keyof typeof options];
    sectionDetail = groupedPages[props.title];
  }
});

type LangMapping = Record<string, "英文" | "中文">;
const mapping: LangMapping = {
  News: "英文",
  Activity: "英文",
  Blog: "英文",
  新闻: "中文",
  活动: "中文",
  博客: "中文"
};
const langMapping = computed(() => {
  return mapping[props.title ?? ""] ?? "中文";
});

function formatDate(inputDate: string): string {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
const filteredSectionDetail = computed(() => {
  if (currentTag.value === "All") {
    return sectionDetail;
  } else {
    return sectionDetail.filter((obj: GroupedPage) =>
      obj.tag.includes(currentTag.value)
    );
  }
});
</script>

<style scoped lang="scss">
.news-activity-blog-section {
  padding-top: var(--navbar-height);
  min-width: 320px;
  @media (min-width: 1440px) {
    padding-left: 16rem;
  }
}
.news-activity-blog-container {
  height: 422px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 24px;

  background: url(/assets/img/bg-blog.png) no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 0.5rem;
  @media (min-width: 960px) {
    padding-left: 5rem;
  }
  h1 {
    margin: 0;
    color: #171b25;
    font-size: 44px;
    font-weight: 900;
  }
  .description {
    max-width: 700px;
    padding-right: 52%;
    color: #61687c;
    font-size: 16px;
    line-height: 28px;
  }
}
.news-activity-blog-main {
  padding: 80px 2vw;
  @media (min-width: 1440px) {
    padding-left: 16rem;
  }

  .tag {
    font-weight: 700;
    border: none;
  }
  .buttons {
    display: flex;
    padding-right: 0px;
    align-items: center;
    gap: 16px;
    margin-bottom: 36px;
    flex-wrap: wrap;
  }
  .tag-button {
    display: flex;
    padding: 16px 30px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 6px;
    border: 1px solid #e5e6eb;
    background: #fff;
    color: #4e5969;
    cursor: pointer;
    &.selected {
      border: 1px solid #2d74ff;
      background: #eaf1ff;
      color: #2d74ff;
    }
  }
  .cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    @media (max-width: 600px) {
      grid-template-columns: 1fr;
      gap: 20px;
      padding: 0 10vw;
    }
    @media (min-width: 840px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  .no-data {
    font-size: 22px;
    color: #2c3e50;
    font-weight: bold;
    text-align: center;
    margin: 120px 20px 0;
  }
  .card {
    padding: 16px;
    border-radius: 8px;
    background: #fff;
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .cover {
    height: 190px;
    align-self: stretch;
    border-radius: 8px;
  }

  .tag-items {
    display: flex;
    gap: 10px;
    color: #2d74ff;
    font-size: 17px;
    font-weight: 600;
  }
  .title {
    color: #3e3232;
    font-size: 18px;
    font-weight: 700;
    &:hover {
      opacity: 0.66;
    }
  }
  .desc {
    color: #61687c;
    font-size: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
  }
  .author {
    display: flex;
    gap: 10px;
    height: 72px;
    padding: 13px 16px;
    align-items: center;
    align-self: stretch;
    border-radius: 12px;
    background: #f2f4f7;
  }
  .avatar {
    width: 44px;
    border-radius: 12px;
  }
}
</style>
