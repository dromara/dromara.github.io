---
title: One-stop file storage X File Storage released version 2.2.0, updating a large amount of content and adding Solon plug-in
author: X File Storage
date: 2024-07-03
cover: /assets/img/news/x-file-storage-2.2.0-0.svg
head:
  - - meta
    - name: News
---

### ![](/assets/img/news/x-file-storage-2.2.0-0.svg)  
The X Spring File Storage is now donated to dromara open source organizations.

x-file-storage.dromara.org | x-file-storage.xuyanwu.cn | spring-file-storage.xuyanwu.cn

# 📚Introduction

One line of code stores files to local, FTP, SFTP, WebDAV, Aliyun OSS, Huawei Cloud OBS, Qiniu Cloud Kodo, Tengxun Cloud COS, Baidu Cloud BOS, Youpai Cloud USS, MinIO, Amazon S3, GoogleCloud Storage, FastDFS, Azure Blob Storage, Cloudflare R2, Jinshan Cloud KS3, Meituan Cloud MSS, jingdong cloud OSS, Tianyi Cloud OOS, Mobile Netease Cloud EOS, Woyun OSS number of sails NOS, Ucloud US3, Qingyun QingStor, Ping An Cloud OBS, First Cloud OSS, IBM COS, and other S3 protocol-compatible storage platforms. View all supported storage platforms

💡After connecting to Alist through WebDAV, you can use common storage services such as Baidu Network Disk, Tianyi Cloud Disk, Ali Cloud Disk, and Xunlei Network Disk to view the storage platforms supported by Alist.

🚚You can migrate files between different storage platforms. For more information, see the migration file.

GitHub:https://github.com/dromara/x-file-storage Gitee:https://gitee.com/dromara/x-file-storage

Document 1:https://x-file-storage.dromara.org Document 2:https://x-file-storage.xuyanwu.cn Document 3:https://spring-file-storage.xuyanwu.cn
* * *

# 📜Update Content

* Added acquisition file

* Added enumerated documents

* Refactoring pre-signed URL supports client upload, download, delete and other operations

* Added Solon plug-in, can be more convenient to use in Solon

* Upgrading the Hutool version

* Optimization of manual multipart upload and increased support for GoogleCloud Storage

* Optimized thumbnail exception handling

* Optimized code structure

* Fix hash value consistency in sharding scenarios

* Fix occasional errors in Minio multipart upload

* Fix the problem that static resource access to local storage does not take effect.
* ...

# 📦Use

Click Quick Start to see how to use all storage platforms!

#### 🔧Configuration

Take Alibaba Cloud OSS as an example. 'pom.xml' is introduced into this project. The default environment is 'SpringBoot'. Other environments can be used separately from the SpringBoot.

```
<!-- 引入本项目 -->
<dependency>
    <groupId>org.dromara.x-file-storage</groupId>
    <artifactId>x-file-storage-spring</artifactId>
    <version>2.2.0</version>
</dependency>
<!-- 引入 阿里云 OSS SDK，如果使用其它存储平台，就引入对应的 SDK  -->
<dependency>
    <groupId>com.aliyun.oss</groupId>
    <artifactId>aliyun-sdk-oss</artifactId>
    <version>3.16.1</version>
</dependency>
```

`application.yml` Add the following basic configuration to the configuration file

```
dromara:
  x-file-storage: #文件存储配置
    default-platform: aliyun-oss-1 #默认使用的存储平台
    aliyun-oss:
      - platform: aliyun-oss-1 # 存储平台标识
        enable-storage: true  # 启用存储
        access-key: ??
        secret-key: ??
        end-point: ??
        bucket-name: ??
        domain: ?? # 访问域名，注意“/”结尾，例如：https://abc.oss-cn-shanghai.aliyuncs.com/
        base-path: test/ # 基础路径
```

#### 🔨Encoding

Add the '@ EnableFileStorage' annotation to the startup class

```
@EnableFileStorage
@SpringBootApplication
public class SpringFileStorageTestApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringFileStorageTestApplication.class,args);
    }

}
```

#### ✨Start Upload

File, MultipartFile, byte, InputStream, URL, URI, String, and HttpServletRequest are supported. Large files are automatically uploaded in parts. If you want to support more ways, please read the file adapter chapter.

