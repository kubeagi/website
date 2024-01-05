---
sidebar_position: 3
title: Datasets and VersionedDatasets
sidebar_label: Datasets and VersionedDatasets
---

Datasets is unified management of available data, including training data sets, knowledge base data sets, etc. Supports independent version iteration, data viewing, and data update.

## 简介
数据集代表用户纳管的一组相关属性的文件，采用相同的方式进行数据处理，并用于后续的模型训练、知识库等数据的管理。

### 相关功能
* 支持多种类型数据:
    - 文本
    - 图片
    - 视频
* 单个数据集仅允许包含同一类型文件，不同类型文件将被忽略
* 数据集允许有多个版本，数据处理针对单个版本进行
* 数据集某个版本完成数据处理后，数据处理服务需要将处理后的存储回 ```版本数据集```


## 资源抽象
通过两个CRD来实现数据集管理能力: 
* CRD Dataset: 定义数据集全局参数，如:
    - 数据集数据类型
    - 应用场景
    - 创建者
    - 展示名
* CRD VersionedDataset: 定义版本相关的参数，如
    - 数据集
    - 版本号
    - 版本数据集下纳管的文件列表

数据集数据存储在系统数据源中，存储结构如下:
![](./images/2024-01-05-15-10-23.png)

## 功能实现

### 一. 文件上传
文件上传分为4个步骤
1. 调用 get_chunks 获取已经上传的块。如果是新的文件，返回值uploadid是空字符串，否则会有值。
2. 如果第一部返回的uploadid是空，需要调用new_multipart，获取uploadid
3. 根据得到uploadid调用get_multipart_url获取每个分块的上传url
4. 得到url后，直接 PUT，body就是文件的内容进行上传。
5. 每个分块都上传完成后，调用complete_multipart让后端完成分块的合并。
6. 调用u pdate_chunk, 更新后端存储的上传进度。
