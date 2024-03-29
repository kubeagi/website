---
sidebar_position: 6
title: LLMs
sidebar_label: LLMs
---

LLM is used to define locally deployed model services provided through the platform or external third-party model services that are accessed.

* Example of local model service
```yaml
apiVersion: arcadia.kubeagi.k8s.com.cn/v1alpha1
kind: LLM
metadata:
  creationTimestamp: "2024-01-05T02:07:04Z"
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
* Third-party model service access

```yaml
apiVersion: arcadia.kubeagi.k8s.com.cn/v1alpha1
kind: LLM
metadata:
  name: zhipu
  namespace: kubeagi-test
spec:
  creator: admin
  displayName: 智谱 AI
  provider:
    endpoint:
      authSecret:
        kind: Secret
        name: zhipu-llm-auth
        namespace: kubeagi-test
      url: https://open.bigmodel.cn/
  type: zhipuai
```

