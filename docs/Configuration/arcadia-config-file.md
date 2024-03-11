---
sidebar_position: 1
title: Arcadia Configuration File
sidebar_label: Arcadia Configuration File
---

We have some system level configuration for Arcadia, and we can update it based on our requirements.

Here is a sample configuration file
```yaml
    # RelationalDatasource specifies the built-in datasource(common:postgres) for Arcadia to host relational data
    relationalDatasource:
      apiGroup: arcadia.kubeagi.k8s.com.cn/v1alpha1
      kind: Datasource
      name: 'arcadia-postgresql'
      namespace: 'kubeagi-system'
    # System datasource that will hold all models and datasets
    systemDatasource:
      apiGroup: arcadia.kubeagi.k8s.com.cn/v1alpha1
      kind: Datasource
      name: 'arcadia-minio'
      namespace: 'kubeagi-system'
    # Fastchat gateway to serve all local model services
    gateway:
      apiServer: 'http://arcadia-fastchat.kubeagi-system.svc.cluster.local:8000/v1'
      externalApiServer: 'http://fastchat.172.40.20.125.nip.io/v1'
      controller: 'http://arcadia-fastchat.kubeagi-system.svc.cluster.local:21001'
    # Vectorstore for embedding
    vectorStore:
      apiGroup: arcadia.kubeagi.k8s.com.cn/v1alpha1
      kind: VectorStore
      name: 'arcadia-pgvector-vectorstore'
      namespace: 'kubeagi-system'
    # Resource pool managed by Ray cluster
    rayClusters:
      - name: 3090-2-GPUs
        headAddress: raycluster-kuberay-head-svc.kuberay-system.svc:6379
        pythonVersion: 3.9.18
    # Streamlit configuration for each namespace if enabled, disabled by default
    # MUST enable these configuration if enable streamlit for namespace, refer to Quick Start -> Run LLM application using Streamlit
    streamlit:
      image: kubeagi/streamlit:v1.29.0
      ingressClassName: portal-ingress
      host: portal.172.40.20.125.nip.io
      contextPath: /chats
    # Embedder specifies the default embedder for Arcadia to generate embeddings
    embedder:
      apiGroup: arcadia.kubeagi.k8s.com.cn/v1alpha1
      kind: Embedder
      name: 'bge-large-zh'
      namespace: 'ainet'
    # the default endpoint of rerank
    rerankDefaultEndpoint: "http://172.31.52.30/api/v1/rerank"
```
