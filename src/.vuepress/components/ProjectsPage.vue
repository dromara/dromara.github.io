<script setup lang="ts">
import GitHubStars from "./GitHubStars.vue";
import {
  noGiteeProjects,
  noGithubProjects,
  noImageProject,
  useProjectsData
} from "../composables/index.js";
import { onMounted } from "vue";

const { projectLocale, projectItems } = useProjectsData();

const convertToUpperCamelCase = (name: string): string =>
  name
    .replace(/-([a-z])/g, (letter: string) => letter.toUpperCase())
    .replace(/^([a-z])/, (letter: string) => letter.toUpperCase());

let webCn: Boolean = false;
onMounted(() => {
  webCn = document.location.host.includes("dromara.org.cn");
  const orgAds = document.getElementById("wwadsadsorg");
  if (orgAds) {
    orgAds.innerHTML = webCn ? '<div class="wwads-cn wwads-horizontal" data-id="339" style="max-width:350px"></div>' : '<div class="wwads-cn wwads-horizontal" data-id="127" style="max-width: 500px"></div>';
  }
});
</script>

<template>
  <div class="projects-page">
    <div class="bg-default">
      <div class="project-container">
        <h1 class="title">{{ projectLocale.PROJECTS }}</h1>
        <p class="description">
          {{ projectLocale.DESCRIPTION }}
        </p>
      </div>
    </div>
    <div id="wwadsadsorg" style="max-width: 500px"></div>
  </div>
  <main class="project-main">
    <div
      v-for="item in projectItems"
      :key="item.groupName"
      class="project-group"
    >
      <h2 class="group-name">{{ item.groupName }}</h2>
      <div class="project-card">
        <div class="project" v-for="obj in item.projects" :key="obj.name">
          <div class="project-top">
            <div class="project-header">
              <img
                v-if="!noImageProject.includes(obj.name)"
                class="project-title"
                :src="`/assets/img/logo/${obj.name}.webp`"
                :alt="obj.name"
              />
              <div v-else class="project-title text">
                {{ convertToUpperCamelCase(obj.name) }}
              </div>
              <div class="gitstar">
                <template v-if="lang == 'zh-CN' || lang == '/zh/'">
                  <a
                    v-if="!noGiteeProjects.includes(obj.name)"
                    :href="`https://gitee.com/dromara/${obj.name}/stargazers`"
                    target="_blank"
                    ><img
                      :src="`https://gitee.com/dromara/${obj.name}/badge/star.svg?theme=gvp`"
                  /></a>
                </template>
                <template v-else>
                  <GitHubStars
                    v-if="!noGithubProjects.includes(obj.name)"
                    :project="obj.name"
                  />
                </template>
              </div>
            </div>
            <div class="project-content">{{ obj.description }}</div>
          </div>
          <div class="hiding-detail">
            <p v-if="obj.sponsor">
              {{ projectLocale.PROJECT_SPONSOR }}：{{ obj.sponsor }}
            </p>
            <p v-if="obj.date">
              {{ projectLocale.JOINING_DATE }}：{{ obj.date }}
            </p>
            <p v-html="obj.link"></p>
          </div>
          <div class="project-buttons">
            <a
              class="project-button primary"
              target="_blank"
              :href="obj.website"
            >
              {{ projectLocale.START_UP }}
            </a>
            <a
              v-if="!noGiteeProjects.includes(obj.name)"
              class="project-button"
              target="_blank"
              :href="`https://gitee.com/dromara/${obj.name}`"
              >Gitee</a
            >
            <a
              v-if="!noGithubProjects.includes(obj.name)"
              class="project-button"
              target="_blank"
              :href="`https://github.com/dromara/${obj.name}`"
              >Github</a
            >
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.projects-page {
  padding-top: var(--navbar-height);
  min-width: 380px;

  @media (min-width: 1440px) {
    padding-left: 16rem;
  }
}

.project-container {
  height: 422px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 24px;

  background: url(/assets/img/bg-projects.webp) no-repeat;
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

.project-main {
  background-color: #f9fbff;
  padding: 30px 10vw;

  @media (min-width: 1440px) {
    padding: 30px 2vw;
    padding-left: 16rem;
  }

  .project-group {
    padding: 50px 0 30px;
  }

  .group-name {
    font-weight: 700;
    margin: 0;
    border: none;
  }

  .project-card {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    align-items: center;

    @media (max-width: 820px) {
      grid-template-columns: 1fr;
      gap: 15px;
    }

    @media (min-width: 1220px) and (max-width: 1439px) {
      grid-template-columns: repeat(3, 1fr);
    }

    p {
      margin: 0.5em 0;
    }
  }
  .project {
    display: flex;
    min-width: 300px;
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    border-radius: 8px;
    background: #fff;

    &:hover {
      .hiding-detail {
        margin-top: 0;
        opacity: 1;
        visibility: visible;
        z-index: 1000;
      }
    }
  }
  .project-top {
    width: 100%;
    background-color: #fff;
    position: sticky;
    z-index: 1000;

    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .project-title {
    width: 120px;
    height: 50px;
    object-fit: contain;

    &.text {
      display: flex;
      align-items: center;
      font-size: 20px;
      font-weight: 500;
      white-space: nowrap;
    }
  }

  .project-description {
    margin-top: 16px;
    position: sticky;
    z-index: 1000;
  }

  .hiding-detail {
    min-height: 150px;
    overflow: hidden;
    margin-top: -150px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.5s ease-in-out;
    position: sticky;
    z-index: -1000;
  }

  .project-buttons {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    margin-top: 16px;

    .project-button {
      display: inline-block;
      height: 30px;
      line-height: 30px;
      color: #2e64fe;
      background-color: #f8fbff;
      border-radius: 4px;
      text-align: center;

      &.primary {
        background-color: #2274de;
        color: #fff;
      }
    }
  }
}
</style>
