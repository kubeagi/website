---
sidebar_position: 9
title: 知识库
sidebar_label: 知识库
---

知识库（Knowledgebases）提供构建私有领域文档和知识管理的能力，支持多种数据类型，并允许将数据文件上传到矢量数据库中。

```yaml
apiVersion: arcadia.kubeagi.k8s.com.cn/v1alpha1
kind: KnowledgeBase
metadata:
  name: kaoqin-bge-qwen-kb
  namespace: kubeagi-test
spec:
  description: kaoqin-bge-qwen-kb
  displayName: kaoqin-bge-qwen-kb
  embedder:
    kind: Embedder
    name: bge-large-zh
    namespace: kubeagi-test
  fileGroups:
  - paths:
    - 员工考勤管理制度-2023_final.csv
    source:
      kind: VersionedDataset
      name: kaoqin-bge-qwen-dataset-v1
      namespace: kubeagi-test
  vectorStore:
    apiGroup: arcadia.kubeagi.k8s.com.cn/v1alpha1
    kind: VectorStore
    name: arcadia-vectorstore
    namespace: kubeagi-system
```