---
title: Welcome MilvusPlus to join the community, vector database enhancement operation library
author: MilvusPlus
date: 2024-05-23
cover: /assets/img/news/MilvusPlus-0.png
head:
  - - meta
    - name: News
---

# MilvusPlus：Vector Database Enhanced Operations Library

## Project Profile

![](/assets/img/news/MilvusPlus-0.png)

MilvusPlus

>>🔥🔥🔥MilvusPlus (MP for short) is a Milvus operation tool designed to simplify the interaction with Milvus vector database, provide developers with intuitive API similar to MyBatis-Plus annotation and method calling style, and improve efficiency.

## Characteristics

* **No intrusion**: only do enhancement without change, the introduction of it will not affect the existing project, as smooth as silk

* **Small loss**: Basic CURD will be automatically injected when starting, with basically no loss in performance and direct object-oriented operation

* **Powerful CRUD operation **: Universal MilvusMapper, CRUD operation can be realized only through a small amount of configuration, and more powerful condition constructor to meet various use requirements

* **Support Lambda call **: Use Lambda expressions to easily write various query conditions without worrying about incorrect field writing.

* **Support automatic primary key generation**: Perfect solution to primary key problem

* **Support custom global common operations**: Supports global common method injection

* **Annotated configuration**: Configure the entity model by using annotations similar to MyBatis-Plus.

**Intuitive API**: Direct API design simplifies database operations.

**Easy to scale**: Core design focuses on extensibility.

**Type safety**: Reduce errors with Java type safety.
    

## Quick Start

Custom extension support:

```
<dependency>
    <groupId>io.github.javpower</groupId>
    <artifactId>milvus-plus-core</artifactId>
    <version>2.4.0-SNAPSHOT</version>
</dependency>
```

Spring application support:

```
<dependency>
    <groupId>io.github.javpower</groupId>
    <artifactId>milvus-plus-boot-starter</artifactId>
    <version>2.4.0-SNAPSHOT</version>
</dependency>
```

Solon application support:

```
<dependency>
    <groupId>io.github.javpower</groupId>
    <artifactId>milvus-plus-solon-plugin</artifactId>
    <version>2.4.0-SNAPSHOT</version>
</dependency>
```

## Profile

```
milvus:
  uri: https://in03-a5357975ab80da7.api.gcp-us-west1.zillizcloud.com
  token: x'x'x'x
  enable: true
  packages:
    - io.github.javpower.milvus.demo.model
```

* 'milvus': Defines the configuration related to the Milvus service.

* 'uri': The URI of the Milvus service through which the application communicates with the Milvus service.

* 'token': A token used for authentication and authorization to ensure the security of access to Milvus services.

* 'enable': A Boolean value that indicates whether the Milvus module should be enabled.

* 'packages': These packages contain Java classes for custom annotations.
  

## Application Scenarios

**Similarity Search**: Quickly retrieve the most similar item to a given vector.

*** recommend system **: recommend relevant content based on user behavior and preferences.

* **Image Retrieval**: Find the image that is most similar to the query image in a large-scale image library.

* **Natural Language Processing**: Convert text to vectors and perform semantic search.

**Bioinformatics**: Analyze and compare biological sequences, such as protein and genomic data.
    

## Custom annotation details

Automating Milvus database integration with custom annotations provides the following significant benefits:

* * **Simplify the development process **: directly declare the database structure in the code through annotations, instead of manually creating collections, attributes, indexes, and partitions. The project is automatically built when it is started, reducing the need to manually write Milvus API calls.

* **Improve development efficiency**: The annotation-driven approach makes the creation and management of the database structure faster and speeds up development.

* **Enhance code readability**: Closely integrate the database structure definition with the business logic code to improve the readability and maintainability of the code.

* **Reduce errors**: Automating the creation of the database structure reduces the possibility of human error and improves the stability of the system.

* **Easy to maintain**: The use of annotations makes changes to the database structure more centralized and clear, facilitating later maintenance and upgrades.
  

### @ ExtraParam Annotation

**Purpose**: Define additional parameters for indexing or other custom functions.

* **Properties * *:

* 'key()': the key name of the parameter.

* 'value()': the value of the parameter.


### @ MilvusCollection Annotation

