---
sidebar_position: 1
title: 数据处理
sidebar_label: 数据处理
---

数据处理用于通过 MinIO、数据库、Web API 等进行数据处理。处理的数据类型包括：
- txt
- json
- doc
- html
- excel
- csv
- pdf
- markdown
- ppt

### 支持文本处理方法

数据处理可支持各种方法，包括清理异常数据、过滤、重复数据删除和匿名化等。
## 设计

![Design](../../../../../static/img/data_process.drawio.png)

## 本地开发
### 软件要求

在建立本地数据处理环境之前，请确保安装了以下软件：

- Python 3.10.x

### 环境设置

安装 requirements.txt 文件中的 Python 依赖项。

### 运行

在 data_manipulation 目录中运行 server.py 文件。

# isort
isort 是一个用于按字母顺序排序 Python 代码中的导入语句的工具。它有助于保持一致和清晰的导入顺序。

## 安装
```shell
pip install isort
```

## isort 对文件进行排序
```shell
isort server.py
```

## isort 对目录进行排序
```shell
isort data_manipulation
```


# config.yml
## 开发阶段
config.yml 示例如下：
```yaml
minio:
  access_key: '${MINIO_ACCESSKEY: hpU4SCmj5jixxx}'
  secret_key: '${MINIO_SECRETKEY: xxx}'
  api_url: '${MINIO_API_URL: 172.22.96.136.nip.io}'
  secure: '${MINIO_SECURE: True}'
  dataset_prefix: '${MINIO_DATASET_PREFIX: dataset}'

zhipuai:
  api_key: '${ZHIPUAI_API_KEY: 871772ac03fcb9db9d4ce7b1e6eea27.VZZVy0mCox0WrzAG}'

llm:
  use_type: '${LLM_USE_TYPE: zhipuai_online}' # zhipuai_online or open_ai
  qa_retry_count: '${LLM_QA_RETRY_COUNT: 100}'

open_ai:
  key: '${OPEN_AI_DEFAULT_KEY: fake}'
  base_url: '${OPEN_AI_DEFAULT_BASE_URL: http://172.22.96.167.nip.io/v1/}'
  model: '${OPEN_AI_DEFAULT_MODEL_NAME: cb219b5f-8f3e-49e1-8d5b-f0c6da481186}'

knowledge:
  chunk_size: '${KNOWLEDGE_CHUNK_SIZE: 500}'
  chunk_overlap: '${KNOWLEDGE_CHUNK_OVERLAP: 50}'

backendPg:
  host: '${PG_HOST: localhost}'
  port: '${PG_PORT: 5432}'
  user: '${PG_USER: postgres}'
  password: '${PG_PASSWORD: 123456}'
  database: '${PG_DATABASE: arcadia}'
```

## 发布阶段
config.yml 示例如下：
```yaml
minio:
  access_key: hpU4SCmj5jixxx
  secret_key: xxx
  api_url: 172.22.96.136.nip.io
  secure: True
  dataset_prefix: dataset

zhipuai:
  api_key: 871772ac03fcb9db9d4ce7b1e6eea27.VZZVy0mCox0WrzAG

llm:
  use_type: zhipuai_online # zhipuai_online or open_ai
  qa_retry_count: 100

open_ai:
  key: fake
  base_url: http://172.22.96.167.nip.io/v1/
  model: cb219b5f-8f3e-49e1-8d5b-f0c6da481186

knowledge:
  chunk_size: 500
  chunk_overlap: 50

backendPg:
  host: localhost
  port: 5432
  user: admin
  password: 123456
  database: arcadia
```
在 K8s 中，可以使用配置映射指向 /arcadia_app/data_manipulation/config.yml 文件。
