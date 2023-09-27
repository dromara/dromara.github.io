<template>
  <div class="members-page">
    <div class="bg-white">
      <div class="member-container">
        <h1 class="title">{{ membersOption.MEMBERS }}</h1>
        <p class="description">
          {{ membersOption.DESCRIPTION }}
        </p>
      </div>
    </div>
    <main class="member-main">
      <div class="member-banner">
        <h2 class="title">{{ membersOption.TOC_MEMBER_TITLE }}</h2>
        <div class="founder">
          <img class="photo" src="/assets/img/members/xiaoyu.png" alt="" />
          <div class="info">
            <div class="name">{{ membersOption.FOUNDER.name }}</div>
            <div class="role">{{ membersOption.FOUNDER.role }}</div>
            <div class="desc">{{ membersOption.FOUNDER.desc }}</div>
          </div>
        </div>
        <template v-for="item in membersOption.MEMBERS_ITEM" :key="item.header">
          <h2 class="title" v-if="item.header">{{ item.header }}</h2>
          <ul class="members">
            <li
              class="member"
              v-for="member in item.members"
              :key="member.name"
            >
              <div class="member-left">
                <img
                  class="photo"
                  :src="member.photo"
                  :alt="member.name + ' photo'"
                />
                <div class="slider"></div>
              </div>
              <div class="info">
                <div class="name">{{ member.name }}</div>
                <div class="role">{{ member.role }}</div>
                <div class="desc">{{ member.desc }}</div>
              </div>
            </li>
          </ul></template
        >
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useSiteLocaleData } from "@vuepress/client";
import { type MembersOption } from "./types";
import { ref, reactive, watch } from "vue";
import enMembersOption from "./en";
import zhMembersOption from "./zh";

let membersOption: MembersOption = reactive({
  MEMBERS: "",
  DESCRIPTION: "",
  TOC_MEMBER_TITLE: "",
  COMMITTEE_TITLE: "",
  COMMITTER_TITLE: "",
  FOUNDER: { role: "", name: "", photo: "", desc: "" },
  MEMBERS_ITEM: []
});
const siteLocaleData = useSiteLocaleData();
const lang = ref(siteLocaleData.value.lang);

watch(
  () => siteLocaleData.value.lang,
  (newLang) => {
    lang.value = newLang;
    if (lang.value === "zh-CN" || lang.value === "/zh/") {
      membersOption = zhMembersOption;
    } else {
      membersOption = enMembersOption;
    }
  },
  {
    immediate: true
  }
);
</script>

<style scoped lang="scss">
.members-page {
  padding-top: var(--navbar-height);
  min-width: 380px;
  overflow-x: hidden;
  @media (min-width: 1440px) {
    padding-left: 16rem;
  }
  .bg-white {
    background-color: #f9fbff;
  }
}
.member-container {
  height: 422px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 24px;

  background: url(/assets/img/bg-projects.png) no-repeat;
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

.member-main {
  padding: 30px 10vw;
  @media (min-width: 1440px) {
    padding: 30px 1vw;
  }
  .member-banner {
    font-weight: bold;
    .title {
      display: flex;
      justify-content: center;
      border: unset;
      font-size: 32px;
      color: #171b25;
      font-weight: 600;
    }

    .founder {
      display: flex;
      margin-bottom: 48px;
      .photo {
        height: 36vw;
        max-height: 240px;
        border-radius: 4px;
        background: #2a2a2a;
      }
      .info {
        margin-left: 32px;
        .name {
          color: #2e64fe;
          font-size: 20px;
        }
        .role {
          font-size: 18px;
          margin-top: 8px;
        }
        .desc {
          font-size: 16px;
          margin-top: 8px;
          line-height: 24px;
          font-weight: 400;
        }
      }
    }
    .members {
      list-style: none;
      margin-bottom: 50px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
      @media (max-width: 1000px) {
        grid-template-columns: 1fr;
        gap: 30px;
      }

      .member {
        display: flex;
        gap: 20px;
        padding: 0 15px 15px 0;
        background-color: none;
        .photo {
          width: 100%;
          border-radius: 4px;
          background: #2a2a2a;
        }
        .info {
          font-size: 14px;
          font-weight: 400;
          margin: 10px 0;
        }
        .name {
          font-size: 20px;
          color: #2e64fe;
          font-weight: 500;
        }
        .role {
          color: #61687c;
          font-size: 14px;
        }
        .desc {
          font-size: 13px;
          opacity: 0;
          visibility: hidden;
          max-height: 0;
          overflow: hidden;
          transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out,
            max-height 0.5s ease-in-out;
        }
        .member-left {
          width: 160px;
          height: 160px;
          flex-shrink: 0;
          position: relative;
        }
        .slider {
          position: absolute;
          top: -15px;
          right: -15px;
          width: 32px;
          height: 32px;
          border-radius: 5%;
          background-color: #2e64fe;
          transition: top 0.7s ease, right 0.7s ease;
        }
        @media (max-width: 550px) {
          flex-direction: column;
        }
        &:hover {
          background-color: #f0f3f9;
          border-radius: 4px;
          .desc {
            opacity: 1;
            visibility: visible;
            max-height: 250px;
          }
          .slider {
            top: 0;
            right: 0;
          }
        }
      }
    }
  }
}
</style>
