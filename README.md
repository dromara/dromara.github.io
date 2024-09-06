# Dromara 官方网站

![Website Deploy](https://github.com/dromara/dromara.github.io/workflows/Website%20Deploy/badge.svg)

此项目保存了用于构建 Dromara 官方网站的所有资源，网站托管在 <https://dromara.org/>.

此网站使用 [VuePress Theme Hope](https://theme-hope.vuejs.press/zh/) 主题的 V2 版本构建。V2 基于 [_VuePress2_](https://vuejs.press/zh/)， 带有 [_Vite4_](https://cn.vitejs.dev/) / [_Webpack5_](https://webpack.docschina.org/) 和 [_Vue3_](https://cn.vuejs.org/) 的强大功能。

## 新增文档

鉴于部分文章先在微信公众号发布，再同步到官网。其次，考虑到官网文档对 frontmatter 和本地图片源的特殊格式要求，提供了以下两种方法来更新官网文档：使用微信公众号文章转换插件和手动更新。

### 微信公众号文章转换插件

为了方便从微信公众号快速转换文章到官网格式，开发了一个专门的插件。此插件可将微信公众号文章转换为符合官网要求的 Markdown 格式。您可以通过访问 [GitHub 仓库](https://github.com/Cicici-Shi/wechat-doc-to-vuepress-md) 来安装并使用此扩展。

使用插件后，只需选择文章分类、输入文件名，点击生成所需的 frontmatter，并下载相关图片和文档。之后将下载的图片和文档资源放置到指定的文件夹中即完成更新。

具体使用指南见 [Readme 文件](https://github.com/Cicici-Shi/wechat-doc-to-vuepress-md/blob/main/README.md)。

### 手动更新文档

#### 1. **定位到源文件夹**

- 对于英文内容，请导航至相应的文件夹，例如 `src\news`。
- 对于中文内容，请导航至中文的相应文件夹，例如 `src\zh\news`。

#### 2. **复制已有文档**

- 从**相应的文件夹**中找到一篇已有的文档作为模板进行复制，鉴于文档格式有特殊要求。

#### 3. **修改 Frontmatter**

- 更新复制文档中的 Frontmatter 信息。需要修改的信息包括：
  - 标题
  - 作者
  - 标签：此项为可选，无特殊要求时删除亦可。
  - 日期
  - 封面
- 请注意，`head` 部分的内容应与文件夹内的其他文档一致。由于在 `head` 中，`meta` 的 `name` 属性会影响文档在哪个模块显示。例如：

  - 如果 `name` 设置为“新闻”，文档将出现在 [https://dromara.org/zh/news/](https://dromara.org/zh/news/)；如果 `name` 设置为“News”，则文档将出现在 [https://dromara.org/news/](https://dromara.org/news/)。
  - 如果 `name` 设置为“活动”，文档将出现在相应的“活动”模块中；如果 `name` 设置为“Activity”，则文档将出现在“Activity”模块中。
  - 如果 `name` 设置为“博客”，文档将出现在相应的“博客”模块中；如果 `name` 设置为“Blog”，则文档将出现在“Blog”模块中。

通过遵循以上步骤，你应该可以顺利地新增所需的文档。

#### 4. **Markdown 文件的标题格式**

- 在 Markdown 文件中，请从 "##" 开始作为标题，避免使用 "#"，因为这会影响侧边栏的识别。

## 安装

```console
pnpm install
```

## 本地开发

- 使用以下命令启动本地化网站。然后，您的网站可以在 http://localhost:8080/ 上访问。

```console
pnpm start
```

- 更改完成可使用以下命令检查格式。

```console
pnpm lint
```

- 更新文档可使用以下命令检查格式
```console
npm run docs:build
```

## 贡献

- 创建新分支
- 提交并推送内容更改 (例如 `/src/zh/activity` 中的 `.md` 文件，须遵守同类型文章的 frontmatter).
- 翻译 markdown 文件，提交并推送内容更改 (例如 `/src/activity` 中的 `.md` 文件).
- 向 `master` 分支提交 pull request.

## 许可

[Apache 2.0 License.](/LICENSE)
