---
sidebar_position: 1
title: SSE Support
sidebar_label: SSE Support
---

When chat with LLM application, we support blocking and streaming mode. Streaming mode is using SSE (SSE is the abbreviation for Server-Sent Events, and KubeAGI support SSE for message streaming response.)

For testing purpose, you can use curl command to test the chat with your LLM application.

```shell
# chat using blocking mode
curl -k -XPOST https://<kubeagi-host>/kubeagi-apis/chat --data '{"query":"你好，请问 LLMOps 是什么样的平台?","response_mode":"blocking","conversion_id":"","app_name":"llm-model-app", "app_namespace":"kubeagi-test"}'

# chat using streaming mode
curl -k -XPOST https://<kubeagi-host>/kubeagi-apis/chat --data '{"query":"你好，请问 LLMOps 是什么样的平台?","response_mode":"streaming","conversion_id":"","app_name":"llm-model-app", "app_namespace":"kubeagi-test"}'
```
