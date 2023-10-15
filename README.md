# Dromara 官方网站

![Website Deploy](https://github.com/dromara/dromara.github.io/workflows/Website%20Deploy/badge.svg)

此项目保存了用于构建 Dromara 官方网站的所有资源，网站托管在 <https://dromara.org/>.

此网站使用 [VuePress Theme Hope](https://theme-hope.vuejs.press/zh/) 主题的 V2 版本构建。V2 基于 [_VuePress2_](https://vuejs.press/zh/)， 带有 [_Vite4_](https://cn.vitejs.dev/) / [_Webpack5_](https://webpack.docschina.org/) 和 [_Vue3_](https://cn.vuejs.org/) 的强大功能。

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

## 贡献

- 创建新分支
- 提交并推送内容更改 (例如 `/src/zh/activity` 中的 `.md` 文件，须遵守同类型文章的 frontmatter).
- 翻译 markdown 文件，提交并推送内容更改 (例如 `/src/activity` 中的 `.md` 文件).
- 向 `master` 分支提交 pull request

## 许可

[Apache 2.0 License.](/LICENSE)
