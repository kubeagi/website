---
sidebar_position: 7
title: Embedders
sidebar_label: Embedders
---

The Embedder model service is used to transform input data into higher dimensional, more expressive embedding vectors. These embedding vectors capture the semantic and syntactic features of the input data, thus providing a better representation for subsequent tasks and models.

The Embedder service is currently used in two main places:
* Vectorise Q/A to generate knowledge bases
* Vectorise questions posed by users in session, supporting repository modelling applications

Example of an Embedder service definition:
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
