---
sidebar_position: 1
title: 版本
sidebar_label: 版本
---

# 已发布版本

### v0.1.0 - 2023/12/29

[Release Notes](https://github.com/kubeagi/arcadia/releases/tag/v0.1.0)

* 数据集管理 - 对数据进行管理，包括本地上传、对接对象存储、数据编辑、版本控制、下载等
* 数据处理 - 数据清洗、文本拆分（文本分段、QA拆分）、文件标签
* 知识库 - 对处理后的数据进行向量化处理
* 模型管理 - 对模型进行生命周期管理
* 模型服务
  - 支持 CPU & GPU Model Serving
  - 支持 remote/local 两类模型推理服务，并关联知识库
  - 支持本地 Embedding 服务（bge，m3e）
  - 支持使用 vLLM 推理引擎
* 模型应用 - Prompt Engineering，初步实现 LLM 应用的编排能力，支持 Prompt、LLM/Retriever Chain节点的管理及编排，提供相关示例应用（基于 streamlit）
* 引导、示例场景 - 通过向导方式引导用户平台使用流程；内置 chat 示例应用
