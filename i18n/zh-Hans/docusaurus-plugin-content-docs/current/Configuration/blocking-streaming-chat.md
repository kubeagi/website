---
sidebar_position: 4
title: SSE 支持
sidebar_label: SSE 支持
---

与 LLM 应用程序聊天时，我们支持阻塞和流模式。流模式使用 SSE（SSE 是 Server-Sent Events 的缩写，KubeAGI 支持 SSE 用于消息流响应）。

出于测试目的，您可以使用 curl 命令来测试与 LLM 应用程序的聊天。

```shell
# chat using blocking mode
curl -k -XPOST https://<kubeagi-host>/kubeagi-apis/chat --data '{"query":"你好，请问 LLMOps 是什么样的平台?","response_mode":"blocking","conversion_id":"","app_name":"llm-model-app", "app_namespace":"kubeagi-test"}'

# chat using streaming mode
curl -k -XPOST https://<kubeagi-host>/kubeagi-apis/chat --data '{"query":"你好，请问 LLMOps 是什么样的平台?","response_mode":"streaming","conversion_id":"","app_name":"llm-model-app", "app_namespace":"kubeagi-test"}'
```
