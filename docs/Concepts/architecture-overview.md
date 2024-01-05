---
sidebar_position: 1
title: Architecture Overview
sidebar_label: Architecture Overview
---

This topic will cover the overall technical architecture of KubeAGI.

For technical architecture, you can see the picture below:

![](./images/2024-01-05-16-40-55.png)

### Ingress
Kubernetes ingress gateway that works as a LB to do basic routing and load balancer, you can use ingress Nginx or some other ingress.

### Portal
It's the web console for KubeAGI that it's built base on KubeBB and using Yunti low code engine [see details](http://kubebb.k8s.com.cn/docs/develop-guid/lowcode-development/intro)

### arcadia-apiserver/langchain-go
It's used to provide the business APIs for LLMOps, including：
* GraphQL APIs used to interact with backend Restful API
* [langchain-go](https://github.com/tmc/langchaingo) that has the similar functionality to [langchain-python](https://github.com/langchain-ai/langchain), but writting in golang

### PostgreSQL
Used for vector data(pgvector) and persist some business data.

### MinIO
Used to store files of various model and datsets.

### Data Processing
A component used for data processing, including data cleaning, data segmentation, and automatic QA generation.

### API(AI) Gateway
Use for various model services, including OpenAI API or other model service. And provide API lifecycle management, API governance and API observation（logging、monitoring、tracing）

### Fastchat-api & Fastchat-registry
* FastChat API: Allow users to interact with deployed chatbot models, making requests to generate responses based on input messages. It provides a RESTful interface that can be accessed programmatically. The API supports various endpoints and methods for sending messages, retrieving responses, and managing model configurations.

* FastChat Registry: Serve as a central repository for managing and organizing chatbot models. It provides a catalog of available models, along with their descriptions, versions, and other relevant metadata. The registry allows users to search for specific models, explore their capabilities, and access the necessary information for utilizing them in the FastChat API.

### Ray Clusters
* A distributed computing framework that provides a range of capabilities for executing distributed workloads, including distributed inference.

[See details on github](https://github.com/lm-sys/FastChat)

### Arcadia-controller/arcadia-apiserver
Used as a Kubernetes controller that keep all LLMOps CRDs in the descried state.
