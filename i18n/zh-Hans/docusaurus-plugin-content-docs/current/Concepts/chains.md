---
sidebar_position: 10
title: Chains
sidebar_label: Chains
---

目前我们支持以下种类的链式（Chains）来构建 AI 代理。

* LLMChain
* RetrievalQAChain
* APIChain

### LLMChain
LLMChain 指的是将多个语言模型按照顺序连接在一起的整体框架。链中的每个语言模型负责执行特定的任务或子任务，一个模型的输出作为下一个模型的输入。

以下是一个 LLMChain 定义的示例：
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

关于如何在 AI 代理中使用它，请查看这个 [场景](../Scenarios/llm-app-workflow-llmchain.md)

### RetrievalQAChain
RetrievalQAChain 是另一种特定设计用于问答任务的链式模型。它结合了检索模型和问答模型。检索模型负责根据输入的问题从大量的文本集合中检索相关的文档或段落，检索到的信息然后传递给问答模型，该模型分析问题和检索到的上下文，生成一个答案。

以下是一个 RetrievalQAChain 定义的示例：
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

目前它与 LLMChain 相同，但我们将其作为一个单独的资源/概念保留，因为我们可能在以后添加更多的属性。

关于如何在 AI 代理中使用它，请查看这个 [场景](../Scenarios/typical-llm-apps-ui.md)

### APIChain
APIChain 是一种允许 LLM 智能推断需要向哪个 API 发送请求以获取所需信息，并分析 API 响应以回答用户问题的链式模型。

例子：
```
提供如下 API 接口：
https://api.wmdb.tv/api/v1/movie/search?q=英雄本色&limit=10&lang=Cn
其中，q 为搜索项，必填。如果是中文，请使用 urlencode 对这个字段进行编码，英文则不需要
limit 为搜索条数，可选，默认填 10
lang 为搜索语言，可选，默认填 Cn
```

询问 “Furious 7 的主演有谁？”，将使用 LLM 检查此 API，并构建请求 https://api.wmdb.tv/api/v1/movie/search?q=Furious+7&limit=10&lang=Cn, 在 apichain 中，go http 模块将发送此请求，然后 zhipuai 模块将使用响应生成结果。

在这个过程中，我们使用了 LLM 两次。第一次使用 LLM 是为了生成问题的提示：

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
第二次使用的提示是上述的提示，并添加以下内容：

```
Here is the response from the API:

{{.api_response}}

Now, summarize this response. Your summary should reflect the original input and highlight the key information from the API response that answers or relates to that input. Try to make your summary concise, yet informative.

Summary:
```

与 APIChain 对话： 
```
# curl -XPOST http://127.0.0.1:8081/chat --data '{"query":"Furious 7 的主演有谁？","response_mode":"blocking","conversion_id":"","app_name":"movie-bot", "app_namespace":"arcadia"}'

{"conversation_id":"8e038628-6ae7-435d-8a6e-b5b5cb9588b4","message_id":"c9730177-0ad2-4c59-a279-66593f60676a","message":"您询问了《Furious 7》的主演，根据API的 返回结果，我们可以看到以下信息：\n\n1. 《Furious 7》的别名有：狂野时速7(港)、玩命关头7(台)、Fast \u0026 Furious 7。\n2. 该电影的类型是动作/犯罪，导演是詹姆斯·万。\n3. 主演包括范·迪塞尔、米歇尔·罗德里格兹、杰森·斯坦森、查理兹·塞隆等。\n4. 电影的上映日期是2015年4月3日，时长为8220秒（约1小时22分钟）。\n5. 该电影在豆瓣上的评分为8.3分，有404841人投票。\n\n综上所述，《Furious 7》的主演包括范·迪塞尔、米歇尔·罗德里格兹、杰森·斯坦森、查理兹·塞隆等，是一部动作/犯罪的影片，于2015年4月3 日上映。","created_at":"2024-01-17T01:46:25.028139325Z"}
```

关于如何在AI代理中使用它，您可以从以下链接获取完整的文件： https://github.com/kubeagi/arcadia/blob/main/config/samples/app_apichain_movie.yaml