**Purpose**: Defines a collection in the Milvus database.

* **Properties * *:

* 'name()': the name of the collection.


### @ MilvusField Annotation

**Purpose**: Defines the fields in the Milvus collection.

* **Properties * *:

* 'name()': field name, default to Java field name.

* 'dataType()': the data type. The default value is FLOAT_VECTOR'.

* 'dimension()': vector dimension. The default value is -1.

* 'isPrimaryKey()': indicates whether it is a primary key. The default value is false.

* 'autoID()': indicates whether to automatically generate an ID. The default value is false.

* 'description()': field description. It is empty by default.

* 'elementType()': the element type. The default value is 'None'.

* 'maxLength()': maximum length, default is -1.

* 'maxCapacity()': maximum capacity, default is -1.

* 'isPartitionKey()': indicates whether it is a partition key. The default value is false.


### @ MilvusIndex Annotation

**Purpose**: Defines an index in the Milvus collection.

* **Properties * *:

* 'indexType()': the index type. The default value is 'FLAT'.

* 'metricType()': the measurement type. The default value is 'L2'.

* 'indexName()': index name, empty by default.

* 'extraParams()': extra parameter, defined using the 'ExtraParam' annotation.


### @ MilvusPartition Annotation

**Purpose**: Defines the partition of the Milvus collection.

* **Properties * *:

* 'name()': an array of names of partitions.
  

With these annotations, developers can easily define and manage the structure of the Milvus database, achieving the goal of automatically building the required database structure at the start of the project.

## CRUD Module Introduction

The CRUD module is the basic set of operations used to process data in an application, namely Create, Read, Update, and Delete. In this module, we encapsulate the CRUD operations that interact with the Milvus database through the abstract class 'BaseMilvusMapper<T>', providing a 1 type of safe and easy-to-use interface.

### Abstract class 'BaseMilvusMapper'<T>'

'BaseMilvusMapper<T>'is an abstract class that implements the 'IAMService' interface and defines a series of methods for manipulating the Milvus database. This class is the base class for all the Mapper classes that interact with the Milvus database.

### Abstract method 'getClient()'

* **Function**: Returns a 'MilvusClientV2' instance for communication with the Milvus database.


### Method 'queryWrapper()'

* **Function**: Creates and returns a'LambdaQueryWrapper <T>'instance for building query operations.


### Method 'deleteWrapper()'

* **Function**: Creates and returns a 'LambdaDeleteWrapper<T>'instance to build a delete operation.


### Method 'updateWrapper()'

* **Function**: Create and return a'LambdaUpdateWrapper <T>'instance for building update operations.


### Method 'insertWrapper()'

* **Function**: Creates and returns a'LambdaInsertWrapper <T>'instance to build the insert operation.


### Method 'getById(Serializable ... ids)'

* **Function**: Query data based on the provided ID list.

* **Parameters**:'ids'-A serializable list of IDs.

* **Return**:'MilvusResp<List<MilvusResult<T >>> '-Response containing query results.


### Method 'removeById(Serializable ... ids)'

* **Function**: Delete data based on the provided ID list.

* **Parameters**:'ids'-A serializable list of IDs.

* **Return**:'MilvusResp<DeleteResp>'-the response of the delete operation.


### Method 'updateById(T ... entity)'

* **Function**: Update data based on the provided entity.

* **Parameters**:'entity'-a list of entity objects.

* **Return**:'MilvusResp<UpsertResp>'-the response of the update operation.


### Method 'insert(T ... entity)'

* **Feature**: inserts the provided entity into the database.

* **Parameters**:'entity'-a list of entity objects.

* **Return**:'MilvusResp<InsertResp>'-the response of the insert operation.


### Method 'lambda(Wrapper<W, T> wrapper)'

* **Function**: Create a general builder instance for different types of operations.

* **Parameters**:'wrapper'-a builder instance.

**Return**:'W'-Returns the builder instance.
    

### Process description

1. **Get client**: Use the 'getClient()'method to get the client that communicates with the Milvus database.

2. **Create Builder**: Use the 'queryWrapper()', 'deleteWrapper()', 'updateWrapper()', 'insertWrapper()' methods to create the corresponding action builder.

