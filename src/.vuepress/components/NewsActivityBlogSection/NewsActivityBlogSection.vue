<template>
  <div class="news-activity-blog-section">
    <div class="bg-white">
      <div class="news-activity-blog-container">
        <h1 class="title">{{ title }}</h1>
        <p class="description">{{ option.DESC }}</p>
      </div>
    </div>
    <main class="news-activity-blog-main">
      <h2 class="tag">{{ langMapping === '中文' ? '标签' : 'Tag' }}</h2>
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
      <div class="cards" style="position: relative">
        <template v-if="filteredSectionDetail.length">
          <div
            v-for="obj in filteredSectionDetail"
            :key="obj.title"
            class="card"
          >
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
          </div></template
        >
        <div v-else class="no-data">
          {{ langMapping === '中文' ? '暂无数据' : 'Not found' }}
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watchEffect, computed } from 'vue';
import { type ActivityOption } from './types';

import enActivityOption from './enActivity';
import enBlogOption from './enBlog';
import enNewsOption from './enNews';
import zhActivityOption from './zhActivity';
import zhBlogOption from './zhBlog';
import zhNewsOption from './zhNews';
import { siteData } from '@vuepress/client';

const allPagesFrontmatter = siteData.value.frontmatter;

const props = defineProps({
  title: String
});

let option: ActivityOption = reactive({
  DESC: '',
  CARDS: []
});

const currentLang = ref('zh');
const currentTag = ref('All');
let sectionDetail = reactive([]);
// type TagMapping = Record<string, 'Tag' | '标签'>;

// function getTag(input: string): 'Tag' | '标签' {
//   const tagMapping: TagMapping = {
//     News: 'Tag',
//     Activity: 'Tag',
//     Blog: 'Tag',
//     新闻: '标签',
//     活动: '标签',
//     博客: '标签'
//   };
//   return tagMapping[input] ?? 'Tag';
// }

// const getTag = (input) => {
//   return getLang(input) === '中文' ? '标签' : 'Tag';
// };
// const getNoData = (input) => {
//   return getLang(input) === '中文' ? '标签' : 'Tag';
// };
const options = {
  News: enNewsOption,
  新闻: zhNewsOption,
  Activity: enActivityOption,
  活动: zhActivityOption,
  Blog: enBlogOption,
  博客: zhBlogOption
};
// 初始化分组对象
const groupedPages = {
  新闻: [],
  News: [],
  博客: [],
  Blog: [],
  活动: [],
  Activity: []
};

// 遍历所有页面的 frontmatter
for (const frontmatter of allPagesFrontmatter) {
  // 确保 frontmatter 有 head 属性
  if (frontmatter.head && frontmatter.head.length > 0) {
    const headName = frontmatter.head[0][1].name; // 假设 head 是一个数组，取第一个元素的 name 属性作为标识
    // 如果是新闻、博客或活动，则添加到相应的数组中
    if (groupedPages[headName] !== undefined) {
      groupedPages[headName].push({
        cover: frontmatter.cover,
        tag: frontmatter.tag,
        title: frontmatter.title,
        url: extractPathFromURL(
          frontmatter.head.flat().find((item) => item.property === 'og:url')
            .content
        ),
        author: frontmatter.author,
        date: formatDate(frontmatter.date)
      });
    }
  }
}
for (const key in groupedPages) {
  if (groupedPages.hasOwnProperty(key)) {
    groupedPages[key].sort((a, b) => new Date(b.date) - new Date(a.date));
  }
}
// 最终得到按照 head 分组的对象，只包含新闻、博客、活动三种 head
console.log(groupedPages);
function extractPathFromURL(url) {
  const match = url.match(/\/([^/]+\.html)$/);

  // 如果匹配成功，返回匹配到的部分
  if (match && match[1]) {
    return match[1];
  } else {
    return null; // 或者根据需要返回一个默认值或错误提示
  }
}
const TAGS = [
  'All',
  'DreamCode',
  'Dromara',
  'GateWay',
  'hmily',
  'Reactor',
  'Soul',
  'TCC'
];
watchEffect(() => {
  if (props.title !== undefined) {
    option = options[props.title as keyof typeof options];
    // tag.value = getTag(props.title);
    sectionDetail = groupedPages[props.title];
    console.log(groupedPages);
  }
});
type LangMapping = Record<string, '英文' | '中文'>;

const langMapping = computed(() => {
  const mapping: LangMapping = {
    News: '英文',
    Activity: '英文',
    Blog: '英文',
    新闻: '中文',
    活动: '中文',
    博客: '中文'
  };
  return mapping[props.title] ?? '中文';
});
function formatDate(inputDate) {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
const filteredSectionDetail = computed(() => {
  if (currentTag.value === 'All') {
    return sectionDetail;
  } else {
    return sectionDetail.filter((obj) => obj.tag.includes(currentTag.value));
  }
});
</script>

<style scoped lang="scss">
.news-activity-blog-section {
  padding-top: var(--navbar-height);
  min-width: 320px;
  .bg-white {
    background-color: #f9fbff;
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
      gap: 0;
    }
    @media (min-width: 840px) and (max-width: 1439px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  .no-data {
    font-size: 32px;
    color: #2c3e50;
    font-weight: bold;
    position: absolute;
    right: 50%;
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
