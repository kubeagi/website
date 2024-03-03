---
sidebar_position: 1
title: Versions
sidebar_label: Versions
---
# Released Versions
### v0.2.0 - 2024/2/29

[Release Notes](https://github.com/kubeagi/arcadia/releases/tag/v0.2.0)

* Support evaluation of LLM application, and generate detail report
* Improve QA to duplicate QA pair
* Suppor to scrap web URLs
* Knowledge Assistant - an AI agent that can generate abstract for PDF/Word/web links, and accumulate knowledge
* Support pgvector as vector store
* Support to save chat history to postgresql and return the history
* Enhanced AI Agents
  - Follow-up questions
  - Show the reference of answer
  - Show repsonse time
* Add a new CRD Agent to provides agent capability in LLM application
* Add tools to CRD Agent: bing_search, weather query
* Support realtime search using bing
* Support common text in knowledgebase
* Inference
  - Support to use Ray cluster for distributed inference
  - Node affinity and use specified GPU on nodes
  - Integrate with RDMA to distribute data/models - enterprise version
* Support to publish AI agent to built-in store
* Add agent-portal project for end user perspective

### v0.1.0 - 2023/12/29

[Release Notes](https://github.com/kubeagi/arcadia/releases/tag/v0.1.0)

* Dataset Management - manage data, including local files, integrate with object storage(s3), data editing, version control, and file download
* Data Processing - data cleaning, text splitting (e.g., text segmentation, QA splitting), file labeling
* Knowledge Base - data embedding
* Model Management - manage the lifecycle of models.
* Model Serving
  - Support CPU & GPU Model Serving
  - Support both remote and local model inference services, and associate with the knowledge base
  - Support local embedding service (bge, m3e)
  - Support vLLM inference engine
* LLM Applications - prompt engineering, initial implementation of LLM application orchestration capabilities. Manage and orchestrate Prompt, LLM/Retriever Chain nodes, and provide relevant example applications (based on streamlit)
* Guided walkthroughs and example scenarios - let the user get started to build LLM application quickly, add momre built-in chat example applications
