---
title: 一站式文件存储 X File Storage 发布 2.1.0 版本
author: x-file-storage
date: 2024-01-22
cover: /assets/img/news/X-File-Storage-Cover.svg
head:
  - - meta
    - name: 新闻
---

原名 X Spring File Storage 现已捐赠至 dromara 开源组织

x-file-storage.dromara.org | x-file-storage.xuyanwu.cn | spring-file-storage.xuyanwu.cn

![](/assets/img/news/x-file-storage-2.1.0-1.svg) ![](/assets/img/news/x-file-storage-2.1.0-2.svg) ![](/assets/img/news/x-file-storage-2.1.0-3.svg)

# 📚 简介

一行代码将文件存储到本地、FTP、SFTP、WebDAV、阿里云 OSS、华为云 OBS、七牛云 Kodo、腾讯云 COS、百度云 BOS、又拍云 USS、MinIO、 Amazon S3、GoogleCloud Storage、FastDFS、 Azure Blob Storage、Cloudflare R2、金山云 KS3、美团云 MSS、京东云 OSS、天翼云 OOS、移动 云 EOS、沃云 OSS、网易数帆 NOS、Ucloud US3、青云 QingStor、平安云 OBS、首云 OSS、IBM COS、其它兼容 S3 协议的存储平台。查看 所有支持的存储平台

💡 通过 WebDAV 连接到 Alist 后，可以使用百度网盘、天翼云盘、阿里云盘、迅雷网盘等常见存储服务，查看 Alist 支持的存储平台

GitHub：https://github.com/dromara/x-file-storage

Gitee：https://gitee.com/dromara/x-file-storage

文档 1：https://x-file-storage.dromara.org

文档 2：https://x-file-storage.xuyanwu.cn

文档 3：https://spring-file-storage.xuyanwu.cn

---

# 📜 更新内容

- 新增 FastDFS 存储平台
- 新增 Azure Blob Storage 存储平台
- 新增复制文件，支持跨存储平台复制
- 新增移动（重命名）文件，支持跨存储平台移动（重命名）
- 新增大文件手动分片上传（断点续传），1.0.0 版本早已支持大文件自动分片上传
- 新增计算哈希功能，上传下载时可以边处理边计算
- 上传无需强制获取文件大小，上传未知大小的文件更友好
- 优化 SpringBoot 自动配置兼容非 SpringWeb 环境
- 优化 FileKey 获取方式，避免空指针异常
- 优化上传代码结构
- 优化异常处理
- 优化进度监听器
- 修复上传时设置缩略图保存名称错误的 BUG
- 兼容低版本 SpringBoot(2.0.x)的依赖注入
- 修复华为云 OBS 上传进度问题
- 修复 MultipartFile 存储到本地时，在某些情况下输入流未关闭的问题
- 修复 又拍云 USS 上传缩略图文件时 Response 未关闭的问题

---

# 📦 使用

点击 快速入门 查看全部存储平台的使用方法！

#### 🔧 配置

这里以阿里云 OSS 为例，`pom.xml` 引入本项目，这里默认是 `SpringBoot` 环境，其它环境参考 脱离 SpringBoot 单独使用

```
<!-- 引入本项目 -->
<dependency>
    <groupId>org.dromara.x-file-storage</groupId>
    <artifactId>x-file-storage-spring</artifactId>
    <version>2.1.0</version>
</dependency>
<!-- 引入 阿里云 OSS SDK，如果使用其它存储平台，就引入对应的 SDK  -->
<dependency>
    <groupId>com.aliyun.oss</groupId>
    <artifactId>aliyun-sdk-oss</artifactId>
    <version>3.16.1</version>
</dependency>
```

`application.yml` 配置文件中添加以下基础配置

```
dromara:
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
```

#### 🔨 编码

在启动类上加上`@EnableFileStorage`注解

```
@EnableFileStorage
@SpringBootApplication
public class SpringFileStorageTestApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringFileStorageTestApplication.class,args);
    }

}
```

#### ✨ 开始上传

支持 File、MultipartFile、byte\[\]、InputStream、URL、URI、String、HttpServletRequest，大文件会自动分片上传。如果想支持更多方式，请阅读 文件适配器 章节

```
@RestController
public class FileDetailController {

    @Autowired
    private FileStorageService fileStorageService;//注入实列

    /**
     * 上传文件
     */
    @PostMapping("/upload")
    public FileInfo upload(MultipartFile file) {
        //只需要这一行代码即可上传成功
        return fileStorageService.of(file).upload();
    }

    /**
     * 上传文件，成功返回文件 url
     */
    @PostMapping("/upload2")
    public String upload2(MultipartFile file) {
        FileInfo fileInfo = fileStorageService.of(file)
                .setPath("upload/") //保存到相对路径下，为了方便管理，不需要可以不写
                .setObjectId("0")   //关联对象id，为了方便管理，不需要可以不写
                .setObjectType("0") //关联对象类型，为了方便管理，不需要可以不写
                .putAttr("role","admin") //保存一些属性，可以在切面、保存上传记录、自定义存储平台等地方获取使用，不需要可以不写
                .upload();  //将文件上传到对应地方
        return fileInfo == null ? "上传失败！" : fileInfo.getUrl();
    }

    /**
     * 上传图片，成功返回文件信息
     * 图片处理使用的是 https://github.com/coobird/thumbnailator
     */
    @PostMapping("/upload-image")
    public FileInfo uploadImage(MultipartFile file) {
        return fileStorageService.of(file)
                .image(img -> img.size(1000,1000))  //将图片大小调整到 1000*1000
                .thumbnail(th -> th.size(200,200))  //再生成一张 200*200 的缩略图
                .upload();
    }

    /**
     * 上传文件到指定存储平台，成功返回文件信息
     */
    @PostMapping("/upload-platform")
    public FileInfo uploadPlatform(MultipartFile file) {
        return fileStorageService.of(file)
                .setPlatform("aliyun-oss-1")    //使用指定的存储平台
                .upload();
    }

    /**
     * 直接读取 HttpServletRequest 中的文件进行上传，成功返回文件信息
     * 使用这种方式有些注意事项，请查看文档 基础功能-上传 章节
     */
    @PostMapping("/upload-request")
    public FileInfo uploadPlatform(HttpServletRequest request) {
        return fileStorageService.of(request).upload();
    }
}
```

#### 🎨 其它操作

```
//手动构造文件信息，可用于其它操作
FileInfo fileInfo = new FileInfo()
        .setPlatform("huawei-obs-1")
        .setBasePath("test/")
        .setPath("aa/")
        .setFilename("image.png")
        .setThFilename("image.png.min.jpg");

//文件是否存在
boolean exists = fileStorageService.exists(fileInfo);
//下载
byte[] bytes = fileStorageService.download(fileInfo).bytes();
//删除
fileStorageService.delete(fileInfo);
//其它更多操作

```

如果将文件记录保存到数据库中，还可以更方便的根据 URL 进行操作了，详情请阅读 保存上传记录 章节

```
//直接从数据库中获取 FileInfo 对象，更加方便执行其它操作
FileInfo fileInfo = fileStorageService.getFileInfoByUrl("https://abc.def.com/test/aa/image.png");

//文件是否存在
boolean exists = fileStorageService.exists("https://abc.def.com/test/aa/image.png");
//下载
byte[] bytes = fileStorageService.download("https://abc.def.com/test/aa/image.png").bytes();
//删除
fileStorageService.delete("https://abc.def.com/test/aa/image.png");
//其它更多操作
```

点击 快速入门 https://x-file-storage.xuyanwu.cn/ 查看全部存储平台的使用方法！

---
