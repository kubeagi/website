---
sidebar_position: 9
title: Knowledgebases
sidebar_label: Knowledgebases
---

Knowledgebases provide the ability to build private domain documents and knowledge management, support multiple data types, and upload data files to a vector database

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