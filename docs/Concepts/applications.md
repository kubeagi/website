---
sidebar_position: 20
title: LLM Applications
sidebar_label: LLM Applications
---

An application is a CR of type Application, where spec.nodes specifies the components involved in the application, each of which is a CR. Different types of components belong to different types of groups, such as prompts.prompt.arcadia.kubeagi.k8s.com.cn 和 chain.arcadia.kubeagi.k8s.com.cn.

Components of the same type, specifically different types are distinguished by kind, e.g. LLMChain and APIChain.

### Runtime

* arcadia-controller main functions:

Verify that the fields of these CRDs are valid, e.g. a CR must be present if it is referenced.

Static detection, e.g. the nodes of this application can't be in a ring, e.g. there can't be more than one Output, there must need to be a node whose next node is an Output.

* arcadia-apiserver main functions:

Instantiate the application and start executing it on a choreographed basis, actually calling the application through langchaingo, sending requests to the LLM, and returning the results.

For detailed information and examples, see [LLM Application Scenarios](../Scenarios/llm-app-workflow-llmchain.md)
