<template>
  <div class="github-star">
    <a
      class="github-button"
      :href="`https://github.com/repos/dromara/${props.project}`"
    >
      <svg
        viewBox="0 0 16 16"
        width="16"
        height="16"
        class="octicon octicon-star"
        aria-hidden="true"
      >
        <path
          d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"
        ></path>
      </svg>
    </a>
    <a
      v-if="!!stars"
      class="social-count"
      :href="`https://github.com/dromara/${props.project}/stargazers`"
      rel="noopener"
      target="_blank"
      >{{ stars }}</a
    >
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';

const props = defineProps({
  project: String
});

const stars = ref();

onBeforeMount(() => {
  if (props.project !== null && props.project !== undefined) {
    fetch(`https://api.github.com/repos/dromara/${props.project}`, {
      headers: {
        accept: '*/*',
        'accept-language': 'zh-CN,zh;q=0.9',
        'sec-ch-ua':
          '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site'
      },
      referrer: 'https://dromara.org/',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: null,
      method: 'GET',
      mode: 'cors',
      credentials: 'omit'
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return await response.json();
      })
      .then((data) => {
        stars.value = thousandsSeparator(data.stargazers_count);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
});

const thousandsSeparator = function (value: {
  toString: () => string
}): string {
  if (typeof value === 'undefined') return '';
  const parts = value.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};
</script>

<style scoped lang="scss">
.github-star > .github-button:last-child {
  border-radius: 0.25em;
}
.github-button {
  height: 16px;
  padding: 5px 10px;
  font-size: 12px;
  line-height: 16px;
  color: #24292f;
  background-color: #ebf0f4;
  border: 1px solid rgba(31, 35, 40, 0.15);
  border-radius: 0.25em 0 0 0.25em;
  .octicon {
    display: inline-block;
    vertical-align: text-top;
  }
}
.social-count {
  height: 16px;
  padding: 5px 10px;
  font-size: 12px;
  line-height: 16px;
  background-color: #fff;
  color: #24292f;
  border: 1px solid rgba(31, 35, 40, 0.15);
  border-left: 0;
  border-radius: 0 0.25em 0.25em 0;
}
</style>
