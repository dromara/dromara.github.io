import{_ as e,a as i}from"./x-file-storage-2.2.0-1-a2136ca8.js";import{_ as n,o as a,c as t,f as l}from"./app-8de95501.js";const s={},d=l('<h3 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> <img src="'+e+`" alt=""></h3><p>The X Spring File Storage is now donated to dromara open source organizations.</p><p>x-file-storage.dromara.org | x-file-storage.xuyanwu.cn | spring-file-storage.xuyanwu.cn</p><h1 id="📚introduction" tabindex="-1"><a class="header-anchor" href="#📚introduction" aria-hidden="true">#</a> 📚Introduction</h1><p>One line of code stores files to local, FTP, SFTP, WebDAV, Aliyun OSS, Huawei Cloud OBS, Qiniu Cloud Kodo, Tengxun Cloud COS, Baidu Cloud BOS, Youpai Cloud USS, MinIO, Amazon S3, GoogleCloud Storage, FastDFS, Azure Blob Storage, Cloudflare R2, Jinshan Cloud KS3, Meituan Cloud MSS, jingdong cloud OSS, Tianyi Cloud OOS, Mobile Netease Cloud EOS, Woyun OSS number of sails NOS, Ucloud US3, Qingyun QingStor, Ping An Cloud OBS, First Cloud OSS, IBM COS, and other S3 protocol-compatible storage platforms. View all supported storage platforms</p><p>💡After connecting to Alist through WebDAV, you can use common storage services such as Baidu Network Disk, Tianyi Cloud Disk, Ali Cloud Disk, and Xunlei Network Disk to view the storage platforms supported by Alist.</p><p>🚚You can migrate files between different storage platforms. For more information, see the migration file.</p><p>GitHub:https://github.com/dromara/x-file-storage Gitee:https://gitee.com/dromara/x-file-storage</p><p>Document 1:https://x-file-storage.dromara.org Document 2:https://x-file-storage.xuyanwu.cn Document 3:https://spring-file-storage.xuyanwu.cn</p><hr><h1 id="📜update-content" tabindex="-1"><a class="header-anchor" href="#📜update-content" aria-hidden="true">#</a> 📜Update Content</h1><ul><li><p>Added acquisition file</p></li><li><p>Added enumerated documents</p></li><li><p>Refactoring pre-signed URL supports client upload, download, delete and other operations</p></li><li><p>Added Solon plug-in, can be more convenient to use in Solon</p></li><li><p>Upgrading the Hutool version</p></li><li><p>Optimization of manual multipart upload and increased support for GoogleCloud Storage</p></li><li><p>Optimized thumbnail exception handling</p></li><li><p>Optimized code structure</p></li><li><p>Fix hash value consistency in sharding scenarios</p></li><li><p>Fix occasional errors in Minio multipart upload</p></li><li><p>Fix the problem that static resource access to local storage does not take effect.</p></li><li><p>...</p></li></ul><h1 id="📦use" tabindex="-1"><a class="header-anchor" href="#📦use" aria-hidden="true">#</a> 📦Use</h1><p>Click Quick Start to see how to use all storage platforms!</p><h4 id="🔧configuration" tabindex="-1"><a class="header-anchor" href="#🔧configuration" aria-hidden="true">#</a> 🔧Configuration</h4><p>Take Alibaba Cloud OSS as an example. &#39;pom.xml&#39; is introduced into this project. The default environment is &#39;SpringBoot&#39;. Other environments can be used separately from the SpringBoot.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;!-- 引入本项目 --&gt;
&lt;dependency&gt;
    &lt;groupId&gt;org.dromara.x-file-storage&lt;/groupId&gt;
    &lt;artifactId&gt;x-file-storage-spring&lt;/artifactId&gt;
    &lt;version&gt;2.2.0&lt;/version&gt;
&lt;/dependency&gt;
&lt;!-- 引入 阿里云 OSS SDK，如果使用其它存储平台，就引入对应的 SDK  --&gt;
&lt;dependency&gt;
    &lt;groupId&gt;com.aliyun.oss&lt;/groupId&gt;
    &lt;artifactId&gt;aliyun-sdk-oss&lt;/artifactId&gt;
    &lt;version&gt;3.16.1&lt;/version&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>application.yml</code> Add the following basic configuration to the configuration file</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>dromara:
  x-file-storage: #文件存储配置
    default-platform: aliyun-oss-1 #默认使用的存储平台
    aliyun-oss:
      - platform: aliyun-oss-1 # 存储平台标识
        enable-storage: true  # 启用存储
        access-key: ??
        secret-key: ??
        end-point: ??
        bucket-name: ??
        domain: ?? # 访问域名，注意“/”结尾，例如：https://abc.oss-cn-shanghai.aliyuncs.com/
        base-path: test/ # 基础路径
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="🔨encoding" tabindex="-1"><a class="header-anchor" href="#🔨encoding" aria-hidden="true">#</a> 🔨Encoding</h4><p>Add the &#39;@ EnableFileStorage&#39; annotation to the startup class</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@EnableFileStorage
@SpringBootApplication
public class SpringFileStorageTestApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringFileStorageTestApplication.class,args);
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="✨start-upload" tabindex="-1"><a class="header-anchor" href="#✨start-upload" aria-hidden="true">#</a> ✨Start Upload</h4><p>File, MultipartFile, byte, InputStream, URL, URI, String, and HttpServletRequest are supported. Large files are automatically uploaded in parts. If you want to support more ways, please read the file adapter chapter.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@RestController
public class FileDetailController {

    @Autowired
    private FileStorageService fileStorageService;//注入实列

    /**
     * 上传文件
     */
    @PostMapping(&quot;/upload&quot;)
    public FileInfo upload(MultipartFile file) {
        //只需要这一行代码即可上传成功
        return fileStorageService.of(file).upload();
    }
    
    /**
     * 上传文件，成功返回文件 url
     */
    @PostMapping(&quot;/upload2&quot;)
    public String upload2(MultipartFile file) {
        FileInfo fileInfo = fileStorageService.of(file)
                .setPath(&quot;upload/&quot;) //保存到相对路径下，为了方便管理，不需要可以不写
                .setObjectId(&quot;0&quot;)   //关联对象id，为了方便管理，不需要可以不写
                .setObjectType(&quot;0&quot;) //关联对象类型，为了方便管理，不需要可以不写
                .putAttr(&quot;role&quot;,&quot;admin&quot;) //保存一些属性，可以在切面、保存上传记录、自定义存储平台等地方获取使用，不需要可以不写
                .upload();  //将文件上传到对应地方
        return fileInfo == null ? &quot;上传失败！&quot; : fileInfo.getUrl();
    }

    /**
     * 上传图片，成功返回文件信息
     * 图片处理使用的是 https://github.com/coobird/thumbnailator
     */
    @PostMapping(&quot;/upload-image&quot;)
    public FileInfo uploadImage(MultipartFile file) {
        return fileStorageService.of(file)
                .image(img -&gt; img.size(1000,1000))  //将图片大小调整到 1000*1000
                .thumbnail(th -&gt; th.size(200,200))  //再生成一张 200*200 的缩略图
                .upload();
    }

    /**
     * 上传文件到指定存储平台，成功返回文件信息
     */
    @PostMapping(&quot;/upload-platform&quot;)
    public FileInfo uploadPlatform(MultipartFile file) {
        return fileStorageService.of(file)
                .setPlatform(&quot;aliyun-oss-1&quot;)    //使用指定的存储平台
                .upload();
    }

    /**
     * 直接读取 HttpServletRequest 中的文件进行上传，成功返回文件信息
     * 使用这种方式有些注意事项，请查看文档 基础功能-上传 章节
     */
    @PostMapping(&quot;/upload-request&quot;)
    public FileInfo uploadPlatform(HttpServletRequest request) {
        return fileStorageService.of(request).upload();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="🎨other-operations" tabindex="-1"><a class="header-anchor" href="#🎨other-operations" aria-hidden="true">#</a> 🎨Other operations</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//手动构造文件信息，可用于其它操作
FileInfo fileInfo = new FileInfo()
        .setPlatform(&quot;huawei-obs-1&quot;)
        .setBasePath(&quot;test/&quot;)
        .setPath(&quot;aa/&quot;)
        .setFilename(&quot;image.png&quot;)
        .setThFilename(&quot;image.png.min.jpg&quot;);

//文件是否存在
boolean exists = fileStorageService.exists(fileInfo);
//下载
byte[] bytes = fileStorageService.download(fileInfo).bytes();
//删除
fileStorageService.delete(fileInfo);
//其它更多操作

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>If the file record is saved to the database, it can be more convenient to operate according to the URL. For details, please read the section on saving the upload record.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//直接从数据库中获取 FileInfo 对象，更加方便执行其它操作
FileInfo fileInfo = fileStorageService.getFileInfoByUrl(&quot;https://abc.def.com/test/aa/image.png&quot;);

//文件是否存在
boolean exists = fileStorageService.exists(&quot;https://abc.def.com/test/aa/image.png&quot;);
//下载
byte[] bytes = fileStorageService.download(&quot;https://abc.def.com/test/aa/image.png&quot;).bytes();
//删除
fileStorageService.delete(&quot;https://abc.def.com/test/aa/image.png&quot;);
//其它更多操作
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Click the Quick Start https://x-file-storage.xuyanwu.cn to see how to use all storage platforms!</p><hr><p>About Dromara</p><p>Dromara is an open source community composed of top domestic open source project authors. It provides a series of open source products, solutions and consulting, technical support and training certification services, including distributed transactions, popular tools, enterprise-level authentication, microservice RPC, operation and maintenance monitoring, Agent monitoring, distributed logging, scheduling and orchestration. The technology stack is fully open-source and community-neutral, and is committed to providing microservice cloud-native solutions for global users. Let every 1 open source enthusiasts participate in the joy of open source.</p><p>Dromara open source community currently has 10 GVP projects, with a total number of star exceeding 100,000. It has built an open source community of tens of thousands of people, and thousands of individuals and teams are using the open source projects of Dromara community.</p><p>**Welcome to the knowledge planet and I interact * *</p><figure><img src="`+i+'" alt="" tabindex="0"><figcaption></figcaption></figure>',36),o=[d];function r(u,c){return a(),t("div",null,o)}const m=n(s,[["render",r],["__file","x-file-storage-2.2.0.html.vue"]]);export{m as default};
