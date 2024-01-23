---
sidebar_position: 2
title: 数据源
sidebar_label: 数据源
---

数据源用于管理和查看平台数据源。作为 LLMOps 的统一数据入口，训练数据、测试数据和知识库文件等数据必须优先连接到数据源，以供其他模块参考。

数据源支持对象存储(OSS)、MySQL、MongoDB、数据 API 等。

通过定义 CRD Datasource 来实现对数据源的管理。数据源提供数据访问能力，从而在构建Arcadia数据集，选择数据集文件时，提供数据文件的列表查询和数据文件下载能力。

### 数据源分类
按照数据源本身的类型可分为两大类:
* 存储数据源，包括对象存储(OSS)、关系型数据库(Mysql，Postgresql)、非关系型数据库(Mongodb)等
* 实时数据源，包括 GoogleSearch、OpenAPI 等

按照数据源本身的服务来源分为两大类:
* 系统数据源: 数据来源于 Arcadia 内部，默认采用 Minio(OSS) 对象存储
* 第三方数据源: 数据由第三方数据服务提供，由用户自行部署或获取的数据源服务

单个项目（命名空间）对应一个 bucket，每个 bucket 默认包含两个子目录：
* dataset: 用于存储数据集文件
* model: 用于存储模型文件

MinIO 中按项目存储的结构如下图所示: 

![](../Concepts/images/2024-01-05-15-01-34.png)
