---
sidebar_position: 5
title: Typical LLM Apps with UI
sidebar_label: Typical LLM Apps with UI
---

Here are some web based applications built using streamlit.

About how to enable streamlit on KubeAGI, refer to [Run LLM application using Streamlit](../Quick%20Start/run-llm-app-using-streamlit.md)

## Simple chat application - English teacher

* application definition: refer to config/samples/app_llmchain_englishteacher.yaml
* application code: examples/app-ui-using-streamlit/chat_app_english_teacher.py
* application name: base-chat-english-teacher
* application namespace: kubeagi-system

See details about [how it works](./llm-app-workflow-llmchain.md)

## Chat application using private knowledgebase

* application definition: refer to config/samples/app_retrievalqachain_knowledgebase.yaml
* application code: examples/app-ui-using-streamlit/chat_using_private_knowledgebase.py
* application name: base-chat-with-knowledgebase
* application namespace: kubeagi-system

Here is the workflow described using a chart.

![图 1](images/c160596aafab9f075cee72e9d82f2d52946724d2feef4bb7c1297fb01a47edb1.png)

You should update the application definition/code/name/namespace as your requirement, and then just copy the python script to the streamlit application folder and play with it.

## Test Application using curl tool

KubeAGI APIs can be accessed using \<kubeagi-host\>/kubeag-apis, and chat mode application can be invoked at /chat context path.

So you can use curl tool to chat with application by using similar command below:

```shell
curl -k -XPOST https://portal.172.40.20.125.nip.io/kubeagi-apis/chat --data '{"query":"本制度的适用范围包括哪些人员？","response_mode":"blocking","conversion_id":"","app_name":"kaoqin-bge-qwen-model-app", "app_namespace":"your-namespace"}'
```

The chat API support blocking and streaming mode, you can use the mode you prefer.
