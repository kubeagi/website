---
sidebar_position: 17
title: Retrievers
sidebar_label: Retrievers
---

检索器是一个接口，可以在非结构化查询的情况下返回文档。它比向量数据库更通用。检索器不需要存储文档，只需要返回（或检索）文档。向量数据库可以作为检索器的核心，但也有其他类型的检索器。

检索器接受一个字符串查询作为输入，并返回一个文档列表作为输出。

目前，我们支持两种检索器：
* KnowledgebaseRetriever：从我们支持的向量知识库（Knowledgebase）中检索与用户问题相对应的文档，并将其返回给后续链（chain）组件，相应的向量知识库和链都是通过应用程序（application）中的节点定义的。即 "知识库 -> 知识库检索器 -> 检索 QAChain" 模式。可以定义通过该检索器检索的文档的最大数量和最小向量相似度，以及在未找到文档时应返回给用户的提示语句。
* RerankRetriever：目前的用法是从向量知识库（Knowledgebase）中检索文档（以后会增加其他检索文档的方式，如 bing 搜索、全文搜索），配置好外部 API 地址后，通过 rerank 模型进行重排，然后将结果返回到后续的链（chain）中，相应的组件都是通过应用程序（application）中的节点来定义的，即 "知识库 -> 知识库检索器 -> 重排检索器-> 检索 QAChain" 模式。可以定义通过该检索器获取文档的最大数量和最小重排相似度，以及重排的 api 地址（该地址的默认值通过默认配置 configmap 中的 `rerankDefaultEndpoint` 提供）。


检索器一些例子:

```yaml
apiVersion: retriever.arcadia.kubeagi.k8s.com.cn/v1alpha1
kind: KnowledgeBaseRetriever
metadata:
  name: base-chat-with-knowledgebase-pgvector
  namespace: arcadia
  annotations:
    arcadia.kubeagi.k8s.com.cn/input-rules: '[{"kind":"KnowledgeBase","group":"arcadia.kubeagi.k8s.com.cn","length":1}]'
    arcadia.kubeagi.k8s.com.cn/output-rules: '[{"kind":"RetrievalQAChain","group":"chain.arcadia.kubeagi.k8s.com.cn","length":1}]'
spec:
  displayName: "knowledgebase Retriever"
  description: "KnoledgeBaseRetrievers that fetch documents from the knowledgebase, which is defined in the CR Application.Spec.Nodes and is the previous node of the retriever"
  scoreThreshold: 0.3
  numDocuments: 50
  docNullReturn: "Not found what you asked about, please describe your problem in detail."
---
apiVersion: retriever.arcadia.kubeagi.k8s.com.cn/v1alpha1
kind: RerankRetriever
metadata:
  name: base-chat-with-knowledgebase-pgvector-rerank
  namespace: arcadia
  annotations:
    arcadia.kubeagi.k8s.com.cn/input-rules: '[{"kind":"KnowledgeBaseRetriever","group":"retriever.arcadia.kubeagi.k8s.com.cn","length":1}]'
    arcadia.kubeagi.k8s.com.cn/output-rules: '[{"kind":"RetrievalQAChain","group":"chain.arcadia.kubeagi.k8s.com.cn","length":1}]'
spec:
  displayName: "rerank Retriever"
  description: "RerankRetrievers currently uses an external rerank model to rerank the resulting documents based on user-entered questions, and then feeds this content into the LLM, which results in more accurate responses"
  scoreThreshold: 0.1
  numDocuments: 3
  endpoint: "http://rerank-mock.default.svc:8123/rerank"
```
