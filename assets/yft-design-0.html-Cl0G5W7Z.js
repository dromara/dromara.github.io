import{_ as e,c as n,a as i,o as a}from"./app-Cd8Sn9KY.js";const t="/assets/img/news/yft-design-0-1.png",l="/assets/img/news/yft-design-0-2.png",p="/assets/img/news/yft-design-0-3.png",r="/assets/img/news/yft-design-0-4.png",d="/assets/img/news/yft-design-0-5.png",o="/assets/img/news/yft-design-0-6.png",c="/assets/img/news/yft-design-0-7.png",m="/assets/img/news/yft-design-0-8.png",g="/assets/img/news/yft-design-0-9.png",h="/assets/img/news/yft-design-0-10.png",v="/assets/img/news/yft-design-0-11.png",u="/assets/img/news/yft-design-0-12.png",f={};function y(b,s){return a(),n("div",null,s[0]||(s[0]=[i(`<h2 id="yft-design-基于-canvas-的开源版-创客贴" tabindex="-1"><a class="header-anchor" href="#yft-design-基于-canvas-的开源版-创客贴"><span>yft-design 基于 Canvas 的开源版&quot;创客贴&quot;</span></a></h2><h2 id="项目介绍" tabindex="-1"><a class="header-anchor" href="#项目介绍"><span>项目介绍</span></a></h2><ul><li>dromara 开源组织成员，dromara/yft-design 作者。</li><li>使用 Vue3 + TypeScript + Fabric.js + Pinia + ElementPlus 等。</li><li>支持文字、图片、形状、线条、二维码 、条形码等几种常用的元素类型。</li><li>每一种元素都拥有高度可编辑能力，缩略图显示，模板，支持导出 json，svg，img 等。</li><li>在线设计、编辑名片，LOGO，图片，海报等。</li></ul><h2 id="项目运行" tabindex="-1"><a class="header-anchor" href="#项目运行"><span>项目运行</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>npm install</span></span>
<span class="line"><span>npm run dev</span></span>
<span class="line"><span>npm run build</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="目录结构" tabindex="-1"><a class="header-anchor" href="#目录结构"><span>目录结构</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>├── assets               // 静态资源</span></span>
<span class="line"><span>│   ├── fonts            // 在线字体文件</span></span>
<span class="line"><span>│   └── styles           // 样式</span></span>
<span class="line"><span>├── components           // 与业务逻辑无关的通用组件</span></span>
<span class="line"><span>├── configs              // 配置文件</span></span>
<span class="line"><span>├── extension            // 扩展元素</span></span>
<span class="line"><span>├── hooks                // 供多个组件（模块）使用的 hooks 方法</span></span>
<span class="line"><span>├── mocks                // mocks 数据</span></span>
<span class="line"><span>├── plugins              // 自定义的 Vue 插件</span></span>
<span class="line"><span>├── types                // 类型定义文件</span></span>
<span class="line"><span>├── store                // Pinia store，参考：https://pinia.vuejs.org/</span></span>
<span class="line"><span>├── utils                // 通用的工具方法</span></span>
<span class="line"><span>└── views                // 业务组件目录</span></span>
<span class="line"><span>    ├── Canvas           // 编辑模块</span></span>
<span class="line"><span>    ├── Editor           // 页面模块</span></span>
<span class="line"><span>    └── Event            // 事件模块</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="页面编辑" tabindex="-1"><a class="header-anchor" href="#页面编辑"><span>页面编辑</span></a></h2><ol><li>支持缩略图（右键操作）复制，粘贴，新增，删除，选择，拖动页面顺序</li></ol><p><img src="`+t+'" alt=""></p><h2 id="画布编辑" tabindex="-1"><a class="header-anchor" href="#画布编辑"><span>画布编辑</span></a></h2><ol><li><p>支持自定义选择画布尺寸（名片，单页，海报），印刷出血及安全线，印刷拼版，尺寸单位（mm）与（px）自由切换，快捷键滚轮缩放画布 <img src="'+l+'" alt=""></p></li><li><p>支持渐变背景多种样式填充，支持线性渐变及经向渐变，可自定义修改角度，位置 <img src="'+p+'" alt=""></p></li><li><p>支持网格背景多种样式填充，支持修改参数生成及随机生成和自定义生成模式 <img src="'+r+'" alt=""></p></li><li><p>支持条纹背景多种样式填充，支持修改条纹颜色及随机条纹样式 <img src="'+d+'" alt=""></p></li></ol><h2 id="文字编辑" tabindex="-1"><a class="header-anchor" href="#文字编辑"><span>文字编辑</span></a></h2><ol><li>支持文字添加横向和纵向，编辑，左对齐，右对齐，居中，字体大小，font-family，字体颜色，背景颜色，粗体，倾斜，下划线，删除线，行距，字距，描边，底纹，图片填充 <img src="'+o+'" alt=""></li></ol><h2 id="图片编辑" tabindex="-1"><a class="header-anchor" href="#图片编辑"><span>图片编辑</span></a></h2><ol><li>支持上传，图片裁切，水平和垂直翻转，支持多种颜色的蒙版和自定义样式的滤镜 <img src="'+c+'" alt=""></li></ol><h2 id="元素编辑" tabindex="-1"><a class="header-anchor" href="#元素编辑"><span>元素编辑</span></a></h2><ol><li><p>支持上传 svg 元素及模板中多种格式的 svg 元素。元素可以自定义大小，颜色及背景填充 <img src="'+m+'" alt=""></p></li><li><p>线段支持双击端点拖拽，修改尺寸，虚线 <img src="'+g+'" alt=""></p></li><li><p>二维码支持矢量格式印刷，透明底图，自定义二维码内容，边距大小及容错率 <img src="'+h+'" alt=""></p></li><li><p>条行码支持矢量格式印刷，支持国际上多种码制，自定义修改码值，码宽及码高 <img src="'+v+'" alt=""></p></li></ol><h2 id="图层编辑" tabindex="-1"><a class="header-anchor" href="#图层编辑"><span>图层编辑</span></a></h2><ol><li>图层可显示元素类型，可拖拽图层元素修改元素层级，可删除，锁定，隐藏图层，文字可在图层中编辑 <img src="'+u+'" alt=""></li></ol><h2 id="未来规划" tabindex="-1"><a class="header-anchor" href="#未来规划"><span>未来规划</span></a></h2><ol><li>增加 psd，pdf，cdr 等不同格式导入在线编辑</li><li>图片可以通过元素裁切出不同形状，元素可自定义拖拽设计</li><li>更好的编辑体验，增加 3D 模型在线显示</li></ol>',22)]))}const k=e(f,[["render",y],["__file","yft-design-0.html.vue"]]),w=JSON.parse('{"path":"/zh/news/yft-design-0.html","title":"新晋开源项目 yft-design 加入 Dromara 社区，基于Canvas的开源版\\"创客贴\\"","lang":"zh-CN","frontmatter":{"title":"新晋开源项目 yft-design 加入 Dromara 社区，基于Canvas的开源版\\"创客贴\\"","author":"yft","date":"2023-09-08T00:00:00.000Z","cover":"/assets/img/news/yft-design-0-1.png","head":[["meta",{"name":"新闻"}],["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/zh/news/yft-design-0.html"}],["meta",{"property":"og:title","content":"新晋开源项目 yft-design 加入 Dromara 社区，基于Canvas的开源版\\"创客贴\\""}],["meta",{"property":"og:description","content":"yft-design 基于 Canvas 的开源版\\"创客贴\\" 项目介绍 dromara 开源组织成员，dromara/yft-design 作者。 使用 Vue3 + TypeScript + Fabric.js + Pinia + ElementPlus 等。 支持文字、图片、形状、线条、二维码 、条形码等几种常用的元素类型。 每一种元素都拥有高度可..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/news/yft-design-0-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-23T05:33:00.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/news/yft-design-0-1.png"}],["meta",{"name":"twitter:image:alt","content":"新晋开源项目 yft-design 加入 Dromara 社区，基于Canvas的开源版\\"创客贴\\""}],["meta",{"property":"article:author","content":"yft"}],["meta",{"property":"article:published_time","content":"2023-09-08T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-10-23T05:33:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"新晋开源项目 yft-design 加入 Dromara 社区，基于Canvas的开源版\\\\\\"创客贴\\\\\\"\\",\\"image\\":[\\"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/news/yft-design-0-1.png\\",\\"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/news/yft-design-0-2.png\\",\\"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/news/yft-design-0-3.png\\",\\"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/news/yft-design-0-4.png\\",\\"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/news/yft-design-0-5.png\\",\\"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/news/yft-design-0-6.png\\",\\"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/news/yft-design-0-7.png\\",\\"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/news/yft-design-0-8.png\\",\\"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/news/yft-design-0-9.png\\",\\"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/news/yft-design-0-10.png\\",\\"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/news/yft-design-0-11.png\\",\\"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/news/yft-design-0-12.png\\"],\\"datePublished\\":\\"2023-09-08T00:00:00.000Z\\",\\"dateModified\\":\\"2023-10-23T05:33:00.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yft\\"}]}"]],"description":"yft-design 基于 Canvas 的开源版\\"创客贴\\" 项目介绍 dromara 开源组织成员，dromara/yft-design 作者。 使用 Vue3 + TypeScript + Fabric.js + Pinia + ElementPlus 等。 支持文字、图片、形状、线条、二维码 、条形码等几种常用的元素类型。 每一种元素都拥有高度可..."},"headers":[{"level":2,"title":"yft-design 基于 Canvas 的开源版\\"创客贴\\"","slug":"yft-design-基于-canvas-的开源版-创客贴","link":"#yft-design-基于-canvas-的开源版-创客贴","children":[]},{"level":2,"title":"项目介绍","slug":"项目介绍","link":"#项目介绍","children":[]},{"level":2,"title":"项目运行","slug":"项目运行","link":"#项目运行","children":[]},{"level":2,"title":"目录结构","slug":"目录结构","link":"#目录结构","children":[]},{"level":2,"title":"页面编辑","slug":"页面编辑","link":"#页面编辑","children":[]},{"level":2,"title":"画布编辑","slug":"画布编辑","link":"#画布编辑","children":[]},{"level":2,"title":"文字编辑","slug":"文字编辑","link":"#文字编辑","children":[]},{"level":2,"title":"图片编辑","slug":"图片编辑","link":"#图片编辑","children":[]},{"level":2,"title":"元素编辑","slug":"元素编辑","link":"#元素编辑","children":[]},{"level":2,"title":"图层编辑","slug":"图层编辑","link":"#图层编辑","children":[]},{"level":2,"title":"未来规划","slug":"未来规划","link":"#未来规划","children":[]}],"git":{"createdTime":1698039180000,"updatedTime":1698039180000,"contributors":[{"name":"Cici","username":"Cici","email":"1901177100@qq.com","commits":1,"url":"https://github.com/Cici"}]},"readingTime":{"minutes":2.81,"words":844},"filePathRelative":"zh/news/yft-design-0.md","localizedDate":"2023年9月8日","autoDesc":true,"excerpt":"<h2>yft-design 基于 Canvas 的开源版\\"创客贴\\"</h2>\\n<h2>项目介绍</h2>\\n<ul>\\n<li>dromara 开源组织成员，dromara/yft-design 作者。</li>\\n<li>使用 Vue3 + TypeScript + Fabric.js + Pinia + ElementPlus 等。</li>\\n<li>支持文字、图片、形状、线条、二维码 、条形码等几种常用的元素类型。</li>\\n<li>每一种元素都拥有高度可编辑能力，缩略图显示，模板，支持导出 json，svg，img 等。</li>\\n<li>在线设计、编辑名片，LOGO，图片，海报等。</li>\\n</ul>"}');export{k as comp,w as data};