3. **Execute action**: Use the builder to build a specific CRUD action and execute it.

4. **Get Collection Name**: Get the collection name through the '@ MilvusCollection' annotation on the entity class.

5. **Initialize builder**: Use the 'lambda()'method to initialize the builder, setting the collection name, client, conversion cache, and entity type.


### Advantages

* **Type safety**: Use the generic 'T' to ensure data type consistency of operations.

**Simplify operations**: Encapsulates CRUD operations to simplify code writing and database interaction.

* **Easy to extend**: The abstract class design makes it easy to extend new operations or custom behaviors.

* **Annotation-driven**: Use the '@ MilvusCollection' annotation to automatically obtain the collection name to reduce hard coding.

Through the 'BaseMilvusMapper<T>'class, developers can easily interact with the Milvus database, improve development efficiency and reduce error rates.

## IAMService interface module introduction

The 'IAMService' interface module provides a complete set of Identity and Access Management (IAM) functions for managing roles, users, and permissions in the Milvus database. This module allows developers to perform operations such as creation, query, deletion, permission grant and revocation of users and roles through simple method calls.

### Method 'getClient()'

* **Function**: Obtain the 'MilvusClientV2' instance to communicate with the Milvus service.


### Default method 'createRole(String roleName)'

**Feature**: Create a new role.

* **Parameters**:'roleName'-the name of the role to be created.


### Default method 'createUser(String userName, String password)'

**Feature**: Create a new user.

* **Parameters * *:

* 'userName'-The name of the user to be created.

* 'password'-the user's password.


### Default method 'describeRole(String roleName)'

**Feature**: You can call this operation to obtain the permissions of a specified role.

* **Parameter**:'roleName'-the name of the role to be queried.

* **Return**:'DescribeRoleResp'-The object that contains the role permission information.


### Default method 'describeUser(String userName)'

* **Feature**: You can call this operation to obtain detailed information about a specified user.

* **Parameter**:'userName'-the name of the user to be queried.

* **Return**:'DescribeUserResp'-An object that contains user details.


### Default method 'dropRole(String roleName)'

* **Feature**: Deletes the specified custom role.

* **Parameters**:'roleName'-the name of the role to be deleted.


### Default method 'dropUser(String userName)'

* **Feature**: Deletes the specified user.

* **Parameter**:'userName'-the user name to be deleted.


### Default method 'grantPrivilege(String roleName, String objectType, String privilege, String objectName)'

**Feature**: Grant specific permissions to the role.

* **Parameters * *:

* 'roleName'-the name of the role to grant permissions.

* 'objectType'-The type of the permission object.

* 'privilege'-the name of the permission to be granted.

* 'objectName'-the name of the object to which the permission applies.

### Default method 'grantRole(String roleName, String userName)'

* **Function**: grants the user a specific role.

* **Parameters * *:

* 'roleName'-The role name to grant to the user.

* 'userName'-existing user name.


### Default method 'listRoles()'

**Feature**: Lists all custom roles.

**Return**: List of role names.


### Default method 'listUsers()'

**Feature**: Lists the usernames of all existing users.

**Return**: List of user names.


### Default method 'revikePrivilege (String roleName, String objectType, String privilege, String objectName, String databaseName)'

**Function**: Revokes the permissions assigned to the role.

* **Parameters * *:

* 'roleName'-the name of the role from which the permission is to be revoked.

* 'objectType'-The type of the permission object.

* 'privilege'-the name of the permission to be revoked.

* 'objectName'-The name of the API whose permissions you want to revoke.

* 'databaseName'-optional database name.


### Default method 'revokeRole(String roleName, String userName)'

* **Function**: revokes the user's role.

* **Parameters * *:

* 'roleName'-the name of the role to be revoked.

* 'userName'-the username of an existing user.


### Default method 'updatePassword(String userName, String password, String newPassword)'

* **Feature**: Updates the password of a specified user.

* **Parameters * *:

* 'userName'-the username of an existing user.

* 'password'-the current password of the user.

* 'newPassword'-new password for the user.
  

### Advantages

* **Simplified management**: Simplified management of users and roles through a unified interface.

* **Type safety**: The interface method uses clear parameter types to reduce errors.

