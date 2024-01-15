import{_ as e,a as i}from"./Neutrino-Proxy-1.9.0-2-ee19cecf.js";import{_ as r,o as l,c as a,f as n}from"./app-73779642.js";const d={},s=n('<h2 id="内网穿透神器-neutrinoproxy-1-9-0-版本发布" tabindex="-1"><a class="header-anchor" href="#内网穿透神器-neutrinoproxy-1-9-0-版本发布" aria-hidden="true">#</a> 内网穿透神器 NeutrinoProxy 1.9.0 版本发布</h2><h2 id="更新内容" tabindex="-1"><a class="header-anchor" href="#更新内容" aria-hidden="true">#</a> 更新内容</h2><blockquote><p>与 1.8.0 版本对比，更新内容如下：</p></blockquote><ul><li><p>核心功能</p></li><li><p>域名映射支持 HTTPS</p></li><li><p>支持 UDP 协议代理</p></li><li><p>客户端断开连接时，记录日志空指针异常问题修复</p></li><li><p>基础优化</p></li><li><p>客户端重连逻辑优化，支持配置文件指定重连间隔，是否开启无限重连</p></li><li><p>增加对 mariadb 的支持</p></li><li><p>服务端/客户端，支持配置文件、启动参数指定日志级别</p></li><li><p>后台端口池管理支持批量删除</p></li><li><p>后台下拉选择 license、用户支持模糊搜索</p></li><li><p>端口映射下拉选择端口支持搜索、分野</p></li><li><p>客户端/服务端配置增加心跳日志开关，有需要时开启，方便排查问题</p></li><li><p>端口映射 HTTP(S)新增打开网页快捷操作，优先使用绑定域名打开</p></li></ul><h2 id="升级须知" tabindex="-1"><a class="header-anchor" href="#升级须知" aria-hidden="true">#</a> 升级须知</h2><blockquote><p>从 1.9.0 之前的版本升级需要注意：</p></blockquote><ul><li>在项目<code>neutrino-proxy-server/src/main/resources/sql</code>目录下找到 mysql/sqlite 的增量 sql 文件<code>UPDATE-20230922.SQL</code>,执行更新自己的中微子代理数据库</li><li>参照官网服务端配置调整现有的服务端配置</li><li>参照官网客户端配置吊证现有的客户端配置</li><li>从仓库发行版下载最新版本的客户端(neutrino-proxy-client.jar)、服务端(neutrino-proxy-server.jar、 neutrino-proxy-admin.zip)部署文件。若为服务端是 docker 镜像部署，则更新镜像重启即可</li></ul><h2 id="项目简介" tabindex="-1"><a class="header-anchor" href="#项目简介" aria-hidden="true">#</a> 项目简介</h2><ul><li>中微子代理(neutrino-proxy) 是一款基于 netty 的内网穿透神器。该项目采用最为宽松的 MIT 协议，因此您可以对它进行复制、修改、传播并用于任何个人或商业行为。</li><li>Gitee 地址：https://gitee.com/dromara/neutrino-proxy</li><li>官网地址：http://neutrino-proxy.dromara.org</li><li>服务端管理后台截图：</li></ul><figure><img src="'+e+`" alt="" tabindex="0"><figcaption></figcaption></figure><h2 id="主要特点" tabindex="-1"><a class="header-anchor" href="#主要特点" aria-hidden="true">#</a> 主要特点：</h2><ul><li>1、流量监控：首页图表、报表管理多维度流量监控。全方位掌握实时、历史代理数据。</li><li>2、用户/License：支持多用户、多客户端使用。后台禁用实时生效。</li><li>3、端口池：对外端口统一管理，支持用户、License 独占端口。</li><li>4、端口映射：新增、编辑、删除、禁用实时生效。</li><li>5、Docker：服务端支持 Docker 一键部署。</li><li>6、SSL 证书：支持 SSL，保护您的信息安全。</li><li>7、域名映射：支持绑定子域名，方便本地调试三方回调</li><li>8、多协议：支持代理 TCP、HTTP(S)、UDP 多种协议</li><li>9、采用最为宽松的 MIT 协议，免去你的后顾之忧</li></ul><h2 id="快速使用" tabindex="-1"><a class="header-anchor" href="#快速使用" aria-hidden="true">#</a> 快速使用</h2><blockquote><p>更多使用姿势、细节请通过官网或结尾微信二维码加我备注&quot;中微子代理&quot;入群交流。</p></blockquote><h3 id="_1、-部署服务端" tabindex="-1"><a class="header-anchor" href="#_1、-部署服务端" aria-hidden="true">#</a> 1、 部署服务端</h3><h4 id="_1-1、-docker-一键部署" tabindex="-1"><a class="header-anchor" href="#_1-1、-docker-一键部署" aria-hidden="true">#</a> 1.1、 Docker 一键部署</h4><blockquote><p>当前最新版本为 1.9.0，下面的脚本中，可以使用：<code>registry.cn-hangzhou.aliyuncs.com/asgc/neutrino-proxy:1.9.0</code> 指定版本安装，推荐使用<code>latest</code>直接安装最新版。</p></blockquote><h5 id="使用默认-sqlite-数据库" tabindex="-1"><a class="header-anchor" href="#使用默认-sqlite-数据库" aria-hidden="true">#</a> 使用默认 sqlite 数据库</h5><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker run -it -p 9000-9200:9000-9200/tcp -p 8888:8888 \\
-d --restart=always --name neutrino-proxy \\
registry.cn-hangzhou.aliyuncs.com/asgc/neutrino-proxy:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="指定自己的-mysql-数据库" tabindex="-1"><a class="header-anchor" href="#指定自己的-mysql-数据库" aria-hidden="true">#</a> 指定自己的 mysql 数据库</h5><ul><li>在服务器上创建目录：/root/neutrino-proxy/config</li><li>在该目录下创建<code>app.yml</code>文本文件，并配置如下内容：</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>neutrino:
  data:
    db:
      type: mysql
      # 自己的数据库实例，创建一个空的名为&#39;neutrino-proxy&#39;的数据库即可，首次启动服务端会自动初始化
      url: jdbc:mysql://xxxx:3306/neutrino-proxy?useUnicode=true&amp;characterEncoding=UTF-8&amp;allowMultiQueries=true&amp;useAffectedRows=true&amp;useSSL=false
      driver-class: com.mysql.jdbc.Driver
      # 数据库帐号
      username: xxx
      # 数据库密码
      password: xxx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>然后执行如下命令：</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker run -it -p 9000-9200:9000-9200/tcp -p 8888:8888 \\
-v /root/neutrino-proxy/config:/root/neutrino-proxy/config \\
-d --restart=always --name neutrino \\
registry.cn-hangzhou.aliyuncs.com/asgc/neutrino-proxy:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-2、使用-jar-包自行部署" tabindex="-1"><a class="header-anchor" href="#_1-2、使用-jar-包自行部署" aria-hidden="true">#</a> 1.2、使用 jar 包自行部署</h4><ul><li>首先确保服务器上已安装 java8 运行环境</li><li>打开发行版页面，下载最新的 release 包：<code>neutrino-proxy-server.jar</code>、<code>neutrino-proxy-admin.zip</code></li><li>在服务器上新建部署目录：<code>/work/projects/neutrino-proxy-server</code></li><li>将 <code>neutrino-proxy-server.jar</code>、<code>neutrino-proxy-admin.zip</code>上传至服务器部署目录。</li><li>解压<code>neutrino-proxy-admin.zip</code>文件</li><li>执行命令<code>java -jar neutrino-proxy-server.jar</code>启动服务端完成部署，默认使用 sqlite 数据库。</li><li>若需要指定自己的 mysql 数据库，同样的需要在当前目录下新建<code>app.yml</code>文件，文件内容同上。执行命令<code>java -jar neutrino-proxy-server.jar config=app.yml</code>启动服务端完成部署</li><li>可参照 https://gitee.com/dromara/neutrino-proxy/blob/master/bin/server_start.sh 使用 shell 脚本启动服务端。</li></ul><h3 id="_2、管理后台配置" tabindex="-1"><a class="header-anchor" href="#_2、管理后台配置" aria-hidden="true">#</a> 2、管理后台配置</h3><ul><li>服务端部署成功后，访问<code>http://{服务端IP}:8888</code>打开后台管理页面。</li><li>使用默认的管理员帐号登录：admin/123456</li><li>打开<code>代理配置&gt;License管理</code>页面，可以看到系统已经自动为管理员初始化了一条 License 记录，复制该<code>LicenseKey</code>备用，后续客户端配置需要。</li><li>打开<code>代理配置&gt;端口映射</code>页面，可以看到系统已经自动为初始化了几条端口映射。可根据需要自行添加、修改。这里我们以<code>9101 -&gt; 127.0.0.1:8080</code>映射为例</li></ul><h3 id="_3、启动客户端" tabindex="-1"><a class="header-anchor" href="#_3、启动客户端" aria-hidden="true">#</a> 3、启动客户端</h3><ul><li>首先确保本地已安装 java8 运行环境</li><li>打开发行版页面，下载最新的 release 包：<code>neutrino-proxy-client.jar</code></li><li>在本地<code>neutrino-proxy-client.jar</code>同级别目录下新建<code>app.yml</code>文件，并配置如下内容：</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>neutrino:
  proxy:
    tunnel:
      # ssl证书密钥（使用jjar包内自带的证书，则此处无需修改）
      key-store-password: 123456
      # ssl证书管理密钥（使用jjar包内自带的证书，则此处无需修改。自定义证书，则此处配置对应的路径）
      jks-path: classpath:/test.jks
      # 代理服务端IP
      server-ip: localhost
      # 代理服务端IP, 若是非ssl端口，则ssl-enable需要配置为false
      server-port: 9002
      # 是否启用ssl
      ssl-enable: true
      # licenseKey，客户端凭证。此处需要配置刚刚从管理后台复制的LicenseKey
      license-key: xxxx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>执行命令<code>java -jar neutrino-proxy-client.jar</code>启动客户端</li><li>查看服务端 License 管理，刷新页面，对应的 License 在线状态为<code>在线</code>，则表明客户端已正常连接。</li></ul><h3 id="_4、代理验证" tabindex="-1"><a class="header-anchor" href="#_4、代理验证" aria-hidden="true">#</a> 4、代理验证</h3><ul><li>本地启动被代理服务，如：redis、本地 web 项目、本地 mysql 等等</li><li>先确保本地能正常访问被代理服务，如果本地都不能访问，不用想代理更不可能！！！</li><li>通过服务端 IP+9101（上面 License 配置的端口映射重的服务端端口）访问本地被代理服务</li></ul><h2 id="联系我们" tabindex="-1"><a class="header-anchor" href="#联系我们" aria-hidden="true">#</a> 联系我们</h2><p>笔者时间、能力有限，且开源项目非一朝一夕之事，存在众多问题亦在所难免。使用、学习过程中有任何问题欢迎大家与我联系。</p><p>对项目有什么想法或者建议，可以加我微信拉交流群，或者创建 issues，一起完善项目</p><ul><li><p>微信号：yuyunshize</p></li><li><p>Email: aoshiguchen@dromara.org</p></li><li><p>中微子代理官网：http://neutrino-proxy.dromara.org</p></li><li><p>中微子代理仓库：https://gitee.com/dromara/neutrino-proxy</p><p>微信二维码：</p></li></ul><img src="`+i+'" height="340">',39),o=[s];function c(t,u){return l(),a("div",null,o)}const v=r(d,[["render",c],["__file","Neutrino-Proxy-1.9.0.html.vue"]]);export{v as default};