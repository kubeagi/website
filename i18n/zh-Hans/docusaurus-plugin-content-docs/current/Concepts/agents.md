---
sidebar_position: 11
title: Agents
sidebar_label: Agents
---

Agent 是一个代理，接收用户的输入，采取相应的行动然后返回行动的结果。
* Agent 可以看作是一个自带路由消费 Chains 的代理，基于 MRKL 和 ReAct 的基本原理，Agent 可以使用工具和自然语言处理问题。
* Agent 的作用是代表用户或其他系统完成任务，例如数据收集、数据处理、决策支持等。Agent 可以是自主的，具备一定程度的智能和自适应性，以便在不同的情境中执行任务。

这里对 Agent、Capabilities 和 Instructions 这几个概念进行解释，以便更好的理解 AI 智能体：

1、Agent（代理程序）：Agent是指一个具有自主性和主动性的智能实体，能够感知环境、做出决策并采取行动。在AGI中，Agent是指一个具备智能能力的程序或系统，可以执行各种任务和与环境进行交互。Agent可以是一个虚拟的计算机程序，也可以是一个物理机器人等。Agent通过使用其内部的算法和知识来解决问题和实现目标。

2、Capabilities（能力）：Capabilities指代Agent所具备的能力或技能，它们代表了Agent在特定任务或领域中的知识和技术。这些能力可以包括感知、推理、学习、规划、交流、决策等。Agent的能力决定了其在特定任务中能够执行的操作和解决的问题的范围。通过增加和扩展Agent的能力，可以提升其在不同领域中的表现和适应性。

3、Instructions（指令）：Instructions是指Agent接收到的指导或指令，用于指示Agent执行特定的动作或任务。Instructions可以是来自外部的人类指令、程序的命令，或者是Agent自身内部的目标和策略。在执行指令的过程中，Agent可能需要处理和理解指令的内容，结合自身的能力和知识，采取适当的行动来实现指令所要求的目标。

这些概念在AGI应用中起着重要的作用。Agent作为一个智能实体，通过具备的Capabilities来解决各种任务和问题，并根据接收到的Instructions来指导其行动。这种组合使Agent能够在不同的环境和情境中灵活地应对，并根据需要执行各种任务和活动。通过不断提升Agent的能力和优化其指令的质量，可以实现更为高效和智能的AGI应用。

在 KubeAGI 中，Agent可以管理多个工具（tools）。这里的工具可以理解为Agent所拥有的能力和实用程序，用于执行各种任务和操作。与Capabilities类似，这些工具提供了Agent在不同场景下使用的特定功能和技能。尽管工具和 Capabilities 有些相似，但它们在概念上略有不同：

* 工具（Tools）：工具是指Agent所管理和使用的具体实用程序、软件库、算法或资源。这些工具可以是用于数据处理、机器学习、自然语言处理、图像识别等领域的软件工具或算法。Agent可以通过调用这些工具来增强自身的能力，并解决特定的任务或问题。工具通常是具体的实现形式，可以通过Agent的管理和配置进行访问和使用。

* 能力（Capabilities）：能力是指 Agent 所具备的智能能力或技能，表示Agent在特定任务或领域中的知识和技术。能力涵盖了Agent的感知、推理、学习、规划、交流、决策等方面。与工具不同，能力更加抽象和广泛，代表了Agent作为智能实体所具备的整体潜力和特征。

Agent可以管理和使用多个工具，这些工具可以被视为Agent所拥有的特定能力的具体实现。通过管理不同的工具，Agent可以根据需要选择和配置适当的工具，以增强自身的能力，并在特定任务中发挥作用。因此，可以将这些工具视为Agent的扩展和辅助，以支持Agent的能力和实现其指定的指令。

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
当你提问"今天北京的天气如何?"，大模型将自动匹配需要调用的工具，比如"Weather Query API"，然后工具通过调用 API、查询数据库、查询互联网等方式获取需要的信息，再通过大模型来返回需要的答案，比如“北京今天天气阴，温度1℃。“

