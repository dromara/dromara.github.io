import{_ as t}from"./hutool-framework-5mJU8dez.js";import{_ as r,c as o,a as i,o as a}from"./app-Cd8Sn9KY.js";const l={};function n(s,e){return a(),o("div",null,e[0]||(e[0]=[i('<blockquote><p>Hutool 是一个小而全的 Java 工具类库，提供优雅、高效和便捷的工具方法。</p></blockquote><h2 id="hutool-是什么" tabindex="-1"><a class="header-anchor" href="#hutool-是什么"><span>Hutool 是什么</span></a></h2><p><img src="'+t+'" alt="架构全景图"></p><p>本来这个版本应该是 5.7.23 的，可惜用户提了一些 issue，这些问题的解决必须修改原有代码结构：</p><ol><li>如 MongoDB 客户端封装，由于其驱动本身做了不兼容修改，包装的工具类不得不进行修改。</li><li>涉及到 Bean 拷贝的代码部分（BeanCopier），由于一个参数失效，以为只是简单的一个 bug，后来发现是整个设计有问题……崩溃程度可想而知，肝了两个晚上重构了这部分代码。</li><li>修改代码的同时才发现还有很多部分的设计有问题，顺便做了小重构。</li><li>为了解决每次大版本升级的可能带来的对老用户的影响，此次版本采用里程碑方式发布，版本为 M1（感觉给用户送了颗 CPU），也是解决 Hutool 每次“激进”升级的问题（毕竟年龄大了，要稳重）</li><li>希望购买代替捐赠，如果你希望支持下 Hutool，可以去 Hutool 主页点-&gt;击进入周边商店购买 Hutool 周边来支持 Hutool 哦，这比捐赠实惠的多（毕竟捐赠者我不知道如何道谢，很有道德负担……）</li></ol><p>鸣谢一下此次版本一起讨论和一起解决大量 issue 的 Hutool 几位成员：<br> @阿超 @Cherryrum @Husky</p><hr><h2 id="_5-8-0-m1" tabindex="-1"><a class="header-anchor" href="#_5-8-0-m1"><span>5.8.0.M1</span></a></h2><h3 id="❌-不兼容特性" tabindex="-1"><a class="header-anchor" href="#❌-不兼容特性"><span>❌ 不兼容特性</span></a></h3><p>• 【db 】 【不向下兼容 】增加 MongoDB4.x 支持返回 MongoClient 变更（pr#568@Gitee）<br> • 【json 】 【可能兼容问题】修改 JSONObject 结构，继承自 MapWrapper<br> • 【core 】 【可能兼容问题】BeanCopier 重构，新建 XXXCopier，删除 XXXValueProvider<br> • 【core 】 【可能兼容问题】URLEncoder 废弃，URLEncoderUtil 使用 RFC3986<br> • 【core 】 【可能兼容问题】Base32 分离编码和解码，以便减少数据加载，支持 Hex 模式<br> • 【core 】 【可能兼容问题】Base58 分离编码和解码<br> • 【core 】 【可能兼容问题】Base62 分离编码和解码，增加 inverted 模式支持<br> • 【core 】 【兼容问题 】PunyCode 参数由 String 改为 Charsequence<br> • 【cron 】 【可能兼容问题】SimpleValueParser 改名为 AbsValueParser，改为 abstract<br> • 【poi 】 【可能兼容问题】ExcelUtil.getBigWriter 返回值改为 BigExcelWriter<br> • 【core 】 【可能兼容问题】Opt.ofEmptyAble 参数由 List 改为 Collection 子类（pr#580@Gitee）<br> • 【json 】 【可能兼容问题】JSON 转 Bean 时，使用 JSON 本身的相关设置，而非默认（issue#2212@Github）<br> • 【json 】 【可能兼容问题】JSONConfig 中 isOrder 废弃，默认全部有序</p><h3 id="🐣-新特性" tabindex="-1"><a class="header-anchor" href="#🐣-新特性"><span>🐣 新特性</span></a></h3><p>• 【http 】 HttpRequest.form 采用 TableMap 方式（issue#I4W427@Gitee）<br> • 【core 】 AnnotationUtil 增加 getAnnotationAlias 方法（pr#554@Gitee）<br> • 【core 】 FileUtil.extName 增加对 tar.gz 特殊处理（issue#I4W5FS@Gitee）<br> • 【crypto 】 增加 XXTEA 实现（issue#I4WH2X@Gitee）<br> • 【core 】 增加 Table 实现（issue#2179@Github）<br> • 【core 】 增加 UniqueKeySet（issue#I4WUWR@Gitee）<br> • 【core 】 阿拉伯数字转换成中文对发票票面金额转换的扩展（pr#570@Gitee）<br> • 【core 】 ArrayUtil 增加 replace 方法（pr#570@Gitee）<br> • 【core 】 CsvReadConfig 增加自定义标题行行号（issue#2180@Github）<br> • 【core 】 FileAppender 优化初始 List 大小（pr#2197@Github）<br> • 【core 】 Base32 增加 pad 支持（pr#2195@Github）<br> • 【core 】 Dict 增加 setFields 方法（pr#578@Gitee）<br> • 【db 】 新加 db.meta 的索引相关接口（pr#563@Gitee）<br> • 【db 】 Oracle 中 Column#typeName 后的长度去掉（pr#563@Gitee）<br> • 【poi 】 优化 ExcelReader，采用只读模式（pr#2204@Gitee）<br> • 【poi 】 优化 ExcelBase，将 alias 放入<br> • 【poi 】 优化 ExcelBase，将 alias 放入<br> • 【core 】 改进 StrUtil#startWith、endWith 性能<br> • 【cron 】 增加 CronPatternParser、MatcherTable<br> • 【http 】 GlobalHeaders 增加系统属性 allowUnsafeServerCertChange、allowUnsafeRenegotiation<br> • 【http 】 UserAgentUtil 解析，增加 MiUI/XiaoMi 浏览器判断逻辑（pr#581@Gitee）<br> • 【core 】 FileAppender 添加锁构造（pr#2211@Github）<br> • 【poi 】 ExcelReader 增加构造（pr#2213@Github）<br> • 【core 】 MapUtil 提供 change 函数，EnumUtil 提供 getBy 函数，通过 lambda 进行枚举字段映射（pr#583@Gitee）<br> • 【core 】 CompareUtil 增加 comparingIndexed（pr#585@Gitee）<br> • 【db 】 DruidDataSource 构建时支持自定义参数（issue#I4ZKCW@Gitee）<br> • 【poi 】 ExcelWriter 增加 addImg 重载（issue#2218@Github）<br> • 【bloomFilter】 增加 FuncFilter<br> • 【http 】 增加 GlobalInterceptor（issue#2217）</p><h3 id="🐞bug-修复" tabindex="-1"><a class="header-anchor" href="#🐞bug-修复"><span>🐞Bug 修复</span></a></h3><p>• 【core 】 修复 ObjectUtil.hasNull 传入 null 返回 true 的问题（pr#555@Gitee）<br> • 【core 】 修复 NumberConverter 对数字转换的问题（issue#I4WPF4@Gitee）<br> • 【core 】 修复 ReflectUtil.getMethods 获取接口方法问题（issue#I4WUWR@Gitee）<br> • 【core 】 修复 NamingCase 中大写转换问题（pr#572@Gitee）<br> • 【http 】 修复 GET 重定向时，携带参数问题（issue#2189@Github）<br> • 【core 】 修复 FileUtil、FileCopier 相对路径获取父路径错误问题（pr#2188@Github）<br> • 【core 】 修复 CopyOptions 中 fieldNameEditor 无效问题（issue#2202@Github）<br> • 【json 】 修复 JSON 对 Map.Entry 的解析问题<br> • 【core 】 修复 MapConverter 中 map 与 map 转换兼容问题<br> • 【poi 】 解决 sax 读取时，POI-5.2.x 兼容性问题<br> • 【core 】 修复判断两段时间区间交集问题（pr#2210@Github）<br> • 【http 】 修复标签误删问题（issue#I4Z7BV@Gitee）<br> • 【core 】 修复 Win 下文件名带*问题（pr#584@Gitee）<br> • 【core 】 FileUtil.getMimeType 增加 rar、7z 支持（issue#I4ZBN0@Gitee）<br> • 【json 】 JSON 修复 transient 设置无效问题（issue#2212@Github）<br> • 【core 】 修复 IterUtil.getElementType 获取结果为 null 的问题（issue#2222@Github）<br> • 【core 】 修复农历转公历在闰月时错误（issue#I4ZSGJ@Gitee）</p><h2 id="社区共建" tabindex="-1"><a class="header-anchor" href="#社区共建"><span>社区共建</span></a></h2><p>我们秉承<code>和谐快乐</code>，<code>代码至上</code> 的原则，如果你有想法，愿意和我们一起成长，一起贡献，快来加入我们吧！</p><ul><li>github：https://github.com/dromara/hutool</li><li>gitee：https://gitee.com/dromara/hutool</li></ul>',17)]))}const u=r(l,[["render",n],["__file","hutool-5.8.0.html.vue"]]),h=JSON.parse('{"path":"/zh/news/hutool-5.8.0.html","title":"Hutool-5.8.0.M1 发布，尝试里程碑发布","lang":"zh-CN","frontmatter":{"title":"Hutool-5.8.0.M1 发布，尝试里程碑发布","author":"hutool","tag":["hutool"],"date":"2022-03-30T00:00:00.000Z","cover":"/assets/img/architecture/hutool-framework.png","head":[["meta",{"name":"新闻"}],["link",{"rel":"alternate","hreflang":"en-us","href":"https://vuepress-theme-hope-docs-demo.netlify.app/news/hutool-5.8.0.html"}],["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/zh/news/hutool-5.8.0.html"}],["meta",{"property":"og:title","content":"Hutool-5.8.0.M1 发布，尝试里程碑发布"}],["meta",{"property":"og:description","content":"Hutool 是一个小而全的 Java 工具类库，提供优雅、高效和便捷的工具方法。 Hutool 是什么 架构全景图 本来这个版本应该是 5.7.23 的，可惜用户提了一些 issue，这些问题的解决必须修改原有代码结构： 如 MongoDB 客户端封装，由于其驱动本身做了不兼容修改，包装的工具类不得不进行修改。 涉及到 Bean 拷贝的代码部分（Be..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/architecture/hutool-framework.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:locale:alternate","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2023-09-04T07:29:42.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/architecture/hutool-framework.png"}],["meta",{"name":"twitter:image:alt","content":"Hutool-5.8.0.M1 发布，尝试里程碑发布"}],["meta",{"property":"article:author","content":"hutool"}],["meta",{"property":"article:tag","content":"hutool"}],["meta",{"property":"article:published_time","content":"2022-03-30T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-09-04T07:29:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Hutool-5.8.0.M1 发布，尝试里程碑发布\\",\\"image\\":[\\"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/architecture/hutool-framework.png\\"],\\"datePublished\\":\\"2022-03-30T00:00:00.000Z\\",\\"dateModified\\":\\"2023-09-04T07:29:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"hutool\\"}]}"]],"description":"Hutool 是一个小而全的 Java 工具类库，提供优雅、高效和便捷的工具方法。 Hutool 是什么 架构全景图 本来这个版本应该是 5.7.23 的，可惜用户提了一些 issue，这些问题的解决必须修改原有代码结构： 如 MongoDB 客户端封装，由于其驱动本身做了不兼容修改，包装的工具类不得不进行修改。 涉及到 Bean 拷贝的代码部分（Be..."},"headers":[{"level":2,"title":"Hutool 是什么","slug":"hutool-是什么","link":"#hutool-是什么","children":[]},{"level":2,"title":"5.8.0.M1","slug":"_5-8-0-m1","link":"#_5-8-0-m1","children":[{"level":3,"title":"❌ 不兼容特性","slug":"❌-不兼容特性","link":"#❌-不兼容特性","children":[]},{"level":3,"title":"🐣 新特性","slug":"🐣-新特性","link":"#🐣-新特性","children":[]},{"level":3,"title":"🐞Bug 修复","slug":"🐞bug-修复","link":"#🐞bug-修复","children":[]}]},{"level":2,"title":"社区共建","slug":"社区共建","link":"#社区共建","children":[]}],"git":{"createdTime":1693309054000,"updatedTime":1693812582000,"contributors":[{"name":"Cicici-Shi","username":"Cicici-Shi","email":"94002846+Cicici-Shi@users.noreply.github.com","commits":1,"url":"https://github.com/Cicici-Shi"},{"name":"Cici","username":"Cici","email":"1901177100@qq.com","commits":1,"url":"https://github.com/Cici"}]},"readingTime":{"minutes":4.16,"words":1248},"filePathRelative":"zh/news/hutool-5.8.0.md","localizedDate":"2022年3月30日","autoDesc":true,"excerpt":"<blockquote>\\n<p>Hutool 是一个小而全的 Java 工具类库，提供优雅、高效和便捷的工具方法。</p>\\n</blockquote>\\n<h2>Hutool 是什么</h2>\\n<p><img src=\\"/assets/img/architecture/hutool-framework.png\\" alt=\\"架构全景图\\"></p>\\n<p>本来这个版本应该是 5.7.23 的，可惜用户提了一些 issue，这些问题的解决必须修改原有代码结构：</p>\\n<ol>\\n<li>如 MongoDB 客户端封装，由于其驱动本身做了不兼容修改，包装的工具类不得不进行修改。</li>\\n<li>涉及到 Bean 拷贝的代码部分（BeanCopier），由于一个参数失效，以为只是简单的一个 bug，后来发现是整个设计有问题……崩溃程度可想而知，肝了两个晚上重构了这部分代码。</li>\\n<li>修改代码的同时才发现还有很多部分的设计有问题，顺便做了小重构。</li>\\n<li>为了解决每次大版本升级的可能带来的对老用户的影响，此次版本采用里程碑方式发布，版本为 M1（感觉给用户送了颗 CPU），也是解决 Hutool 每次“激进”升级的问题（毕竟年龄大了，要稳重）</li>\\n<li>希望购买代替捐赠，如果你希望支持下 Hutool，可以去 Hutool 主页点-&gt;击进入周边商店购买 Hutool 周边来支持 Hutool 哦，这比捐赠实惠的多（毕竟捐赠者我不知道如何道谢，很有道德负担……）</li>\\n</ol>"}');export{u as comp,h as data};