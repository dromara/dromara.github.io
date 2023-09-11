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
      <div class="committee">
        <h2 class="title">委员会成员</h2>
        <div class="founder">
          <img class="photo" src="/assets/img/members/xiaoyu.png" alt="" />
          <div class="info">
            <div class="role">创始人</div>
            <div class="name">肖宇</div>
            <div class="desc">
              Apache ShenYu 创始人/VP，Apache
              Member，同时还是Apache成员和Dromara开源组织的创立者且在分布式事务领域的贡献备受推崇。创作了许多重要的分布式事务框架，如Hmily、Raincat和Myth等，并且这些框架都被广泛应用。他领导的开源社区项目也受到了众多业界专家、开发者和用户的支持和关注。此外，他还著有《深入理解分布式事务：原理与实战》，这本书在分布式事务领域具有很高的影响力。
            </div>
          </div>
        </div>
        <ul class="members">
          <li class="member">
            <img class="photo" src="/assets/img/members/tom.png" alt="" />
            <div class="info">
              <div class="role">秘书长</div>
              <div class="name">巩超</div>
              <div class="desc">hertzbeat作者</div>
              <div class="photo-overlay">
                <div class="circle"></div>
              </div>
            </div>
          </li>
          <li class="member">
            <img class="photo" src="/assets/img/members/binghe.png" alt="" />
            <div class="info">
              <div class="role">成员</div>
              <div class="name">冰河</div>
            </div>
          </li>
          <li class="member">
            <img class="photo" src="/assets/img/members/looly.png" alt="" />
            <div class="info">
              <div class="role">成员</div>
              <div class="name">路小磊</div>
            </div>
          </li>
          <li class="member">
            <img class="photo" src="/assets/img/members/bryan31.png" alt="" />
            <div class="info">
              <div class="role">成员</div>
              <div class="name">铂赛东</div>
            </div>
          </li>
          <li class="member">
            <img class="photo" src="/assets/img/members/click33.png" alt="" />
            <div class="info">
              <div class="role">成员</div>
              <div class="name">刘潇</div>
            </div>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useSiteLocaleData } from '@vuepress/client';
import { type MembersOption } from './types';
import { ref, reactive, watch, onMounted } from 'vue';
import enMembersOption from './en';
import zhMembersOption from './zh';

let membersOption: MembersOption = reactive({
  MEMBERS: '',
  DESCRIPTION: ''
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
</script>

<style scoped lang="scss">
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
  .committee {
    font-weight: bold;
    .title {
      display: flex;
      justify-content: center;
      border: unset;
      font-size: 32px;
    }

    .founder {
      display: flex;
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
      .member {
        margin: 48px 0 0;
        display: flex;
        align-items: center;
        font-weight: bold;
        .photo {
          background: #e9f2ff;
          height: 160px;
          border-radius: 4px;
        }
        .info {
          z-index: 1;
          position: relative;
          background: #fff;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 0 16px rgba(0, 0, 0, 0.04);
          min-width: 88px;
          max-width: 120px;
          border-radius: 3px;
          height: 64px;
          transform: translateX(-25px);
          .photo-overlay {
            // position: absolute;
            // right: 50%;
            // top: -40px;
            display: flex;
            align-items: center;
            justify-content: center;
            transform: translate(-50px, -150px);
            border-radius: 50%;
            background-color: #f6faff;
            transition: background-color, transform 1s ease-in-out;
            .circle {
              border-radius: 50%;
              width: 80px;
              height: 80px;
              background: radial-gradient(
                circle at center,
                rgb(0 0 0 / 0) 20px,
                #ffffff 20px,
                #ffffff 21px,
                rgb(0 0 0 / 0) 21px,
                rgb(0 0 0 / 0) 40px,
                #ffffff 0
              );
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
          }
          .desc {
            z-index: 2;
            opacity: 0;
          }
        }
      }
    }
  }
}
</style>
