---
sidebar_position: 7
title: Embedders
sidebar_label: Embedders
---

Embedder 模型服务用于将输入数据转换为更高维度、更有表现力的嵌入向量。这些嵌入向量可以捕捉输入数据的语义和语法特征，从而为后续的任务和模型提供更好的表示。

Embedder 服务目前主要用在两个地方：
* 将 Q/A 进行向量化，生成知识库
* 在会话、支持库模型应用中，将用户提出的问题进行向量化

Embedder 服务定义示例：
```yaml
apiVersion: arcadia.kubeagi.k8s.com.cn/v1alpha1
kind: Embedder
metadata:
  name: qwen-7b
  namespace: kubeagi-test
spec:
  creator: admin
  description: qwen-7b
  displayName: qwen-7b
  provider:
    worker:
      kind: Worker
      name: qwen-7b
      namespace: kubeagi-test
  type: openai
```
