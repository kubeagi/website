---
sidebar_position: 11
title: Agents
sidebar_label: Agents
---

Agent 是一个代理，接收用户的输入，采取相应的行动然后返回行动的结果。
* Agent 可以看作是一个自带路由消费 Chains 的代理，基于 MRKL 和 ReAct 的基本原理，Agent 可以使用工具和自然语言处理问题。
* Agent 的作用是代表用户或其他系统完成任务，例如数据收集、数据处理、决策支持等。Agent 可以是自主的，具备一定程度的智能和自适应性，以便在不同的情境中执行任务。

Agent 资源示例：
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
目前支持 zeroShot 类型，可以引用内置的工具，比如天气查询工具，在 LLM 应用中使用 Agent:
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
当你提问"今天海口的天气如何?"，大模型将自动匹配需要调用的工具，比如"Weather Query API"，然后工具通过调用 API、查询数据库、查询互联网等方式获取需要的信息，再通过大模型来返回需要的答案，比如“海口今天天气阴，温度10℃。“

