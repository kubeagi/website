---
sidebar_position: 17
title: Retrievers
sidebar_label: Retrievers
---
A retriever is an interface that returns documents given an unstructured query. It is more general than a vector store. A retriever does not need to be able to store documents, only to return (or retrieve) them. Vector stores can be used as the backbone of a retriever, but there are other types of retrievers as well.

Retrievers accept a string query as input and return a list of Document's as output.

Currently, we support 2 types of retrievers:

* KnowledgebaseRetriever: retrieve documents corresponding to a user's question from our supported vector knowledgebase and return them to the subsequent chain, the corresponding vector knowledgebase and chain are both defined through nodes in the application. That is, the pattern `Knowledgebase -> KnowledgebaseRetriever -> RetrievalQAChain`. It is possible to define the maximum number and minimum vector similarity of documents to be retrieved through this retriever, as well as the hint statement that should be returned to the user if documents is not found.
* RerankRetriever: the current usage is to retrieve documents from the vector knowledgebase (other ways of retrieving documents will be added later, such as bing search, full-text search), after configuring the external API address, through the rerank model for reranking, and then return to the subsequent chain, the corresponding components are all defined through the nodes in the application, that is, the ` Knowledgebase -> KnowledgebaseRetriever -> RerankRetriever -> RetrievalQAChain`. The maximum number of documents to be fetched through this retriever and the minimum rerank similarity can be defined, as well as the api address of the rerank, (the default value of this address is provided through the `rerankDefaultEndpoint` in the default configuration configmap)


Some examples of Retriever:

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
