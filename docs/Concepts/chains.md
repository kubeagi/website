---
sidebar_position: 15
title: Chains
sidebar_label: Chains
---

We support the following kinds of Chains to construct AI Agent by now.

* LLMChain
* RetrievalQAChain
* APIChain

### LLMChain
LLMChain refers to the overall framework that connects multiple language models together in a sequential manner. Each language model in the chain is responsible for a specific task or subtask, and the output of one model serves as input to the next model in the chain.

Here is an example of LLMChain definition:
```yaml
apiVersion: chain.arcadia.kubeagi.k8s.com.cn/v1alpha1
kind: LLMChain
metadata:
  name: llmchain-test
  namespace: kubeagi-test
spec:
  description: llmchain
  displayName: llmchain
  maxLength: 4096
  maxTokens: 4096
  memory:
    conversionWindowSize: 14
  temperature: 0.7
```

For how to use it in an AI Agent, take a look at [this scenario](../Scenarios/llm-app-workflow-llmchain.md)

### RetrievalQAChain
RetrievalQAChain is another type of chain that specifically designed for question-answering tasks. It combines a retrieval model and a question-answering model. The retrieval model is responsible for retrieving relevant documents or passages from a large collection of text based on the input question. The retrieved information is then passed to the question-answering model, which analyzes the question and the retrieved context to generate an answer.

Here is an example of RetrievalQAChain definition:
```yaml
apiVersion: chain.arcadia.kubeagi.k8s.com.cn/v1alpha1
kind: RetrievalQAChain
metadata:
  name: qachain-test
  namespace: kubeagi-test
spec:
  description: qachain
  displayName: qachain
  maxLength: 4096
  maxTokens: 4096
  memory:
    conversionWindowSize: 14
  temperature: 0.7
```

It's the same as LLMChain for now, but we keep it as a separate resource/concept for now, as we may add more properties to it later.

For how to use it in an AI Agent, take a look at [this scenario](../Scenarios/typical-llm-apps-ui.md)

### APIChain
APIChain which allows LLM to use the provided API documentation to intelligently infer which requests need to be sent to which API in order to get the information it needs, and to analyze the API response to answer the user's question.

Example:
```
提供如下API接口：
https://api.wmdb.tv/api/v1/movie/search?q=英雄本色&limit=10&lang=Cn
其中，q为搜索项，必填。如果是中文，请使用urlencode对这个字段进行编码，英文则不需要
limit为搜索条数，可选，默认填10
lang为搜索语言，可选，默认填Cn
```

Ask "Furious 7 的主演有谁？", then LLM will check this API and build a request https://api.wmdb.tv/api/v1/movie/search?q=Furious+7&limit=10&lang=Cn, in apichain, go http will send this request, then zhipuai use the response to make result.

We used LLM 2 times in this process, the first time we used prompt as:
```
You are given the API Documentation:

{{.api_docs}}

Your task is to construct a full API JSON object based on the provided input. The input could be a question that requires an API call for its answer, or a direct or indirect instruction to consume an API. The input will be unpredictable and could come from a user or an agent.

Your goal is to create an API call that accurately reflects the intent of the input. Be sure to exclude any unnecessary data in the API call to ensure efficiency.

Input: {{.input}}

Respond with a JSON object.

{
    "method":  [the HTTP method for the API call, such as GET or POST],
    "headers": [object representing the HTTP headers required for the API call, always add a "Content-Type" header],
    "url": 	   [full for the API call],
    "body":    [object containing the data sent with the request, if needed]
}
```
The second use of prompt is the above prompt and add the following:
```
Here is the response from the API:

{{.api_response}}

Now, summarize this response. Your summary should reflect the original input and highlight the key information from the API response that answers or relates to that input. Try to make your summary concise, yet informative.

Summary:
```

Chat with APIChain:
```
# curl -XPOST http://127.0.0.1:8081/chat --data '{"query":"Furious 7 的主演有谁？","response_mode":"blocking","conversion_id":"","app_name":"movie-bot", "app_namespace":"arcadia"}'

{"conversation_id":"8e038628-6ae7-435d-8a6e-b5b5cb9588b4","message_id":"c9730177-0ad2-4c59-a279-66593f60676a","message":"您询问了《Furious 7》的主演，根据API的 返回结果，我们可以看到以下信息：\n\n1. 《Furious 7》的别名有：狂野时速7(港)、玩命关头7(台)、Fast \u0026 Furious 7。\n2. 该电影的类型是动作/犯罪，导演是詹姆斯·万。\n3. 主演包括范·迪塞尔、米歇尔·罗德里格兹、杰森·斯坦森、查理兹·塞隆等。\n4. 电影的上映日期是2015年4月3日，时长为8220秒（约1小时22分钟）。\n5. 该电影在豆瓣上的评分为8.3分，有404841人投票。\n\n综上所述，《Furious 7》的主演包括范·迪塞尔、米歇尔·罗德里格兹、杰森·斯坦森、查理兹·塞隆等，是一部动作/犯罪的影片，于2015年4月3 日上映。","created_at":"2024-01-17T01:46:25.028139325Z"}
```

For how to use it in an AI Agent, you can get the full file from https://github.com/kubeagi/arcadia/blob/main/config/samples/app_apichain_movie.yaml.