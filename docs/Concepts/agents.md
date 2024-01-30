---
sidebar_position: 11
title: Agents
sidebar_label: Agents
---

Agent is a proxy that receives user input, takes appropriate actions, and returns the results of those actions.

* An Agent can be seen as a proxy that consumes Chains and is based on the basic principles of MRKL and ReAct. It can handle tools and natural language to process questions.
* The role of an Agent is to represent users or other systems in completing tasks such as data collection, data processing, decision support, etc. An Agent can be autonomous, possessing a certain level of intelligence and adaptability to perform tasks in different contexts.

Here, we will explain the concepts of Agent, Capabilities, and Instructions to better understand AI agents:

1. Agent: An agent refers to an intelligent entity with autonomy and initiative, capable of perceiving the environment, making decisions, and taking actions. In AGI, an agent refers to a program or system with intelligent capabilities, capable of performing various tasks and interacting with the environment. An agent can be a virtual computer program or a physical robot, among other things. Agents solve problems and achieve goals by utilizing internal algorithms and knowledge.

2. Capabilities: Capabilities refer to the abilities or skills that an agent possesses. They represent the knowledge and techniques that an agent has in specific tasks or domains. These capabilities can include perception, reasoning, learning, planning, communication, decision-making, etc. The capabilities of an agent determine the range of actions it can perform and the problems it can solve in specific tasks. By enhancing and expanding the capabilities of an agent, its performance and adaptability in different domains can be improved.

3. Instructions: Instructions refer to the guidance or directives received by an agent, instructing it to perform specific actions or tasks. Instructions can come from external human instructions, program commands, or the agent's internal goals and strategies. In the process of executing instructions, the agent may need to process and understand the content of the instructions, combining its own capabilities and knowledge to take appropriate actions to achieve the goals specified by the instructions.

These concepts play an important role in AGI applications. Agents, as intelligent entities, utilize their capabilities to solve various tasks and problems and act based on the instructions they receive. This combination enables agents to flexibly adapt to different environments and contexts, performing various tasks and activities as needed. By continuously improving the agent's capabilities and optimizing the quality of instructions, more efficient and intelligent AGI applications can be achieved.


In KubeAGI, an Agent can manage multiple tools. Here, tools can be understood as the capabilities and utility programs that the Agent possesses to perform various tasks and operations. Similar to capabilities, these tools provide specific functionalities and skills that the Agent can use in different scenarios. Although tools and capabilities are somewhat similar, they have slight conceptual differences:

* Tools: Tools refer to specific utility programs, software libraries, algorithms, or resources that the Agent manages and uses. These tools can be software tools or algorithms used in areas such as data processing, machine learning, natural language processing, image recognition, etc. The Agent can enhance its capabilities and solve specific tasks or problems by invoking these tools. Tools are usually concrete implementations that can be accessed and utilized through the Agent's management and configuration.

* Capabilities: Capabilities refer to the intelligent abilities or skills that the Agent possesses, representing the knowledge and techniques the Agent has in specific tasks or domains. Capabilities encompass aspects such as perception, reasoning, learning, planning, communication, decision-making, etc. Unlike tools, capabilities are more abstract and broad, representing the overall potential and characteristics of the Agent as an intelligent entity.

An Agent can manage and use multiple tools, which can be seen as specific implementations of the Agent's capabilities. By managing different tools, the Agent can select and configure appropriate tools as needed to enhance its capabilities and perform specific tasks. Therefore, these tools can be considered as extensions and aids to the Agent, supporting its capabilities and enabling the fulfillment of specified instructions.

Example of Agent resource in KubeAGI：
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
Currently, zeroShot type is supported in LLM applications, and you can reference built-in tools such as the weather query tool, bingsearch when using Agent.
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
When you ask, "What is the weather like in Beijing today?" the large-scale model will automatically match the required tool, such as the "Weather Query API." The tool will gather the necessary information by making API calls, and then use the large-scale model to return the desired answer, such as "The weather in Beijing today is cloudy with a temperature of 1°C."
