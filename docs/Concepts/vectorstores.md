---
sidebar_position: 8
title: Vectorstores
sidebar_label: Vectorstores
---

VectorStore is a custom resource built on Kubernetes to manage vectorised data. Its main use is to provide a scalable, distributed way of storing and managing vector data, and also to determine the similarity of corresponding data through vectorised matching.

* An example of VectorStore:

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

