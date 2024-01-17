---
sidebar_position: 20
title: LLM Applications
sidebar_label: LLM Applications
---

一个应用是一个 Application 类型的CR，其中的 spec.nodes 写明了这个应用涉及到的组件，每个组件都是一个CR。不同类型的组件归属于不同类型的 group，比如 prompts.prompt.arcadia.kubeagi.k8s.com.cn 和 chain.arcadia.kubeagi.k8s.com.cn。

同一个类型的组件，具体是不同的类型通过 kind 区分，比如 LLMChain 和APIChain

### 运行时

* arcadia-controller 主要功能

校验这些 CRD 的字段是有效的，比如引用了一个CR必须是存在的。

静态检测，比如这个应用的节点不能成环，比如不能有多个输出，一定需要有一个节点的下一个节点是Output。

* arcadia-apiserver 主要功能

将应用实例化后开始按编排来执行，实际通过 langchaingo 调用应用，向 LLM 发请求，返回结果。

详细信息和示例，可以参考 [LLM 应用场景](../Scenarios/llm-app-workflow-llmchain.md)
