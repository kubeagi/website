---
sidebar_position: 8
title: Vectorstores
sidebar_label: Vectorstores
---

VectorStore 是一个在 Kubernetes 上构建的自定义资源，用于管理向量化数据。它的主要用途是提供一种可扩展的、分布式的存储和管理向量数据的方式，也可以通过向量化匹配，判断对应数据的相似度。

* VectorStore 示例

```yaml
apiVersion: arcadia.kubeagi.k8s.com.cn/v1alpha1
kind: VectorStore
metadata:
  name: arcadia-vectorstore
  namespace: kubeagi-system
spec:
  chroma:
    distanceFunction: cosine
  description: 默认系统向量数据库
  displayName: 向量数据库
  endpoint:
    url: http://arcadia-chromadb:8000
```

