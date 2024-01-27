---
sidebar_position: 1
title: 简介
sidebar_label: 简介
---
# Arcadia: 多样化、简单、安全的一站式 LLMOps 平台

## 什么是 Arcadia?

**Arcadia** 源于 [希腊神话](https://www.greekmythology.com/Myths/Places/Arcadia/arcadia.html)（一个宁静的田园地区，代表和谐、宁静和自然之美）。我们的目标是帮助每个人找到人类与人工智能之间更完美的融合。

为了实现这一目标，我们提供了一站式 LLMOps 解决方案：

- 数据集管理：存储/实时数据、多模态、预处理、矢量化
- 模型管理：本地/在线 LLM（开发、训练、部署）、推理加速
- 应用程序管理：利用可视化编辑器进行开发、优化和部署

此外，通过集成 [kubebb](https://github.com/kubebb)（一种 kubernetes 构建模块），我们可以在任何 kubernetes 集群上轻松托管**Arcadia**，为生产做好准备。


## 架构

我们的 Arcadia 设计和开发遵循操作员模式，扩展了 kubernetes API。

![Arch](./../../../../static/img/kubeagi.drawio.png)

## 快速开始

### 预先准备

1. [helm](https://helm.sh/docs/intro/install/)

2. [Kubernetes](https://kubernetes.io/)

如果没有 kubernetes 集群，可以调度一个 [kind cluster](https://kind.sigs.k8s.io/)。根据运行 LLM Worker 时对 CPU 或 GPU 的选择，您可以选择：

- [创建一个启用/禁用 GPU 的 Kubernetes 集群](./QuickStart/create-cluster-using-kind.md)


## CLI

我们提供了一个命令行工具 `arctl` 用于与 `arcadia` 交互。详情请参见 [这里](./tools/arctl-tool)。

- ✅ 数据源管理
- ✅ 本地数据集管理

## 纯 Go 编译工具链

为了增强 Golang 的AI能力，我们开发了一些软件包。以下是如何使用它们的示例。

- [chat_with_document](https://github.com/kubeagi/arcadia/tree/main/examples/chat_with_document): 一个聊天服务器，能够与文档进行交流
- [embedding](https://github.com/kubeagi/arcadia/tree/main/examples/embedding): 演示如何使用嵌入式服务将文档嵌入到向量存储
- [rbac](https://github.com/kubeagi/arcadia/blob/main/examples/rbac/main.go): 演示如何使用 AI 查询 RBAC 中的安全风险
- [zhipuai](https://github.com/kubeagi/arcadia/blob/main/examples/zhipuai/main.go): 演示如何使用智谱 [智谱客户端](https://github.com/kubeagi/arcadia/tree/main/pkg/llms/zhipuai)
- [dashscope](https://github.com/kubeagi/arcadia/blob/main/examples/dashscope/main.go): 演示如何使用 [dashscope 客户端](https://github.com/kubeagi/arcadia/tree/main/pkg/llms/dashscope) 与 qwen-7b-chat / qwen-14b-chat / llama2-7b-chat-v2 / llama2-13b-chat-v2 进行交流并使用嵌入式的 dashscope text-embedding-v1 / text-embedding-async-v1

### 大语言模型

- ✅ [智谱 AI](https://github.com/kubeagi/arcadia/tree/main/pkg/llms/zhipuai)
    - [例如](https://github.com/kubeagi/arcadia/blob/main/examples/zhipuai/main.go)
- ✅ [灵积模型服务](https://github.com/kubeagi/arcadia/tree/main/pkg/llms/dashscope)
    - [例如](https://github.com/kubeagi/arcadia/blob/main/examples/dashscope/main.go)

### 向量嵌入

> 完全兼容 [langchain embeddings](https://github.com/tmc/langchaingo/tree/main/embeddings)

- ✅ [智谱 AI 嵌入](https://github.com/kubeagi/arcadia/tree/main/pkg/embeddings/zhipuai)
- ✅ [灵积模型服务 text-embedding-v1(通用文本向量 同步接口)](https://help.aliyun.com/zh/dashscope/developer-reference/text-embedding-api-details)

### 向量存储

> 完全兼容 [langchain vectorstores](https://github.com/tmc/langchaingo/tree/main/vectorstores)

- ✅ [ChromaDB](https://docs.trychroma.com/)

## 贡献

如果您想为 Arcadia 做出贡献，请参考 [贡献指南](./Contribute/prepare-and-start.md)。

## 支持

如果需要支持，请从故障排除指南开始，或创建 GitHub [issues](https://github.com/kubeagi/arcadia/issues/new)。