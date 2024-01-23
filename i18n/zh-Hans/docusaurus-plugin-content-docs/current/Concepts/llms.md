---
sidebar_position: 6
title: 大型语言模型
sidebar_label: 大型语言模型
---

LLM 用来定义通过平台提供的本地部署模型服务或者接入的外部第三方模型服务。

* 本地模型服务示例
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
* 第三方模型服务接入

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