* **Easy to integrate**: The default method makes implementation details easy to integrate into existing systems.

* **Fine-grained control**: Supports fine-grained permission control to enhance security.

* **Exception Handling**: The method includes an exception handling mechanism to ensure the stability of the operation.


The 'IAMService' interface module is the foundation for building a secure, reliable and easy-to-manage Milvus database access control system.

## Conditional constructor

The condition constructor module is an abstract base class 'ConditionBuilder<T>'for dynamically building query conditions'. It provides a rich set of methods to generate a variety of query conditions, thereby simplifying the construction of database queries.

### Functional Overview

* **Dynamic Attribute Mapping**: Automatically maps entity object attributes to query conditions.

* **Multiple conditions are supported**: equals, not equal, greater than, less than, range, null check, IN condition, LIKE condition, etc.

* **Logical operation**: supports AND, OR, and NOT logical operations to construct complex query conditions.

* **Type safety**: The generic 'T' ensures type safety during conditional construction.

* **Easy to extend**: The abstract class design allows developers to extend more conditional construction functions as needed.


### Main methods

### 'getPropertiesMap(T t)'

* **Function**: Maps the attributes and values of an entity object to a map.


### Basic condition method

* 'eq', 'ne', 'gt', 'ge', 'lt', 'le': used to add equal to, not equal to, greater than, greater than or equal to, less than, less than or equal to conditions respectively.


### Range and null check

* 'between': Add a range condition.

* 'isNull', 'isNotNull': Add a null value check condition.


### IN and LIKE conditions

* 'in': Add IN condition, used to match whether the field value is in the given list.

* 'like': Add a LIKE condition to perform a pattern matching query.


### JSON and array operations

* 'jsonContains', 'jsonContainsAll', 'jsonContainsAny': used to process the inclusion check of JSON fields.

* 'arrayContains', 'arrayContainsAll', 'arrayContainsAny': used to check the inclusion of array fields.

* 'arrayLength': Check the length of the array field.


### Logical operation

* 'and', 'or', 'not': Used to combine multiple condition constructor objects and perform logical AND, OR, and NOT operations.


### Auxiliary method

* 'convertValue', 'convertValues': Used to convert the value to a format suitable for the query.

* 'wrapFieldName': used to wrap the field name, which may need to be adjusted according to the specific query language.


### Abstract Methods

* 'buildFilters': the specific filter string construction logic that needs to be implemented by the subclass.
  

### Use Example

```
ConditionBuilder<MyEntity> builder = new ConditionBuilder<>();
builder.eq("name", "John").gt("age", 18).and(new ConditionBuilder<MyEntity>().like("email", "example.com"));
String filters = builder.buildFilters();
```

## Detailed explanation of index and measurement types

### Index Type (IndexType)

* **INVALID**: Invalid index type, only for internal tags.

* **FLAT**: Brute force search for small datasets.

* **IVF\_FLAT**: Inverted index flat mode, suitable for medium-sized data sets.

* **IVF\_SQ8**: Inverted index quantization mode, suitable for large-scale data sets, sacrificing accuracy to improve speed.

* **IVF\_PQ**: Inverted index product quantization mode, suitable for large-scale high-dimensional data sets, balancing speed and accuracy.

* **HNSW**: Hierarchical navigation small-world graph, which provides fast search and is suitable for large-scale data sets.

**DISKANN**: Disk-based approximate nearest neighbor search for large-scale data sets stored on disks.

* **AUTOINDEX**: Automatically selects the optimal index type.

* **SCANN**: Speeds up the search using scans and tree structures.

* **GPU\_IVF\_FLAT, GPU\_IVF\_PQ**:GPU-accelerated indexes for GPU environments.

* **BIN\_FLAT, BIN\_IVF\_FLAT**: Binary vector-specific index.

* **TRIE**: applies to the dictionary tree index of the string type.

* **STL\_SORT**: Sorting index for scalar fields.


### Metric Type (MetricType)

**INVALID**: Invalid metric type, only for internal tags.

* **L2**: Euclidean distance, for floating-point vectors.

* **IP**: inner product, used to calculate the cosine similarity.

* **COSINE**: Cosine similarity, suitable for text and image search.

