import{_ as n,c as a,a as e,o as i}from"./app-ClKXsWTV.js";const l="/assets/img/news/x-file-storage-2.1.0-1.svg",p="/assets/img/news/x-file-storage-2.1.0-2.svg",t="/assets/img/news/x-file-storage-2.1.0-3.svg",r={};function c(d,s){return i(),a("div",null,[...s[0]||(s[0]=[e('<p>原名 X Spring File Storage 现已捐赠至 dromara 开源组织</p><p>x-file-storage.dromara.org | x-file-storage.xuyanwu.cn | spring-file-storage.xuyanwu.cn</p><p><img src="'+l+'" alt=""> <img src="'+p+'" alt=""> <img src="'+t+`" alt=""></p><h1 id="📚-简介" tabindex="-1"><a class="header-anchor" href="#📚-简介"><span>📚 简介</span></a></h1><p>一行代码将文件存储到本地、FTP、SFTP、WebDAV、阿里云 OSS、华为云 OBS、七牛云 Kodo、腾讯云 COS、百度云 BOS、又拍云 USS、MinIO、 Amazon S3、GoogleCloud Storage、FastDFS、 Azure Blob Storage、Cloudflare R2、金山云 KS3、美团云 MSS、京东云 OSS、天翼云 OOS、移动 云 EOS、沃云 OSS、网易数帆 NOS、Ucloud US3、青云 QingStor、平安云 OBS、首云 OSS、IBM COS、其它兼容 S3 协议的存储平台。查看 所有支持的存储平台</p><p>💡 通过 WebDAV 连接到 Alist 后，可以使用百度网盘、天翼云盘、阿里云盘、迅雷网盘等常见存储服务，查看 Alist 支持的存储平台</p><p>GitHub：https://github.com/dromara/x-file-storage</p><p>Gitee：https://gitee.com/dromara/x-file-storage</p><p>文档 1：https://x-file-storage.dromara.org</p><p>文档 2：https://x-file-storage.xuyanwu.cn</p><p>文档 3：https://spring-file-storage.xuyanwu.cn</p><hr><h1 id="📜-更新内容" tabindex="-1"><a class="header-anchor" href="#📜-更新内容"><span>📜 更新内容</span></a></h1><ul><li>新增 FastDFS 存储平台</li><li>新增 Azure Blob Storage 存储平台</li><li>新增复制文件，支持跨存储平台复制</li><li>新增移动（重命名）文件，支持跨存储平台移动（重命名）</li><li>新增大文件手动分片上传（断点续传），1.0.0 版本早已支持大文件自动分片上传</li><li>新增计算哈希功能，上传下载时可以边处理边计算</li><li>上传无需强制获取文件大小，上传未知大小的文件更友好</li><li>优化 SpringBoot 自动配置兼容非 SpringWeb 环境</li><li>优化 FileKey 获取方式，避免空指针异常</li><li>优化上传代码结构</li><li>优化异常处理</li><li>优化进度监听器</li><li>修复上传时设置缩略图保存名称错误的 BUG</li><li>兼容低版本 SpringBoot(2.0.x)的依赖注入</li><li>修复华为云 OBS 上传进度问题</li><li>修复 MultipartFile 存储到本地时，在某些情况下输入流未关闭的问题</li><li>修复 又拍云 USS 上传缩略图文件时 Response 未关闭的问题</li></ul><hr><h1 id="📦-使用" tabindex="-1"><a class="header-anchor" href="#📦-使用"><span>📦 使用</span></a></h1><p>点击 快速入门 查看全部存储平台的使用方法！</p><h4 id="🔧-配置" tabindex="-1"><a class="header-anchor" href="#🔧-配置"><span>🔧 配置</span></a></h4><p>这里以阿里云 OSS 为例，<code>pom.xml</code> 引入本项目，这里默认是 <code>SpringBoot</code> 环境，其它环境参考 脱离 SpringBoot 单独使用</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>&lt;!-- 引入本项目 --&gt;</span></span>
<span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;org.dromara.x-file-storage&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;x-file-storage-spring&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;version&gt;2.1.0&lt;/version&gt;</span></span>
<span class="line"><span>&lt;/dependency&gt;</span></span>
<span class="line"><span>&lt;!-- 引入 阿里云 OSS SDK，如果使用其它存储平台，就引入对应的 SDK  --&gt;</span></span>
<span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;com.aliyun.oss&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;aliyun-sdk-oss&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;version&gt;3.16.1&lt;/version&gt;</span></span>
<span class="line"><span>&lt;/dependency&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>application.yml</code> 配置文件中添加以下基础配置</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>dromara:</span></span>
<span class="line"><span>  x-file-storage: #文件存储配置</span></span>
<span class="line"><span>    default-platform: aliyun-oss-1 #默认使用的存储平台</span></span>
<span class="line"><span>    aliyun-oss:</span></span>
<span class="line"><span>      - platform: aliyun-oss-1 # 存储平台标识</span></span>
<span class="line"><span>        enable-storage: true  # 启用存储</span></span>
<span class="line"><span>        access-key: ??</span></span>
<span class="line"><span>        secret-key: ??</span></span>
<span class="line"><span>        end-point: ??</span></span>
<span class="line"><span>        bucket-name: ??</span></span>
<span class="line"><span>        domain: ?? # 访问域名，注意“/”结尾，例如：https://abc.oss-cn-shanghai.aliyuncs.com/</span></span>
<span class="line"><span>        base-path: test/ # 基础路径</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="🔨-编码" tabindex="-1"><a class="header-anchor" href="#🔨-编码"><span>🔨 编码</span></a></h4><p>在启动类上加上<code>@EnableFileStorage</code>注解</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>@EnableFileStorage</span></span>
<span class="line"><span>@SpringBootApplication</span></span>
<span class="line"><span>public class SpringFileStorageTestApplication {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span>        SpringApplication.run(SpringFileStorageTestApplication.class,args);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="✨-开始上传" tabindex="-1"><a class="header-anchor" href="#✨-开始上传"><span>✨ 开始上传</span></a></h4><p>支持 File、MultipartFile、byte[]、InputStream、URL、URI、String、HttpServletRequest，大文件会自动分片上传。如果想支持更多方式，请阅读 文件适配器 章节</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>@RestController</span></span>
<span class="line"><span>public class FileDetailController {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Autowired</span></span>
<span class="line"><span>    private FileStorageService fileStorageService;//注入实列</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 上传文件</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    @PostMapping(&quot;/upload&quot;)</span></span>
<span class="line"><span>    public FileInfo upload(MultipartFile file) {</span></span>
<span class="line"><span>        //只需要这一行代码即可上传成功</span></span>
<span class="line"><span>        return fileStorageService.of(file).upload();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 上传文件，成功返回文件 url</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    @PostMapping(&quot;/upload2&quot;)</span></span>
<span class="line"><span>    public String upload2(MultipartFile file) {</span></span>
<span class="line"><span>        FileInfo fileInfo = fileStorageService.of(file)</span></span>
<span class="line"><span>                .setPath(&quot;upload/&quot;) //保存到相对路径下，为了方便管理，不需要可以不写</span></span>
<span class="line"><span>                .setObjectId(&quot;0&quot;)   //关联对象id，为了方便管理，不需要可以不写</span></span>
<span class="line"><span>                .setObjectType(&quot;0&quot;) //关联对象类型，为了方便管理，不需要可以不写</span></span>
<span class="line"><span>                .putAttr(&quot;role&quot;,&quot;admin&quot;) //保存一些属性，可以在切面、保存上传记录、自定义存储平台等地方获取使用，不需要可以不写</span></span>
<span class="line"><span>                .upload();  //将文件上传到对应地方</span></span>
<span class="line"><span>        return fileInfo == null ? &quot;上传失败！&quot; : fileInfo.getUrl();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 上传图片，成功返回文件信息</span></span>
<span class="line"><span>     * 图片处理使用的是 https://github.com/coobird/thumbnailator</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    @PostMapping(&quot;/upload-image&quot;)</span></span>
<span class="line"><span>    public FileInfo uploadImage(MultipartFile file) {</span></span>
<span class="line"><span>        return fileStorageService.of(file)</span></span>
<span class="line"><span>                .image(img -&gt; img.size(1000,1000))  //将图片大小调整到 1000*1000</span></span>
<span class="line"><span>                .thumbnail(th -&gt; th.size(200,200))  //再生成一张 200*200 的缩略图</span></span>
<span class="line"><span>                .upload();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 上传文件到指定存储平台，成功返回文件信息</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    @PostMapping(&quot;/upload-platform&quot;)</span></span>
<span class="line"><span>    public FileInfo uploadPlatform(MultipartFile file) {</span></span>
<span class="line"><span>        return fileStorageService.of(file)</span></span>
<span class="line"><span>                .setPlatform(&quot;aliyun-oss-1&quot;)    //使用指定的存储平台</span></span>
<span class="line"><span>                .upload();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 直接读取 HttpServletRequest 中的文件进行上传，成功返回文件信息</span></span>
<span class="line"><span>     * 使用这种方式有些注意事项，请查看文档 基础功能-上传 章节</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    @PostMapping(&quot;/upload-request&quot;)</span></span>
<span class="line"><span>    public FileInfo uploadPlatform(HttpServletRequest request) {</span></span>
<span class="line"><span>        return fileStorageService.of(request).upload();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="🎨-其它操作" tabindex="-1"><a class="header-anchor" href="#🎨-其它操作"><span>🎨 其它操作</span></a></h4><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>//手动构造文件信息，可用于其它操作</span></span>
<span class="line"><span>FileInfo fileInfo = new FileInfo()</span></span>
<span class="line"><span>        .setPlatform(&quot;huawei-obs-1&quot;)</span></span>
<span class="line"><span>        .setBasePath(&quot;test/&quot;)</span></span>
<span class="line"><span>        .setPath(&quot;aa/&quot;)</span></span>
<span class="line"><span>        .setFilename(&quot;image.png&quot;)</span></span>
<span class="line"><span>        .setThFilename(&quot;image.png.min.jpg&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//文件是否存在</span></span>
<span class="line"><span>boolean exists = fileStorageService.exists(fileInfo);</span></span>
<span class="line"><span>//下载</span></span>
<span class="line"><span>byte[] bytes = fileStorageService.download(fileInfo).bytes();</span></span>
<span class="line"><span>//删除</span></span>
<span class="line"><span>fileStorageService.delete(fileInfo);</span></span>
<span class="line"><span>//其它更多操作</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果将文件记录保存到数据库中，还可以更方便的根据 URL 进行操作了，详情请阅读 保存上传记录 章节</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>//直接从数据库中获取 FileInfo 对象，更加方便执行其它操作</span></span>
<span class="line"><span>FileInfo fileInfo = fileStorageService.getFileInfoByUrl(&quot;https://abc.def.com/test/aa/image.png&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//文件是否存在</span></span>
<span class="line"><span>boolean exists = fileStorageService.exists(&quot;https://abc.def.com/test/aa/image.png&quot;);</span></span>
<span class="line"><span>//下载</span></span>
<span class="line"><span>byte[] bytes = fileStorageService.download(&quot;https://abc.def.com/test/aa/image.png&quot;).bytes();</span></span>
<span class="line"><span>//删除</span></span>
<span class="line"><span>fileStorageService.delete(&quot;https://abc.def.com/test/aa/image.png&quot;);</span></span>
<span class="line"><span>//其它更多操作</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>点击 快速入门 https://x-file-storage.xuyanwu.cn/ 查看全部存储平台的使用方法！</p><hr>`,34)])])}const u=n(r,[["render",c]]),m=JSON.parse('{"path":"/zh/news/x-file-storage-2.1.0.html","title":"一站式文件存储 X File Storage 发布 2.1.0 版本","lang":"zh-CN","frontmatter":{"title":"一站式文件存储 X File Storage 发布 2.1.0 版本","author":"x-file-storage","date":"2024-01-22T00:00:00.000Z","cover":"/assets/img/news/X-File-Storage-Cover.svg","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"一站式文件存储 X File Storage 发布 2.1.0 版本\\",\\"image\\":[\\"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/news/x-file-storage-2.1.0-1.svg\\",\\"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/news/x-file-storage-2.1.0-2.svg\\",\\"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/news/x-file-storage-2.1.0-3.svg\\"],\\"datePublished\\":\\"2024-01-22T00:00:00.000Z\\",\\"dateModified\\":\\"2025-09-06T11:40:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"x-file-storage\\"}]}"],["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/zh/news/x-file-storage-2.1.0.html"}],["meta",{"property":"og:title","content":"一站式文件存储 X File Storage 发布 2.1.0 版本"}],["meta",{"property":"og:description","content":"原名 X Spring File Storage 现已捐赠至 dromara 开源组织 x-file-storage.dromara.org | x-file-storage.xuyanwu.cn | spring-file-storage.xuyanwu.cn 📚 简介 一行代码将文件存储到本地、FTP、SFTP、WebDAV、阿里云 OSS、华为..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/news/X-File-Storage-Cover.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-09-06T11:40:08.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/news/X-File-Storage-Cover.svg"}],["meta",{"name":"twitter:image:alt","content":"一站式文件存储 X File Storage 发布 2.1.0 版本"}],["meta",{"property":"article:author","content":"x-file-storage"}],["meta",{"property":"article:published_time","content":"2024-01-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-09-06T11:40:08.000Z"}],["meta",{"name":"新闻"}]],"description":"原名 X Spring File Storage 现已捐赠至 dromara 开源组织 x-file-storage.dromara.org | x-file-storage.xuyanwu.cn | spring-file-storage.xuyanwu.cn 📚 简介 一行代码将文件存储到本地、FTP、SFTP、WebDAV、阿里云 OSS、华为..."},"git":{"createdTime":1697704331000,"updatedTime":1757158808000,"contributors":[{"name":"1171736840","username":"1171736840","email":"35297205+1171736840@users.noreply.github.com","commits":2,"url":"https://github.com/1171736840"},{"name":"Cici","username":"Cici","email":"1901177100@qq.com","commits":1,"url":"https://github.com/Cici"},{"name":"Cicici-Shi","username":"Cicici-Shi","email":"1901177100@qq.com","commits":1,"url":"https://github.com/Cicici-Shi"},{"name":"tomsun28","username":"tomsun28","email":"tomsun28@outlook.com","commits":1,"url":"https://github.com/tomsun28"},{"name":"kaku","username":"kaku","email":"1092804319@qq.com","commits":2,"url":"https://github.com/kaku"}]},"readingTime":{"minutes":4.59,"words":1376},"filePathRelative":"zh/news/x-file-storage-2.1.0.md","autoDesc":true}');export{u as comp,m as data};
