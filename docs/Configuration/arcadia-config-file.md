---
sidebar_position: 3
title: Arcadia Configuration File
sidebar_label: Arcadia Configuration File
---

We have some system level configuration for Arcadia, and we can update it based on our requirements.

Here is a sample configuration file
```yaml
    # System datasource that will hold all models and datasets
    systemDatasource:
      apiGroup: arcadia.kubeagi.k8s.com.cn/v1alpha1
      kind: Datasource
      name: 'arcadia-minio'
      namespace: 'arcadia'
    # Fastchat gateway to serve all local model services
    gateway:
      apiServer: 'http://arcadia-fastchat.arcadia.svc.cluster.local:8000'
      controller: 'http://arcadia-fastchat.arcadia.svc.cluster.local:21001'
      externalApiServer: 'http://portal.172.22.96.136.nip.io/v1'
    # Vectorstore for embedding
    vectorStore:
      apiGroup: arcadia.kubeagi.k8s.com.cn/v1alpha1
      kind: VectorStore
      name: 'arcadia-vectorstore'
      namespace: 'arcadia'
    # Streamlit configuration for each namespace if enabled, disabled by default
    # MUST enable these configuration if enable streamlit for namespace, refer to Quick Start -> Run LLM application using Streamlit
    #streamlit:
    #  image: 172.22.96.34/cluster_system/streamlit:v1.29.0
    #  ingressClassName: portal-ingress
    #  host: portal.172.22.96.136.nip.io
    #  contextPath: /arcadia
```