**HAMMING**: Hamming distance for binary vectors.

* **JACCARD**: Jakard similarity coefficient, suitable for set similarity calculation.
  

## Use Case

The following is an example of a vector search using MilvusPlus:

```
@Data
@MilvusCollection(name = "face_collection") // 指定Milvus集合的名称
public class Face {
    @MilvusField(
            name = "person_id", // 字段名称
            dataType = DataType.Int64, // 数据类型为64位整数
            isPrimaryKey = true, // 标记为主键
    )
    private Long personId; // 人员的唯一标识符

    @MilvusField(
            name = "face_vector", // 字段名称
            dataType = DataType.FloatVector, // 数据类型为浮点型向量
            dimension = 128, // 向量维度，假设人脸特征向量的维度是128
    )
    @MilvusIndex(
            indexType = IndexParam.IndexType.IVF_FLAT, // 使用IVF_FLAT索引类型
            metricType = IndexParam.MetricType.L2, // 使用L2距离度量类型
            indexName = "face_index", // 索引名称
            extraParams = { // 指定额外的索引参数
                    @ExtraParam(key = "nlist", value = "100") // 例如，IVF的nlist参数
            }
    )
    private List<Float> faceVector; // 存储人脸特征的向量
}
@Component
public class FaceMilvusMapper extends MilvusMapper<Face> {
    
}

@Component
@Slf4j
public class ApplicationRunnerTest implements ApplicationRunner {
    private final FaceMilvusMapper mapper;

    public ApplicationRunnerTest(FaceMilvusMapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public void run(ApplicationArguments args){
        Face face=new Face();
        List<Float> vector = new ArrayList<>();
        for (int i = 0; i < 128; i++) {
            vector.add((float) (Math.random() * 100)); // 这里仅作为示例使用随机数
        }
        face.setPersonId(1l);
        face.setFaceVector(vector);
        //新增
        List<Face> faces=new ArrayList<>();
        for (int i = 1; i < 10 ;i++){
            Face face1=new Face();
            face1.setPersonId(Long.valueOf(i));
            List<Float> vector1 = new ArrayList<>();
            for (int j = 0; j < 128; j++) {
                vector1.add((float) (Math.random() * 100)); // 这里仅作为示例使用随机数
            }
            face1.setFaceVector(vector1);
            faces.add(face1);
        }
        MilvusResp<InsertResp> insert = mapper.insert(faces.toArray(faces.toArray(new Face[0]))); log.info("insert--{}", JSONObject.toJSONString(insert));
        //id查询
        MilvusResp<List<MilvusResult<Face>>> query = mapper.getById(9l);
        log.info("query--getById---{}", JSONObject.toJSONString(query));
        //向量查询
        MilvusResp<List<MilvusResult<Face>>> query1 = mapper.queryWrapper()
                .vector(Face::getFaceVector, vector)
                .ne(Face::getPersonId, 1L)
                .topK(3)
                .query();
        log.info("向量查询 query--queryWrapper---{}", JSONObject.toJSONString(query1));
        //标量查询
        MilvusResp<List<MilvusResult<Face>>> query2 = mapper.queryWrapper()
                .eq(Face::getPersonId, 2L)
                .limit(3)
                .query();
        log.info("标量查询   query--queryWrapper---{}", JSONObject.toJSONString(query2));
        //更新
        vector.clear();
        for (int i = 0; i < 128; i++) {
            vector.add((float) (Math.random() * 100)); // 这里仅作为示例使用随机数
        }
        MilvusResp<UpsertResp> update = mapper.updateById(face);log.info("update--{}", JSONObject.toJSONString(update));
        //id查询
        MilvusResp<List<MilvusResult<Face>>> query3 = mapper.getById(1L);log.info("query--getById---{}", JSONObject.toJSONString(query3));
        //删除
        MilvusResp<DeleteResp> remove = mapper.removeById(1L);log.info("remove--{}", JSONObject.toJSONString(remove));
        //查询
        MilvusResp<List<MilvusResult<Face>>> query4 = mapper.getById(1L);log.info("query--{}", JSONObject.toJSONString(query4));

    }
}
```

## Welcome to praise the project！！

**https://gitee.com/dromara/MilvusPlus**