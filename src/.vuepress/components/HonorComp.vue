<script setup lang="ts">
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import { useHonorLocale } from "../composables/index.js";

const honorLocale = useHonorLocale();
</script>

<template>
  <div class="honor-page">
    <swiper
      :modules="[Navigation]"
      :slidesPerView="2.2"
      :spaceBetween="30"
      :navigation="true"
      :loop="true"
      :loopedSlides="2"
    >
      <swiper-slide v-for="item in honorLocale.SLIDES" :key="item.img">
        <div class="honor-card">
          <div class="honor-box">
            <viewer> <img :src="item.img" :alt="item.desc" /> </viewer>
          </div>
          <p>{{ item.desc }}</p>
        </div>
      </swiper-slide>
    </swiper>
    <div class="about-year-record-container">
      <div class="swiper-wrapper about-year-record-box">
        <div
          v-for="obj in honorLocale.TIME_LINE"
          :key="obj.year"
          class="swiper-slide swiper-no-swiping year-record-item-box"
          :style="{ width: '193px' }"
        >
          <div class="year-record-item">
            <h3 class="year-record-year-text">{{ obj.year }}</h3>
            <ul class="year-record-desc-list">
              <li
                v-for="item in obj.items"
                :key="item"
                class="year-record-desc-item"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.honor-page {
  padding: 10px 0;
}
.honor-card {
  border-radius: 12px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  padding: 0 10px;
  margin: 5px 0;
  p {
    min-height: 68px;
    font-size: 14px;
    margin: 8px 0;
    text-align: center;
    @media screen and (max-width: 568px) {
      min-height: 98px;
      font-size: 12px;
    }
  }
}
.honor-box {
  border-bottom: 1px solid #e5e5e5;
  height: 250px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-height: 240px;
    max-width: 100%;
    cursor: pointer;
  }
}
.about-year-record-box {
  padding: 233px 0 84px 35px;
  overflow-x: scroll;
}
.about-year-record-container
  .swiper-wrapper
  > div:nth-child(odd)
  .year-record-desc-list {
  padding: 0 0 50px;
  margin: 0;
  position: relative;
}
.year-record-item-box {
  padding-left: 16px;
  padding-right: 8px;
  position: relative;
}
.year-record-year-text {
  font-size: 24px;
  font-weight: 700;
  line-height: 24px;
  color: #808ce1;
}
.year-record-desc-list li {
  list-style-type: none;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.swiper-wrapper {
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  transition-property: transform;
  box-sizing: content-box;
}
.about-year-record-box {
  align-items: center;
}
// 横线
.about-year-record-container {
  position: relative;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    background-color: #808ce1;
    width: 100%;
    height: 2px;
    border-radius: 2px;
    display: block;
    transform: translateY(323px);
    top: 0;
  }
}
// 每个年份的点
.year-record-item-box::before {
  content: "";
  display: block;
  position: absolute;
  left: -8px;
  width: 8px;
  height: 8px;
  background-color: #808ce1;
  border-radius: 50%;
  border: 5px solid #c8cdf2;
  box-sizing: content-box;
  z-index: 1;
}
.about-year-record-container .swiper-wrapper > div:nth-child(odd)::before {
  bottom: calc(50% + 36px);
}
.about-year-record-container .swiper-wrapper > div:nth-child(even)::before {
  top: calc(50% - 54px);
}
// 文字位置
.about-year-record-container
  .swiper-wrapper
  > div:nth-child(odd)
  .year-record-item {
  transform: translateY(-50%);
}
.about-year-record-container
  .swiper-wrapper
  > div:nth-child(even)
  .year-record-item {
  padding-top: 0;
  transform: translateY(50%);
}
// 垂直的线
.about-year-record-container
  .swiper-wrapper
  > div:nth-child(even)
  .year-record-item::before {
  content: "";
  display: block;
  position: absolute;
  top: -20px;
  left: -16px;
  width: 1px;
  background-color: #808ce1;
  height: calc(100% + 16px);
}
.about-year-record-container
  .swiper-wrapper
  > div:nth-child(odd)
  .year-record-desc-list::before {
  content: "";
  display: block;
  position: absolute;
  top: 8px;
  left: -16px;
  width: 1px;
  height: calc(100% - 32px);
  background-color: #808ce1;
}
// 每个事件的点
.year-record-desc-item {
  position: relative;
  font-size: 14px;
  font-weight: 300;
  line-height: 18px;
  margin: 0 0 8px;
  &::before {
    content: "";
    display: block;
    position: absolute;
    left: -20px;
    top: 6px;
    width: 8px;
    height: 8px;
    background-color: #f4f5fd;
    border-radius: 50%;
    border: 1px solid #808ce1;
  }
}
</style>
