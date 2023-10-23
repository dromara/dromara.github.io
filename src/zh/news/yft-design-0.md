---
title: 新晋开源项目 yft-design 加入 Dromara 社区，基于Canvas的开源版"创客贴"
author: yft
date: 2023-09-08
cover: /assets/img/news/yft-design-0-1.png
head:
  - - meta
    - name: 新闻
---

## yft-design 基于 Canvas 的开源版"创客贴"

## 项目介绍

- dromara 开源组织成员，dromara/yft-design 作者。
- 使用 Vue3 + TypeScript + Fabric.js + Pinia + ElementPlus 等。
- 支持文字、图片、形状、线条、二维码 、条形码等几种常用的元素类型。
- 每一种元素都拥有高度可编辑能力，缩略图显示，模板，支持导出 json，svg，img 等。
- 在线设计、编辑名片，LOGO，图片，海报等。

## 项目运行

```
npm install
npm run dev
npm run build
```

## 目录结构

```
├── assets               // 静态资源
│   ├── fonts            // 在线字体文件
│   └── styles           // 样式
├── components           // 与业务逻辑无关的通用组件
├── configs              // 配置文件
├── extension            // 扩展元素
├── hooks                // 供多个组件（模块）使用的 hooks 方法
├── mocks                // mocks 数据
├── plugins              // 自定义的 Vue 插件
├── types                // 类型定义文件
├── store                // Pinia store，参考：https://pinia.vuejs.org/
├── utils                // 通用的工具方法
└── views                // 业务组件目录
    ├── Canvas           // 编辑模块
    ├── Editor           // 页面模块
    └── Event            // 事件模块
```

## 页面编辑

1.  支持缩略图（右键操作）复制，粘贴，新增，删除，选择，拖动页面顺序

![](/assets/img/news/yft-design-0-1.png)

## 画布编辑

1.  支持自定义选择画布尺寸（名片，单页，海报），印刷出血及安全线，印刷拼版，尺寸单位（mm）与（px）自由切换，快捷键滚轮缩放画布
    ![](/assets/img/news/yft-design-0-2.png)

2.  支持渐变背景多种样式填充，支持线性渐变及经向渐变，可自定义修改角度，位置
    ![](/assets/img/news/yft-design-0-3.png)

3.  支持网格背景多种样式填充，支持修改参数生成及随机生成和自定义生成模式
    ![](/assets/img/news/yft-design-0-4.png)

4.  支持条纹背景多种样式填充，支持修改条纹颜色及随机条纹样式
    ![](/assets/img/news/yft-design-0-5.png)

## 文字编辑

1.  支持文字添加横向和纵向，编辑，左对齐，右对齐，居中，字体大小，font-family，字体颜色，背景颜色，粗体，倾斜，下划线，删除线，行距，字距，描边，底纹，图片填充
    ![](/assets/img/news/yft-design-0-6.png)

## 图片编辑

1.  支持上传，图片裁切，水平和垂直翻转，支持多种颜色的蒙版和自定义样式的滤镜
    ![](/assets/img/news/yft-design-0-7.png)

## 元素编辑

1.  支持上传 svg 元素及模板中多种格式的 svg 元素。元素可以自定义大小，颜色及背景填充
    ![](/assets/img/news/yft-design-0-8.png)

2.  线段支持双击端点拖拽，修改尺寸，虚线
    ![](/assets/img/news/yft-design-0-9.png)

3.  二维码支持矢量格式印刷，透明底图，自定义二维码内容，边距大小及容错率
    ![](/assets/img/news/yft-design-0-10.png)

4.  条行码支持矢量格式印刷，支持国际上多种码制，自定义修改码值，码宽及码高
    ![](/assets/img/news/yft-design-0-11.png)

## 图层编辑

1.  图层可显示元素类型，可拖拽图层元素修改元素层级，可删除，锁定，隐藏图层，文字可在图层中编辑
    ![](/assets/img/news/yft-design-0-12.png)

## 未来规划

1.  增加 psd，pdf，cdr 等不同格式导入在线编辑
2.  图片可以通过元素裁切出不同形状，元素可自定义拖拽设计
3.  更好的编辑体验，增加 3D 模型在线显示
