---
sidebar_position: 11
title: Agents
sidebar_label: Agents
---

An Agent is an agent that receives input from the user, takes action and returns the results of that action.
* An Agent can be seen as an agent with its own Route Consumption Chains, and based on the basic principles of MRKL and ReAct, an Agent can use tools and natural language to process problems.
* The role of an Agent is to perform tasks on behalf of the user or other systems, such as data collection, data processing, decision support, etc. Agents can be autonomous, with a certain degree of intelligence and self-adaptation, in order to perform tasks in different contexts.

Examples of Agent resources:
```yaml
apiVersion: arcadia.kubeagi.k8s.com.cn/v1alpha1
kind: Agent
metadata:
  name: weather-agent
  namespace: kubeagi-test
spec:
  allowedTools:
  - name: Weather Query API
    params:
      apiKey: <key to invoke API>
  options:
    maxIterations: 3
  type: zeroShot
```
The zeroShot type is currently supported and can reference built-in tools, such as weather lookup tools, in LLM applications using Agent.
```yaml
  - description: 用户输入节点，必须
    displayName: 用户输入
    name: Input
    nextNodeName:
    - prompt-node
    ref:
      kind: Input
      name: Input
  - description: 设定prompt，template中可以使用{{.}}来替换变量
    displayName: prompt
    name: prompt-node
    nextNodeName:
    - agent-node
    ref:
      apiGroup: prompt.arcadia.kubeagi.k8s.com.cn
      kind: Prompt
      name: ceshi
  - description: agent llm
    displayName: agent-llm
    name: agent-llm-node
    nextNodeName:
    - agent-node
    ref:
      apiGroup: arcadia.kubeagi.k8s.com.cn
      kind: LLM
      name: qwen-7b
  - description: 天气预报 agent 助手
    displayName: agent
    name: agent-node
    nextNodeName:
    - Output
    ref:
      apiGroup: arcadia.kubeagi.k8s.com.cn
      kind: Agent
      name: weather-agent
  - description: 最终输出节点，必须
    displayName: 最终输出
    name: Output
    ref:
      kind: Output
      name: Output
```
When you ask the question "How is the weather in Haikou today?", the big model will automatically match with the tools that need to be called, such as "Weather Query API". The large model will automatically match the tools that need to be called, such as "Weather Query API", and then the tools through the call API, query the database, query the Internet and so on, to obtain the required information, and then through the large model to return the required answer, for example "Today's weather in Haikou is cloudy, the temperature is 10 degrees Celsius."