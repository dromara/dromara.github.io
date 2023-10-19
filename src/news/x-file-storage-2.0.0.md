---
title: Welcome X File Storage to join dromara open source community, one-stop file storage
author: XuYanwu
tag:
  - X-File-Storage
date: 2023-10-19
cover: /assets/img/logo/X-File-Storage.png
head:
  - - meta
    - name: News
---

<h3 align="center">
	<img src="https://x-file-storage.xuyanwu.cn/assets/logo.svg" height="200px"  alt="logo"/><br />
	<span>Originally known as X Spring File Storage, it has been donated to the <a target="_blank" href="https://dromara.org/zh">dromara</a> open source organization</span>
</h3>

# 📚Summary

One line of code stores files locally, FTP, SFTP, WebDAV, Alibaba Cloud OSS, Huawei Cloud OBS, Qiniu Cloud Kodo, Tencent Cloud COS, Baidu Cloud BOS, Youpai Cloud USS, MinIO,
Amazon S3, Google Cloud Storage, Kingsoft Cloud KS3, Meituan Cloud MSS, JD Cloud OSS, Tianyi Cloud OOS, Mobile Cloud EOS, Woyun OSS,
NetEase Shufan NOS, Ucloud US3, Qingyun QingStor, Ping An Cloud OBS, Shouyun OSS, IBM COS, and other storage platforms compatible with the S3 protocol. View [all supported storage platforms](https://x-file-storage.xuyanwu.cn/#/存储平台)

💡 After connecting to Alist through WebDAV, you can use common storage services such as Baidu Cloud Disk, Tianyi Cloud Disk, Alibaba Cloud Disk, and Thunder Cloud Disk. Check [Storage Platforms Supported by Alist](https://alist-doc.nn.ci/docs/webdav)

GitHub：https://github.com/dromara/x-file-storage
Gitee：https://gitee.com/dromara/x-file-storage

Document1：https://x-file-storage.dromara.org
Document2：https://x-file-storage.xuyanwu.cn
Document3：https://spring-file-storage.xuyanwu.cn

-------

# 📜UpdateContent

- Change project name, change package name, optimize project structure
- Added the ability to directly read the HttpServletRequest stream for uploading, so the file does not fall to disk and is faster
- Added support for Metadata
- Optimize ACL exception handling
- Optimize file deletion logic
- Fixed the issue of ResetException occasionally occurring when uploading files to Amazon S3
- Donate to [dromara](https://dromara.org/zh) open source community

#### Changes in project dependencies

Versions before 2.0.0

```xml
<dependency>
    <groupId>cn.xuyanwu</groupId>
    <artifactId>spring-file-storage</artifactId>
    <version>1.0.3</version>
</dependency>
```  

2.0.0 and later versions

```xml
<dependency>
    <groupId>org.dromara.x-file-storage</groupId>
    <artifactId>x-file-storage-spring</artifactId>
    <version>2.0.0</version>
</dependency>
```

#### Changes in configuration parameters

Versions before 2.0.0

```yaml
spring:
  file-storage: #File storage configuration
    default-platform: huawei-obs-1 #Default storage platform used
    thumbnail-suffix: ".min.jpg" #Thumbnail suffix, such as [.min.jpg] [.png]
    #The configuration of the corresponding platform is written here, pay attention to the indentation to be aligned
```

2.0.0 and later versions

```yaml
dromara:
  x-file-storage: #File storage configuration
    default-platform: huawei-obs-1 #Default storage platform used
    thumbnail-suffix: ".min.jpg" #Thumbnail suffix, such as [.min.jpg] [.png]
    #The configuration of the corresponding platform is written here, pay attention to the indentation to be aligned
```

#### Changes in package name

Versions before 2.0.0

```java
cn.xuyanwu.spring.file.storage
cn.xuyanwu.spring.file.storage.spring
```

2.0.0 and later versions

```java
org.dromara.x.file.storage.core
org.dromara.x.file.storage.spring
```

-------

# 📦Use

Click [Quick Start](https://x-file-storage.xuyanwu.cn/#/快速入门) to view how to use all storage platforms!

#### 🔧 Configuration

Here we take Alibaba Cloud OSS as an example. `pom.xml` is introduced into this project. The default here is the `SpringBoot` environment. For other environments, please refer to [Use alone without SpringBoot](https://x-file-storage.xuyanwu.cn/#/脱离SpringBoot单独使用)
```xml
<!--Introduce this project -->
<dependency>
    <groupId>org.dromara.x-file-storage</groupId>
    <artifactId>x-file-storage-spring</artifactId>
    <version>2.0.0</version>
</dependency>
<!--Introduce Alibaba Cloud OSS SDK. If you use other storage platforms, introduce the corresponding SDK -->
<dependency>
    <groupId>com.aliyun.oss</groupId>
    <artifactId>aliyun-sdk-oss</artifactId>
    <version>3.16.1</version>
</dependency>
```

Add the following basic configuration to the `application.yml` configuration file

```yaml
dromara:
  x-file-storage: #File storage configuration
    default-platform: aliyun-oss-1 #Default storage platform
    aliyun-oss:
      - platform: aliyun-oss-1 # Storage platform identification
        enable-storage: true # Enable storage
        access-key: ??
        secret-key: ??
        end-point: ??
        bucket-name: ??
        domain: ?? # Access the domain name, pay attention to the "/" ending, for example: https://abc.oss-cn-shanghai.aliyuncs.com/
        base-path: test/ # base path
```

#### 🔨Encoding

Add the `@EnableFileStorage` annotation to the startup class

```java
@EnableFileStorage
@SpringBootApplication
public class SpringFileStorageTestApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringFileStorageTestApplication.class,args);
    }

}
```
#### ✨Start uploading

Supports File, MultipartFile, byte[], InputStream, URL, URI, String, HttpServletRequest, and large files will be automatically uploaded in parts. If you want to support more methods, please read the [File Adapter](https://x-file-storage.xuyanwu.cn/#/文件适配器) chapter

```java
@RestController
public class FileDetailController {

    @Autowired
    private FileStorageService fileStorageService;//注入实列

    /**
     * upload files
     */
    @PostMapping("/upload")
    public FileInfo upload(MultipartFile file) {
        //Only this line of code is needed to upload successfully
        return fileStorageService.of(file).upload();
    }
    
    /**
     * Upload the file and return the file url successfully
     */
    @PostMapping("/upload2")
    public String upload2(MultipartFile file) {
        FileInfo fileInfo = fileStorageService.of(file)
                .setPath("upload/") //Save to a relative path. For the convenience of management, you don’t need to write it.
                .setObjectId("0") //Associated object id. For the convenience of management, you don’t need to write it.
                .setObjectType("0") //Associated object type. For convenience of management, you don’t need to write it.
                .putAttr("role","admin") //Save some attributes, which can be obtained and used in aspects, saved upload records, customized storage platforms, etc. You don't need to write them
                .upload(); //Upload the file to the corresponding place
        return fileInfo == null ? "Upload failed!" : fileInfo.getUrl();
    }

    /**
     * Upload pictures and return file information successfully
     *Image processing uses https://github.com/coobird/thumbnailator
     */
    @PostMapping("/upload-image")
    public FileInfo uploadImage(MultipartFile file) {
        return fileStorageService.of(file)
                .image(img -> img.size(1000,1000)) //Adjust the image size to 1000*1000
                .thumbnail(th -> th.size(200,200)) //Generate a 200*200 thumbnail
                .upload();
    }

    /**
     * Upload files to the designated storage platform and return file information successfully
     */
    @PostMapping("/upload-platform")
    public FileInfo uploadPlatform(MultipartFile file) {
        return fileStorageService.of(file)
                .setPlatform("aliyun-oss-1") //Use the specified storage platform
                .upload();
    }

    /**
     * Directly read the file in HttpServletRequest for upload, and successfully return the file information
     * There are some precautions when using this method. Please check the Basic Functions-Upload chapter of the document.
     */
    @PostMapping("/upload-request")
    public FileInfo uploadPlatform(HttpServletRequest request) {
        return fileStorageService.of(request).upload();
    }
}
```

#### 🎨Other operations

```java
//Manually construct file information, which can be used for other operations
FileInfo fileInfo = new FileInfo()
        .setPlatform("huawei-obs-1")
        .setBasePath("test/")
        .setPath("aa/")
        .setFilename("image.png")
        .setThFilename("image.png.min.jpg");

//Does the file exist?
boolean exists = fileStorageService.exists(fileInfo);
//download
byte[] bytes = fileStorageService.download(fileInfo).bytes();
//delete
fileStorageService.delete(fileInfo);
//Other more operations

```

If you save file records to the database, you can also operate based on the URL more conveniently. For details, please read [Save Upload Records](https://x-file-storage.xuyanwu.cn/#/基础功能?id=保存上传记录) Chapter

```java
//Get the FileInfo object directly from the database, making it easier to perform other operations
FileInfo fileInfo = fileStorageService.getFileInfoByUrl("https://abc.def.com/test/aa/image.png");

//Does the file exist?
boolean exists = fileStorageService.exists("https://abc.def.com/test/aa/image.png");
//download
byte[] bytes = fileStorageService.download("https://abc.def.com/test/aa/image.png").bytes();
//delete
fileStorageService.delete("https://abc.def.com/test/aa/image.png");
//Other more operations
```

Click [Quick Start](https://x-file-storage.xuyanwu.cn/#/快速入门) to view how to use all storage platforms!