```
@RestController
public class FileDetailController {

    @Autowired
    private FileStorageService fileStorageService;//注入实列

    /**
     * 上传文件
     */
    @PostMapping("/upload")
    public FileInfo upload(MultipartFile file) {
        //只需要这一行代码即可上传成功
        return fileStorageService.of(file).upload();
    }
    
    /**
     * 上传文件，成功返回文件 url
     */
    @PostMapping("/upload2")
    public String upload2(MultipartFile file) {
        FileInfo fileInfo = fileStorageService.of(file)
                .setPath("upload/") //保存到相对路径下，为了方便管理，不需要可以不写
                .setObjectId("0")   //关联对象id，为了方便管理，不需要可以不写
                .setObjectType("0") //关联对象类型，为了方便管理，不需要可以不写
                .putAttr("role","admin") //保存一些属性，可以在切面、保存上传记录、自定义存储平台等地方获取使用，不需要可以不写
                .upload();  //将文件上传到对应地方
        return fileInfo == null ? "上传失败！" : fileInfo.getUrl();
    }

    /**
     * 上传图片，成功返回文件信息
     * 图片处理使用的是 https://github.com/coobird/thumbnailator
     */
    @PostMapping("/upload-image")
    public FileInfo uploadImage(MultipartFile file) {
        return fileStorageService.of(file)
                .image(img -> img.size(1000,1000))  //将图片大小调整到 1000*1000
                .thumbnail(th -> th.size(200,200))  //再生成一张 200*200 的缩略图
                .upload();
    }

    /**
     * 上传文件到指定存储平台，成功返回文件信息
     */
    @PostMapping("/upload-platform")
    public FileInfo uploadPlatform(MultipartFile file) {
        return fileStorageService.of(file)
                .setPlatform("aliyun-oss-1")    //使用指定的存储平台
                .upload();
    }

    /**
     * 直接读取 HttpServletRequest 中的文件进行上传，成功返回文件信息
     * 使用这种方式有些注意事项，请查看文档 基础功能-上传 章节
     */
    @PostMapping("/upload-request")
    public FileInfo uploadPlatform(HttpServletRequest request) {
        return fileStorageService.of(request).upload();
    }
}
```

#### 🎨Other operations

```
//手动构造文件信息，可用于其它操作
FileInfo fileInfo = new FileInfo()
        .setPlatform("huawei-obs-1")
        .setBasePath("test/")
        .setPath("aa/")
        .setFilename("image.png")
        .setThFilename("image.png.min.jpg");

//文件是否存在
boolean exists = fileStorageService.exists(fileInfo);
//下载
byte[] bytes = fileStorageService.download(fileInfo).bytes();
//删除
fileStorageService.delete(fileInfo);
//其它更多操作

```

If the file record is saved to the database, it can be more convenient to operate according to the URL. For details, please read the section on saving the upload record.

```
//直接从数据库中获取 FileInfo 对象，更加方便执行其它操作
FileInfo fileInfo = fileStorageService.getFileInfoByUrl("https://abc.def.com/test/aa/image.png");

//文件是否存在
boolean exists = fileStorageService.exists("https://abc.def.com/test/aa/image.png");
//下载
byte[] bytes = fileStorageService.download("https://abc.def.com/test/aa/image.png").bytes();
//删除
fileStorageService.delete("https://abc.def.com/test/aa/image.png");
//其它更多操作
```

Click the Quick Start https://x-file-storage.xuyanwu.cn to see how to use all storage platforms!

* * *

  

About Dromara

Dromara is an open source community composed of top domestic open source project authors. It provides a series of open source products, solutions and consulting, technical support and training certification services, including distributed transactions, popular tools, enterprise-level authentication, microservice RPC, operation and maintenance monitoring, Agent monitoring, distributed logging, scheduling and orchestration. The technology stack is fully open-source and community-neutral, and is committed to providing microservice cloud-native solutions for global users. Let every 1 open source enthusiasts participate in the joy of open source.



Dromara open source community currently has 10 GVP projects, with a total number of star exceeding 100,000. It has built an open source community of tens of thousands of people, and thousands of individuals and teams are using the open source projects of Dromara community.

**Welcome to the knowledge planet and I interact * *

![](/assets/img/news/x-file-storage-2.2.0-1.webp)