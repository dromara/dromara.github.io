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
            <div class="role">{{ membersOption.FOUNDER.role }}</div>
            <div class="name">{{ membersOption.FOUNDER.name }}</div>
            <div class="desc">{{ membersOption.FOUNDER.desc }}</div>
          </div>
        </div>
        <ul class="members">
          <li
            class="member non-overlay"
            @mouseenter="memberMouseIn"
            @mouseleave="memberMouseOut"
            v-for="(member, index) in membersOption.TOC_MEMBERS"
            :key="index"
          >
            <img class="photo" :src="member.photo" alt="" />
            <div class="info">
              <div class="photo-overlay">
                <div class="circle"></div>
              </div>
              <div class="role">{{ member.role }}</div>
              <div class="name">{{ member.name }}</div>
              <div class="desc">{{ member.desc }}</div>
            </div>
          </li>
        </ul>
        <h2 class="title">{{ membersOption.COMMITTEE_TITLE }}</h2>
        <ul class="members">
          <li
            class="member non-overlay"
            @mouseenter="memberMouseIn"
            @mouseleave="memberMouseOut"
            v-for="(member, index) in membersOption.COMMITTEES"
            :key="index"
          >
            <img class="photo" :src="member.photo" alt="" />
            <div class="info">
              <div class="photo-overlay">
                <div class="circle"></div>
              </div>
              <div class="role">{{ member.role }}</div>
              <div class="name">{{ member.name }}</div>
              <div class="desc">{{ member.desc }}</div>
            </div>
          </li>
        </ul>
        <h2 class="title">{{ membersOption.COMMITTER_TITLE }}</h2>
        <ul class="members">
          <li
            class="member non-overlay"
            @mouseenter="memberMouseIn"
            @mouseleave="memberMouseOut"
            v-for="(member, index) in membersOption.COMMITTERS"
            :key="index"
          >
            <img class="photo committer-photo" :src="member.photo" alt="" />
            <div class="info">
              <div class="photo-overlay">
                <div class="circle"></div>
              </div>
              <div class="role">{{ member.role }}</div>
              <div class="name">{{ member.name }}</div>
              <div class="desc">{{ member.desc }}</div>
            </div>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useSiteLocaleData } from '@vuepress/client';
import { type MembersOption, type Member } from './types';
import { ref, reactive, watch, onMounted } from 'vue';
import enMembersOption from './en';
import zhMembersOption from './zh';

let membersOption: MembersOption = reactive({
  MEMBERS: '',
  DESCRIPTION: '',
  TOC_MEMBER_TITLE: '',
  COMMITTEE_TITLE: '',
  COMMITTER_TITLE: '',
  FOUNDER: { role: '', name: '', photo: '', desc: '' },
  TOC_MEMBERS: [],
  COMMITTEES: [],
  COMMITTERS: []
});
const siteLocaleData = useSiteLocaleData();
const lang = ref(siteLocaleData.value.lang);

watch(
  () => siteLocaleData.value.lang,
  (newLang) => {
    lang.value = newLang;
    if (lang.value === 'zh-CN' || lang.value === '/zh/') {
      membersOption = zhMembersOption;
    } else {
      membersOption = enMembersOption;
    }
  },
  {
    immediate: true
  }
);

onMounted(() => {
  document
    .querySelectorAll('.member')
    ?.forEach((d) => scaleMemberName(d, false));
});

function scaleMemberName(memberElement: Element | null, reset: boolean) {
  if (!memberElement) {
    return;
  }
  const nameElement = memberElement.querySelector('.name');
  if (!(nameElement instanceof HTMLDivElement)) {
    return;
  }
  if (reset) {
    nameElement.style.scale = String();
    return;
  }
  const boundingBox = nameElement.getBoundingClientRect();
  const actualWidth = boundingBox.width;
  const scale = 84 / actualWidth;
  console.log({ [`${nameElement.textContent}`]: actualWidth, scale });
  if (scale >= 1) {
    return;
  }
  nameElement.style.scale = String(scale);
}
function memberMouseIn(e: MouseEvent) {
  if (e.target instanceof HTMLElement) {
    e.target.classList.remove('non-overlay');
    e.target.style.zIndex = '3';
    scaleMemberName(e.target, true);
  }
}
function memberMouseOut(e: MouseEvent) {
  if (e.target instanceof HTMLElement) {
    e.target.classList.add('non-overlay');
    e.target.style.zIndex = '';
    scaleMemberName(e.target, false);
  }
}
</script>

<style scoped lang="scss">
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.members-page {
  padding-top: var(--navbar-height);
  min-width: 600px;
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
  margin-top: 30px;
  .member-banner {
    font-weight: bold;
    .title {
      display: flex;
      justify-content: center;
      border: unset;
      font-size: 32px;
    }

    .founder {
      display: flex;
      margin-bottom: 48px;
      .photo {
        height: 240px;
        border-radius: 4px;
        background: #e9f2ff;
      }
      .info {
        margin-left: 32px;
        .role {
          color: #0c7bf4;
          font-size: 16px;
        }
        .name {
          font-size: 32px;
          margin-top: 8px;
        }
        .desc {
          font-size: 14px;
          margin-top: 8px;
          line-height: 24px;
        }
      }
    }
    .members {
      list-style: none;
      padding: initial;
      display: flex;
      margin-bottom: 50px;
      flex-wrap: wrap;
      .member {
        display: flex;
        align-items: center;
        font-weight: bold;
        position: relative;
        width: 240px;
        height: 200px;
        .photo {
          animation: fade-in 2.5s;
          height: 160px;
          border-radius: 4px;
          position: absolute;
          top: 40px;
          z-index: 3;
        }
        .committer-photo {
          border-radius: 50%;
        }
        .info {
          z-index: 2;
          position: absolute;
          top: -10px;
          left: -50px;
          background: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 0 16px rgba(0, 0, 0, 0.04);
          width: 240px;
          border-radius: 3px;
          padding: 240px 10px 10px 10px;
          .photo-overlay {
            position: absolute;
            top: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 220px;
            height: 220px;
            border-radius: 50%;
            background-color: #e9f2ff;
            transition: background-color, transform 1s ease-in-out;
            .circle {
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 50%;
              width: 170px;
              height: 170px;
              background: radial-gradient(
                circle at center,
                rgb(0 0 0 / 0) 50%,
                #ffffff calc(50% + 1px),
                #ffffff calc(50% + 1px),
                rgb(0 0 0 / 0) calc(50% + 1px),
                rgb(0 0 0 / 0) 100%
              );
              position: absolute;
            }
          }
          .role {
            z-index: 2;
            font-size: 14px;
            margin-top: 8px;
            color: #0c7bf4;
          }
          .name {
            z-index: 2;
            font-size: 16px;
            white-space: nowrap;
          }
          .desc {
            font-size: 12px;
            font-weight: initial;
            z-index: 2;
          }
        }
        &.non-overlay {
          .photo {
            animation: initial;
            background: #e9f2ff;
            z-index: 1;
          }
          .info {
            width: 94px;
            height: 64px;
            padding: 0;
            overflow: hidden;
            transform: translate(190px, 90px);
            z-index: 2;
            .photo-overlay {
              background-color: #f6faff;
              transform: scale(0.3);
              top: -110px;
              left: -110px;
              .circle {
              }
            }
            .role {
            }
            .name {
            }
            .desc {
              opacity: 0;
            }
          }
        }
      }
    }
  }
}
</style>
