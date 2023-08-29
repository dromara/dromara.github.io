<template>
  <div class="home-page">
    <div class="wrapper">
      <div class="vp-hero-mask">
        <div class="vp-hero-info">
          <h1 id="main-title">Dromara</h1>
          <p class="vp-description">{{ homeOption.DESCRIPTION }}</p>
          <p class="vp-actions">
            <a
              :href="
                lang === 'zh-CN' || lang === '/zh/'
                  ? '/zh/projects/'
                  : '/projects/'
              "
              class="vp-action primary"
              >{{ homeOption.QUICK_START }}</a
            >
            <a href="https://gitee.com/dromara" class="vp-action">Gitee</a>
            <a href="https://github.com/dromara" class="vp-action">GitHub</a>
          </p>
        </div>
      </div>
      <div class="feature-wrapper">
        <div class="feature slogan">
          <div class="feature-container slogan-container">
            <div class="feature-title">
              <img src="/assets/img/open.png" alt="open" />
              <h2>{{ homeOption.OPEN }}</h2>
            </div>
            <p class="home-description">{{ homeOption.OPEN_DESCRIPTION }}</p>
          </div>
          <div class="feature-container slogan-container">
            <div class="feature-title">
              <img src="/assets/img/vision.png" alt="vision" />
              <h2>{{ homeOption.VISION }}</h2>
            </div>
            <p class="home-description">
              {{ homeOption.VISION_DESCRIPTION }}
            </p>
          </div>
          <div class="feature-container slogan-container">
            <div class="feature-title">
              <img src="/assets/img/slogan.png" alt="slogan" />
              <h2>{{ homeOption.SLOGAN }}</h2>
            </div>
            <p class="home-description">
              {{ homeOption.SLOGAN_DESCRIPTION }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="project">
      <h2 class="header-project">{{ homeOption.PROJECT }}</h2>
      <a
        :href="
          lang === 'zh-CN' || lang === '/zh/' ? '/zh/projects/' : '/projects/'
        "
        class="more"
        >{{ homeOption.MORE_PROJECTS + '&nbsp;&nbsp;>' }}</a
      >
      <div class="project-container">
        <img class="project-img" src="/assets/img/projects.png" alt="project" />
        <div class="projects">
          <template v-for="item in homeOption.PROJECT_DETAILS" :key="item.name">
            <div class="project-item" @click="navigateTo(item.url)">
              <div class="top-text">{{ item.name }}</div>
              <div class="bottom-text">{{ item.description }}</div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="community">
      <h2 class="header-community">{{ homeOption.COMMUNITY }}</h2>
      <div class="feature-wrapper">
        <div class="feature">
          <template v-for="section in communityLink" :key="section.category">
            <div class="feature-container">
              <div class="feature-title">
                <img :src="section.icon" />
                <h2>{{ section.category }}</h2>
              </div>
              <template v-for="item in section.details" :key="item.title">
                <div class="community-item" @click="navigateTo(item.url)">
                  <div class="content">
                    <div class="title">{{ item.title }}</div>
                    <div class="time">{{ item.time }}</div>
                  </div>
                  <div class="icon-container">
                    <div class="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 14 12"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M10.1903 5.26519L6.22065 1.29552L7.28131 0.234863L13.0616 6.01519L7.28131 11.7955L6.22065 10.7349L10.1903 6.76519H0.000976562V5.26519H10.1903Z"
                          fill="#1D1D1B"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { watch, ref, reactive, onMounted } from 'vue';
import { type HomeOption } from './types';
import { useSiteLocaleData } from '@vuepress/client';
import enHomeOption from './en';
import zhHomeOption from './zh';
import { siteData } from '@vuepress/client';

const allPagesFrontmatter = siteData.value.frontmatter;
console.log(allPagesFrontmatter);
const siteLocaleData = useSiteLocaleData();
const lang = ref(siteLocaleData.value.lang);
let communityLink = reactive([]);
const enCommunityLink = reactive([]);
const zhCommunityLink = reactive([]);
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
        title: frontmatter.title,
        url: extractPathFromURL(
          frontmatter.head.flat().find((item) => item.property === 'og:url')
            .content
        ),
        time: formatDate(frontmatter.date),
        category: headName
      });
    }
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
function formatDate(inputDate) {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
// 定义一个映射，将 headName 映射到对应的 icon 路径
const mapping = {
  News: {
    icon: '/assets/img/news.png',
    urlPrefix: 'news/'
  },
  Activity: {
    icon: '/assets/img/activity.png',
    urlPrefix: 'activity/'
  },
  Blog: {
    icon: '/assets/img/blog.png',
    urlPrefix: 'blog/'
  },
  新闻: {
    icon: '/assets/img/news.png',
    urlPrefix: 'news/'
  },
  活动: {
    icon: '/assets/img/activity.png',
    urlPrefix: 'activity/'
  },
  博客: {
    icon: '/assets/img/blog.png',
    urlPrefix: 'blog/'
  }
};
// 遍历 groupedPages 中的每个分组
for (const headName in groupedPages) {
  if (groupedPages.hasOwnProperty(headName)) {
    const pages = groupedPages[headName];

    // 按照日期排序
    pages.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 只选择日期最新的前 5 个项目
    const latestPages = pages.slice(0, 5);

    // 获取映射
    const { icon, urlPrefix } = mapping[headName];

    const formattedPages = {
      category: headName,
      icon: icon,
      details: latestPages
        .map((page) => ({
          title: page.title,
          time: page.time,
          url: `${urlPrefix}${page.url}`
        }))
        .sort((a, b) => new Date(b.time) - new Date(a.time)) // 对 details 内部的项目按时间排序
    };

    if (headName === 'News' || headName === 'Activity' || headName === 'Blog') {
      enCommunityLink.push(formattedPages);
    } else if (
      headName === '新闻' ||
      headName === '活动' ||
      headName === '博客'
    ) {
      zhCommunityLink.push(formattedPages);
    }
  }
}

console.log(enCommunityLink);

let homeOption: HomeOption = reactive({
  QUICK_START: '',
  DESCRIPTION: '',
  OPEN: '',
  OPEN_DESCRIPTION: '',
  VISION: '',
  VISION_DESCRIPTION: '',
  SLOGAN: '',
  SLOGAN_DESCRIPTION: '',
  PROJECT: '',
  MORE_PROJECTS: '',
  PROJECT_DETAILS: [],
  COMMUNITY: '',
  COMMUNITY_ITEM: []
});

watch(
  () => siteLocaleData.value.lang,
  (newLang) => {
    lang.value = newLang;
    if (lang.value === 'zh-CN' || lang.value === '/zh/') {
      homeOption = zhHomeOption;
      communityLink = zhCommunityLink;
    } else {
      homeOption = enHomeOption;
      communityLink = enCommunityLink;
    }
  },
  {
    immediate: true
  }
);
onMounted(() => {
  const scalingElementProject = document.querySelector(
    '.header-project'
  ) as HTMLHeadingElement;
  const scalingElementCommunity = document.querySelector(
    '.header-community'
  ) as HTMLHeadingElement;

  const clientH = window.innerHeight;

  const halfViewportHeight = clientH / 2;
  function applyScale(
    element: HTMLHeadingElement,
    top: number,
    midPoint: number
  ): void {
    if (top <= clientH && midPoint <= top) {
      const scale = 1 + (1.2 * (top - midPoint)) / midPoint;
      element.style.transform = `scale(${scale})`;
    }
  }

  function updateScales(): void {
    applyScale(
      scalingElementProject,
      scalingElementProject.getBoundingClientRect().top,
      halfViewportHeight
    );
    applyScale(
      scalingElementCommunity,
      scalingElementCommunity.getBoundingClientRect().top,
      halfViewportHeight + 20
    );
  }
  window.addEventListener('scroll', updateScales);

  window.addEventListener('beforeunload', () => {
    window.removeEventListener('scroll', updateScales);
  });
});
const navigateTo = (url: string) => {
  window.location.href = url;
};
</script>
<style scoped lang="scss">
.home-page {
  padding-top: var(--navbar-height);
  background: #f9fbff;
  .wrapper {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - var(--navbar-height));
  }
  h2 {
    border-bottom: none;
  }
  .vp-hero-mask {
    background: url(/assets/img/bg-image.png) no-repeat;

    background-size: cover;
    background-position: center;
    @media (min-width: 960px) {
      padding-left: 5rem;
    }
  }
  .vp-hero-info {
    padding: 100px 24px;
    #main-title {
      margin: 0.5rem 0;
      background: linear-gradient(120deg, #0a7bf4, #096dd9, #7509d9 100%);
      -webkit-background-clip: text;
      background-clip: text;
      font-weight: bold;
      font-size: 3.6rem;
      -webkit-text-fill-color: transparent;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',
        'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica,
        Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
        'Segoe UI Symbol';

      @media (max-width: 959px) {
        font-size: 2.5rem;
        text-align: center;
      }
      @media (max-width: 719px) {
        font-size: 2.25rem;
        text-align: center;
      }
      @media (max-width: 419px) {
        margin: 0;
        font-size: 1.9rem;
      }
    }
  }

  .vp-description,
  .vp-actions {
    max-width: 35rem;
    color: #3a5169;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 1.3;
    margin: 1.8rem 0;
    @media (max-width: 959px) {
      margin: 1.5rem auto;
      text-align: center;
    }
    @media (max-width: 719px) {
      font-size: 1.4rem;
    }

    @media (max-width: 419px) {
      font-size: 1.2rem;
    }
  }

  .vp-action {
    display: inline-block;
    overflow: hidden;
    min-width: 4rem;
    margin: 0.5rem;
    padding: 0.5em 1.5rem;
    border-radius: 2rem;
    background: #f8f8f8;
    color: #2c3e50;
    font-size: 1.2rem;
    text-align: center;
    transition: color 0.3s ease, color 0.3s ease, transform 0.3s ease;
    &:hover {
      border-color: #eceef1;
      background: #eceef1;
    }

    &.primary {
      border-color: #096dd9;
      background: #096dd9;
      color: #fff;
      &:hover {
        border-color: #0a7bf4;
        background: #0a7bf4;
      }
    }
    @media (max-width: 419px) {
      font-size: 1rem;
    }
  }

  .feature-wrapper {
    padding: 0 60px;
  }
  .feature {
    margin: -80px 0 20px;
    display: flex;
    justify-content: space-between;
    border-radius: 6px;
    box-shadow: 0px 4px 32px 0px rgba(64, 93, 149, 0.05);
    box-sizing: border-box;
    min-height: 210px;
    &.slogan :hover {
      transform: translateY(-5%);
      transition: transform 250ms ease-in-out;
    }

    @media (max-width: 800px) {
      flex-direction: column;
    }
    .feature-container {
      display: flex;
      flex-direction: column;
      background-color: rgba(255, 255, 255, 0.9);
      margin: 20px 12px;
      border-radius: 0.375rem;
      padding: 20px 42px;
      &.slogan-container :hover {
        transform: translateY(0);
      }

      @media (min-width: 800px) {
        width: 30%;
      }

      img {
        margin: 0 20px 10px 0;
      }

      .feature-title {
        display: flex;
        align-items: center;
      }
      .home-description {
        margin: 0;
      }
    }
  }
  .project {
    background: url(/assets/img/project-bg.png) no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 0;
  }
  .project-container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    @media (max-width: 991px) {
      flex-direction: column;
    }

    .project-img {
      width: 30rem;
      @media (max-width: 568px) {
        width: 20rem;
      }
    }
    .projects {
      display: grid;
      padding: 10px 25px 30px;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(4, 100px);
      gap: 10px;
      min-width: 380px;
    }
    .project-item {
      background-color: #fff;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-radius: 8px;
      border: 1px solid #f1f2f5;
      color: #414960;
      cursor: pointer;

      .top-text {
        font-size: 18px;
      }

      .bottom-text {
        font-size: 16px;
      }
      &:hover {
        color: #2e64fe !important;
        box-shadow: 0px 4px 32px 0px rgba(0, 0, 0, 0.06),
          0px 0px 10px 0px rgba(0, 0, 0, 0.04);
      }
    }
  }
  .header-project,
  .header-community {
    text-align: center;
    font-weight: 700;
    transform: scale(2.2);
  }
  .more {
    color: #2e64fe;
    margin-top: 0;
    padding: 5px 10px;
    margin-bottom: 16px;
    cursor: pointer;
    &:hover {
      display: inline-block;
      background: #e8f0fe;
      border-radius: 5px;
    }
  }
  .community {
    padding: 20px 0;
    .feature {
      margin: 0;
      box-shadow: none;
      background: none;
      display: grid;
      gap: 16px;
      grid: auto-flow/repeat(var(--devsite-columns, 3), 1fr);

      @media (max-width: 991px) {
        --devsite-columns: 2;
      }
      @media (max-width: 568px) {
        display: block;
      }
    }
    .feature-container {
      border: 1px solid #f1f2f5;
      margin: 30px 0;
      padding: 10px 20px;
      min-width: 220px;
      width: auto;
      h2 {
        font-size: 32px;
        font-weight: 700;
      }
    }
    .community-item {
      display: flex;
      align-items: center;
      padding: 10px;
      cursor: pointer;
      position: relative;

      &:hover {
        .content::after {
          content: '';
          position: absolute;
          bottom: -1px;
          height: 1px;
          width: 100%;
          left: 0;
          animation: bottom 750ms ease-in-out;
          background-color: #b8b8b5;
          background-color: #1d1d1b;
        }
        .icon {
          transform: translateX(5px);
          transition: transform 250ms ease-in-out;
        }
      }
    }

    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .title {
      font-size: 16px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .time {
      font-size: 14px;
    }
    .icon-container {
      flex: 0;
      margin-left: 10px;
    }

    .icon {
      font-size: 20px;
    }
  }
}
@media (max-width: 991px) {
  html {
    font-size: 55%;
    scroll-padding-top: 8rem;
  }

  .home h3 {
    font-size: 4rem;
  }
}
@keyframes bottom {
  0% {
    right: 0;
    left: auto;
    width: 100%;
  }

  50% {
    width: 0%;
  }

  100% {
    width: 100%;
    left: 0;
  }
}
</style>
