---
sidebar_position: 2
title: Roadmap
sidebar_label: Roadmap
---
# Roadmap

### v0.3.0 - 2024 Apri. Ongoing
* Share GPTs to other user to build ecosystem

* Support reranking chain to optimize RAG

* Support fine-grade update to knowledagebase data

* Extract images/tables from pdf to enhance data processing

* Support multimodal models in deployment and inference

* Support to chat with documents in the conversation

* Support Gemma and Qwen-VL models

* Upgrade fastchat to the latest version

* Chat with images with multimodal models

* Integration of GPU management, scheduling, and resource monitoring capabilities for containerized environments

* Integration of API gateway to govern model service APIs, including monitoring, analysis, and security measures, and construct AI gateway

### v0.5.0 - 2024 May

* Playground for datasets, knowledge base, model services, etc., based on streamlit

* Visualization of various data types, based on streamlit

* Data Processing - Introduce text annotation (automated + manual) to improve data quality through assisted fine-tuning

* Data Security - Support data anonymization (e.g., masking sensitive information like ID numbers, phone numbers, and bank account numbers)

* Enhanced Data Integration - Increase the capability to integrate with various data sources (databases, APIs, etc.) and support data synchronization strategies (automatic synchronization)

* Support manual evaluation to ensure quality control before deploying to production. Additionally, incorporate manual feedback into the monitoring system

* Enable user feedback on the question-answering system to facilitate optimization of LLM applications (data processing, prompt optimization, etc.)

* Support low-resource large model fine-tuning, including RLHF (Reinforcement Learning from Human Feedback), SFT (Semi-Supervised Fine-Tuning) techniques such as Adapter, P-tuning, and LoRA. This improves model quality while reducing performance requirements for model serving (e.g., reducing inference costs, latency issues related to long prompts or slow inference)

* Model compression techniques
* Conduct testing and evaluation of model services and embeddings (QA evaluation, metric collection)

* Implement "scale to zero" capability (integrating with Arbiter) for cold start scenarios, enabling models and applications to evolve towards a Serverless architecture

* Support orchestration of additional node types such as Agent, Cache, etc

* Add more best practices for prompt engineering
  - Few-shot learning techniques
  - Chain-of-Thought (CoT) approach
  - Mind-mapping techniques

### v1.0 - 2024 Jun.
* Automatically constructing prompt templates based on data annotations
* Enhance the monitoring capabilities of LLMOps, monitoring the pipeline from dataset and feature data to model inference, with call chain tracing based on langchain-go
* Implement a pipeline from data source -> dataset -> data processing -> data versioning -> knowledge base -> model service
* Strengthen the Python SDK to handle basic capabilities such as dataset manipulation, data processing, and vectorization. These operations can be performed in a notebook environment.
  - Refer Databricks to enhance the developer experience
* Implement gray release for LLM applications based on AI gateway

### v1.x and future
* Improve user experience and system efficiency
* 