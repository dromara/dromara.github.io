import{_ as n}from"./Neutrino-Proxy-1.9.0-1-Dnz3C3Dj.js";import{_ as i}from"./Neutrino-Proxy-1.9.0-2-Dq0FwV4x.js";import{_ as s,c as a,a as l,o as r}from"./app-Cd8Sn9KY.js";const t={};function p(o,e){return r(),a("div",null,e[0]||(e[0]=[l('<h2 id="内网穿透神器-neutrinoproxy-1-9-0-版本发布" tabindex="-1"><a class="header-anchor" href="#内网穿透神器-neutrinoproxy-1-9-0-版本发布"><span>内网穿透神器 NeutrinoProxy 1.9.0 版本发布</span></a></h2><h2 id="更新内容" tabindex="-1"><a class="header-anchor" href="#更新内容"><span>更新内容</span></a></h2><blockquote><p>与 1.8.0 版本对比，更新内容如下：</p></blockquote><ul><li><p>核心功能</p></li><li><p>域名映射支持 HTTPS</p></li><li><p>支持 UDP 协议代理</p></li><li><p>客户端断开连接时，记录日志空指针异常问题修复</p></li><li><p>基础优化</p></li><li><p>客户端重连逻辑优化，支持配置文件指定重连间隔，是否开启无限重连</p></li><li><p>增加对 mariadb 的支持</p></li><li><p>服务端/客户端，支持配置文件、启动参数指定日志级别</p></li><li><p>后台端口池管理支持批量删除</p></li><li><p>后台下拉选择 license、用户支持模糊搜索</p></li><li><p>端口映射下拉选择端口支持搜索、分野</p></li><li><p>客户端/服务端配置增加心跳日志开关，有需要时开启，方便排查问题</p></li><li><p>端口映射 HTTP(S)新增打开网页快捷操作，优先使用绑定域名打开</p></li></ul><h2 id="升级须知" tabindex="-1"><a class="header-anchor" href="#升级须知"><span>升级须知</span></a></h2><blockquote><p>从 1.9.0 之前的版本升级需要注意：</p></blockquote><ul><li>在项目<code>neutrino-proxy-server/src/main/resources/sql</code>目录下找到 mysql/sqlite 的增量 sql 文件<code>UPDATE-20230922.SQL</code>,执行更新自己的中微子代理数据库</li><li>参照官网服务端配置调整现有的服务端配置</li><li>参照官网客户端配置吊证现有的客户端配置</li><li>从仓库发行版下载最新版本的客户端(neutrino-proxy-client.jar)、服务端(neutrino-proxy-server.jar、 neutrino-proxy-admin.zip)部署文件。若为服务端是 docker 镜像部署，则更新镜像重启即可</li></ul><h2 id="项目简介" tabindex="-1"><a class="header-anchor" href="#项目简介"><span>项目简介</span></a></h2><ul><li>中微子代理(neutrino-proxy) 是一款基于 netty 的内网穿透神器。该项目采用最为宽松的 MIT 协议，因此您可以对它进行复制、修改、传播并用于任何个人或商业行为。</li><li>Gitee 地址：https://gitee.com/dromara/neutrino-proxy</li><li>官网地址：http://neutrino-proxy.dromara.org</li><li>服务端管理后台截图：</li></ul><p><img src="'+n+`" alt=""></p><h2 id="主要特点" tabindex="-1"><a class="header-anchor" href="#主要特点"><span>主要特点：</span></a></h2><ul><li>1、流量监控：首页图表、报表管理多维度流量监控。全方位掌握实时、历史代理数据。</li><li>2、用户/License：支持多用户、多客户端使用。后台禁用实时生效。</li><li>3、端口池：对外端口统一管理，支持用户、License 独占端口。</li><li>4、端口映射：新增、编辑、删除、禁用实时生效。</li><li>5、Docker：服务端支持 Docker 一键部署。</li><li>6、SSL 证书：支持 SSL，保护您的信息安全。</li><li>7、域名映射：支持绑定子域名，方便本地调试三方回调</li><li>8、多协议：支持代理 TCP、HTTP(S)、UDP 多种协议</li><li>9、采用最为宽松的 MIT 协议，免去你的后顾之忧</li></ul><h2 id="快速使用" tabindex="-1"><a class="header-anchor" href="#快速使用"><span>快速使用</span></a></h2><blockquote><p>更多使用姿势、细节请通过官网或结尾微信二维码加我备注&quot;中微子代理&quot;入群交流。</p></blockquote><h3 id="_1、-部署服务端" tabindex="-1"><a class="header-anchor" href="#_1、-部署服务端"><span>1、 部署服务端</span></a></h3><h4 id="_1-1、-docker-一键部署" tabindex="-1"><a class="header-anchor" href="#_1-1、-docker-一键部署"><span>1.1、 Docker 一键部署</span></a></h4><blockquote><p>当前最新版本为 1.9.0，下面的脚本中，可以使用：<code>registry.cn-hangzhou.aliyuncs.com/asgc/neutrino-proxy:1.9.0</code> 指定版本安装，推荐使用<code>latest</code>直接安装最新版。</p></blockquote><h5 id="使用默认-sqlite-数据库" tabindex="-1"><a class="header-anchor" href="#使用默认-sqlite-数据库"><span>使用默认 sqlite 数据库</span></a></h5><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>docker run -it -p 9000-9200:9000-9200/tcp -p 8888:8888 \\</span></span>
<span class="line"><span>-d --restart=always --name neutrino-proxy \\</span></span>
<span class="line"><span>registry.cn-hangzhou.aliyuncs.com/asgc/neutrino-proxy:latest</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="指定自己的-mysql-数据库" tabindex="-1"><a class="header-anchor" href="#指定自己的-mysql-数据库"><span>指定自己的 mysql 数据库</span></a></h5><ul><li>在服务器上创建目录：/root/neutrino-proxy/config</li><li>在该目录下创建<code>app.yml</code>文本文件，并配置如下内容：</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>neutrino:</span></span>
<span class="line"><span>  data:</span></span>
<span class="line"><span>    db:</span></span>
<span class="line"><span>      type: mysql</span></span>
<span class="line"><span>      # 自己的数据库实例，创建一个空的名为&#39;neutrino-proxy&#39;的数据库即可，首次启动服务端会自动初始化</span></span>
<span class="line"><span>      url: jdbc:mysql://xxxx:3306/neutrino-proxy?useUnicode=true&amp;characterEncoding=UTF-8&amp;allowMultiQueries=true&amp;useAffectedRows=true&amp;useSSL=false</span></span>
<span class="line"><span>      driver-class: com.mysql.jdbc.Driver</span></span>
<span class="line"><span>      # 数据库帐号</span></span>
<span class="line"><span>      username: xxx</span></span>
<span class="line"><span>      # 数据库密码</span></span>
<span class="line"><span>      password: xxx</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>然后执行如下命令：</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>docker run -it -p 9000-9200:9000-9200/tcp -p 8888:8888 \\</span></span>
<span class="line"><span>-v /root/neutrino-proxy/config:/root/neutrino-proxy/config \\</span></span>
<span class="line"><span>-d --restart=always --name neutrino \\</span></span>
<span class="line"><span>registry.cn-hangzhou.aliyuncs.com/asgc/neutrino-proxy:latest</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-2、使用-jar-包自行部署" tabindex="-1"><a class="header-anchor" href="#_1-2、使用-jar-包自行部署"><span>1.2、使用 jar 包自行部署</span></a></h4><ul><li>首先确保服务器上已安装 java8 运行环境</li><li>打开发行版页面，下载最新的 release 包：<code>neutrino-proxy-server.jar</code>、<code>neutrino-proxy-admin.zip</code></li><li>在服务器上新建部署目录：<code>/work/projects/neutrino-proxy-server</code></li><li>将 <code>neutrino-proxy-server.jar</code>、<code>neutrino-proxy-admin.zip</code>上传至服务器部署目录。</li><li>解压<code>neutrino-proxy-admin.zip</code>文件</li><li>执行命令<code>java -jar neutrino-proxy-server.jar</code>启动服务端完成部署，默认使用 sqlite 数据库。</li><li>若需要指定自己的 mysql 数据库，同样的需要在当前目录下新建<code>app.yml</code>文件，文件内容同上。执行命令<code>java -jar neutrino-proxy-server.jar config=app.yml</code>启动服务端完成部署</li><li>可参照 https://gitee.com/dromara/neutrino-proxy/blob/master/bin/server_start.sh 使用 shell 脚本启动服务端。</li></ul><h3 id="_2、管理后台配置" tabindex="-1"><a class="header-anchor" href="#_2、管理后台配置"><span>2、管理后台配置</span></a></h3><ul><li>服务端部署成功后，访问<code>http://{服务端IP}:8888</code>打开后台管理页面。</li><li>使用默认的管理员帐号登录：admin/123456</li><li>打开<code>代理配置&gt;License管理</code>页面，可以看到系统已经自动为管理员初始化了一条 License 记录，复制该<code>LicenseKey</code>备用，后续客户端配置需要。</li><li>打开<code>代理配置&gt;端口映射</code>页面，可以看到系统已经自动为初始化了几条端口映射。可根据需要自行添加、修改。这里我们以<code>9101 -&gt; 127.0.0.1:8080</code>映射为例</li></ul><h3 id="_3、启动客户端" tabindex="-1"><a class="header-anchor" href="#_3、启动客户端"><span>3、启动客户端</span></a></h3><ul><li>首先确保本地已安装 java8 运行环境</li><li>打开发行版页面，下载最新的 release 包：<code>neutrino-proxy-client.jar</code></li><li>在本地<code>neutrino-proxy-client.jar</code>同级别目录下新建<code>app.yml</code>文件，并配置如下内容：</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>neutrino:</span></span>
<span class="line"><span>  proxy:</span></span>
<span class="line"><span>    tunnel:</span></span>
<span class="line"><span>      # ssl证书密钥（使用jjar包内自带的证书，则此处无需修改）</span></span>
<span class="line"><span>      key-store-password: 123456</span></span>
<span class="line"><span>      # ssl证书管理密钥（使用jjar包内自带的证书，则此处无需修改。自定义证书，则此处配置对应的路径）</span></span>
<span class="line"><span>      jks-path: classpath:/test.jks</span></span>
<span class="line"><span>      # 代理服务端IP</span></span>
<span class="line"><span>      server-ip: localhost</span></span>
<span class="line"><span>      # 代理服务端IP, 若是非ssl端口，则ssl-enable需要配置为false</span></span>
<span class="line"><span>      server-port: 9002</span></span>
<span class="line"><span>      # 是否启用ssl</span></span>
<span class="line"><span>      ssl-enable: true</span></span>
<span class="line"><span>      # licenseKey，客户端凭证。此处需要配置刚刚从管理后台复制的LicenseKey</span></span>
<span class="line"><span>      license-key: xxxx</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>执行命令<code>java -jar neutrino-proxy-client.jar</code>启动客户端</li><li>查看服务端 License 管理，刷新页面，对应的 License 在线状态为<code>在线</code>，则表明客户端已正常连接。</li></ul><h3 id="_4、代理验证" tabindex="-1"><a class="header-anchor" href="#_4、代理验证"><span>4、代理验证</span></a></h3><ul><li>本地启动被代理服务，如：redis、本地 web 项目、本地 mysql 等等</li><li>先确保本地能正常访问被代理服务，如果本地都不能访问，不用想代理更不可能！！！</li><li>通过服务端 IP+9101（上面 License 配置的端口映射重的服务端端口）访问本地被代理服务</li></ul><h2 id="联系我们" tabindex="-1"><a class="header-anchor" href="#联系我们"><span>联系我们</span></a></h2><p>笔者时间、能力有限，且开源项目非一朝一夕之事，存在众多问题亦在所难免。使用、学习过程中有任何问题欢迎大家与我联系。</p><p>对项目有什么想法或者建议，可以加我微信拉交流群，或者创建 issues，一起完善项目</p><ul><li><p>微信号：yuyunshize</p></li><li><p>Email: aoshiguchen@dromara.org</p></li><li><p>中微子代理官网：http://neutrino-proxy.dromara.org</p></li><li><p>中微子代理仓库：https://gitee.com/dromara/neutrino-proxy</p><p>微信二维码：</p></li></ul><img src="`+i+'" height="340">',39)]))}const h=s(t,[["render",p],["__file","Neutrino-Proxy-1.9.0.html.vue"]]),m=JSON.parse('{"path":"/zh/news/Neutrino-Proxy-1.9.0.html","title":"内网穿透神器NeutrinoProxy 1.9.0版本发布","lang":"zh-CN","frontmatter":{"title":"内网穿透神器NeutrinoProxy 1.9.0版本发布","author":"NeutrinoProxy","date":"2023-09-25T00:00:00.000Z","cover":"/assets/img/news/Neutrino-Proxy-1.9.0-1.png","head":[["meta",{"name":"新闻"}],["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/zh/news/Neutrino-Proxy-1.9.0.html"}],["meta",{"property":"og:title","content":"内网穿透神器NeutrinoProxy 1.9.0版本发布"}],["meta",{"property":"og:description","content":"内网穿透神器 NeutrinoProxy 1.9.0 版本发布 更新内容 与 1.8.0 版本对比，更新内容如下： 核心功能 域名映射支持 HTTPS 支持 UDP 协议代理 客户端断开连接时，记录日志空指针异常问题修复 基础优化 客户端重连逻辑优化，支持配置文件指定重连间隔，是否开启无限重连 增加对 mariadb 的支持 服务端/客户端，支持配置文..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/news/Neutrino-Proxy-1.9.0-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-23T05:33:00.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/news/Neutrino-Proxy-1.9.0-1.png"}],["meta",{"name":"twitter:image:alt","content":"内网穿透神器NeutrinoProxy 1.9.0版本发布"}],["meta",{"property":"article:author","content":"NeutrinoProxy"}],["meta",{"property":"article:published_time","content":"2023-09-25T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-10-23T05:33:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"内网穿透神器NeutrinoProxy 1.9.0版本发布\\",\\"image\\":[\\"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/news/Neutrino-Proxy-1.9.0-1.png\\"],\\"datePublished\\":\\"2023-09-25T00:00:00.000Z\\",\\"dateModified\\":\\"2023-10-23T05:33:00.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"NeutrinoProxy\\"}]}"]],"description":"内网穿透神器 NeutrinoProxy 1.9.0 版本发布 更新内容 与 1.8.0 版本对比，更新内容如下： 核心功能 域名映射支持 HTTPS 支持 UDP 协议代理 客户端断开连接时，记录日志空指针异常问题修复 基础优化 客户端重连逻辑优化，支持配置文件指定重连间隔，是否开启无限重连 增加对 mariadb 的支持 服务端/客户端，支持配置文..."},"headers":[{"level":2,"title":"内网穿透神器 NeutrinoProxy 1.9.0 版本发布","slug":"内网穿透神器-neutrinoproxy-1-9-0-版本发布","link":"#内网穿透神器-neutrinoproxy-1-9-0-版本发布","children":[]},{"level":2,"title":"更新内容","slug":"更新内容","link":"#更新内容","children":[]},{"level":2,"title":"升级须知","slug":"升级须知","link":"#升级须知","children":[]},{"level":2,"title":"项目简介","slug":"项目简介","link":"#项目简介","children":[]},{"level":2,"title":"主要特点：","slug":"主要特点","link":"#主要特点","children":[]},{"level":2,"title":"快速使用","slug":"快速使用","link":"#快速使用","children":[{"level":3,"title":"1、 部署服务端","slug":"_1、-部署服务端","link":"#_1、-部署服务端","children":[]},{"level":3,"title":"2、管理后台配置","slug":"_2、管理后台配置","link":"#_2、管理后台配置","children":[]},{"level":3,"title":"3、启动客户端","slug":"_3、启动客户端","link":"#_3、启动客户端","children":[]},{"level":3,"title":"4、代理验证","slug":"_4、代理验证","link":"#_4、代理验证","children":[]}]},{"level":2,"title":"联系我们","slug":"联系我们","link":"#联系我们","children":[]}],"git":{"createdTime":1698039180000,"updatedTime":1698039180000,"contributors":[{"name":"Cici","username":"Cici","email":"1901177100@qq.com","commits":1,"url":"https://github.com/Cici"}]},"readingTime":{"minutes":5.79,"words":1736},"filePathRelative":"zh/news/Neutrino-Proxy-1.9.0.md","localizedDate":"2023年9月25日","autoDesc":true,"excerpt":"<h2>内网穿透神器 NeutrinoProxy 1.9.0 版本发布</h2>\\n<h2>更新内容</h2>\\n<blockquote>\\n<p>与 1.8.0 版本对比，更新内容如下：</p>\\n</blockquote>\\n<ul>\\n<li>\\n<p>核心功能</p>\\n</li>\\n<li>\\n<p>域名映射支持 HTTPS</p>\\n</li>\\n<li>\\n<p>支持 UDP 协议代理</p>\\n</li>\\n<li>\\n<p>客户端断开连接时，记录日志空指针异常问题修复</p>\\n</li>\\n<li>\\n<p>基础优化</p>\\n</li>\\n<li>\\n<p>客户端重连逻辑优化，支持配置文件指定重连间隔，是否开启无限重连</p>\\n</li>\\n<li>\\n<p>增加对 mariadb 的支持</p>\\n</li>\\n<li>\\n<p>服务端/客户端，支持配置文件、启动参数指定日志级别</p>\\n</li>\\n<li>\\n<p>后台端口池管理支持批量删除</p>\\n</li>\\n<li>\\n<p>后台下拉选择 license、用户支持模糊搜索</p>\\n</li>\\n<li>\\n<p>端口映射下拉选择端口支持搜索、分野</p>\\n</li>\\n<li>\\n<p>客户端/服务端配置增加心跳日志开关，有需要时开启，方便排查问题</p>\\n</li>\\n<li>\\n<p>端口映射 HTTP(S)新增打开网页快捷操作，优先使用绑定域名打开</p>\\n</li>\\n</ul>"}');export{h as comp,m as data};