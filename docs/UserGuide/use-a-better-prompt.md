---
sidebar_position: 4
title: Tune your Prompt
sidebar_label: Tune your Prompt
---

在 AI 智能体中，Prompt 的重要性不容忽视。Prompt 是指向 AI 模型提供的指示或问题，用于引导其生成回应或执行特定任务。Prompt 的设计和选择可以显著影响 AI 模型的输出结果和行为。

* 引导模型行为：通过 Prompt，可以明确告诉模型应该采取何种行动或生成何种回应。Prompt可以定义任务的目标、期望的输出格式、所需的操作步骤等，以确保模型的行为符合预期。
* 控制输出质量：通过合理的Prompt设计，可以引导模型生成更准确、相关、完整的回答。Prompt可以包含示例回答、期望的回答结构、问题细化等信息，帮助模型理解任务要求并生成更高质量的输出。
* 语言风格和文本生成：Prompt可以用于指导AI模型生成特定的语言风格或文本风格。通过选择适当的词汇、句法结构和上下文信息，Prompt可以影响模型生成的回答具有正式、友好、专业等不同的口吻和风格。
* 对话一致性：在对话系统中，Prompt可以用于确保对话的连贯性和一致性。通过在Prompt中提供对话历史、上下文信息或先前的对话片段，模型可以更好地理解对话背景并生成与之前回答一致的响应。
* 避免误导和偏差：Prompt的设计可以帮助避免模型生成误导性、偏见性或不当的回答。通过明确规定对特定主题或敏感话题的处理方式，Prompt可以减少模型生成不适当内容的风险。

在前面介绍 LLM Agent 时，需要为其定义合适的 Prompt，目前 KubeAGI 在 Prompt 中支持三种占位符：

占位符    | 使用方式
-------- | -----
```{{.context}}``` | 被替换为相关的上下文信息（比如从知识库获取到的相关信息）
```{{.history}}``` | 被替换为当前会话的历史，历史记录数量由模型的“对话轮次”决定
```{{.question}}``` | 被替换为用户的提问

当向LLM发送问题时，对上面的占位符进行统一替换，然后将替换后的结果发送给模型进行处理。

### 提示词示例：

* 英语老师，使用 ```{{.question}}```
```
    I want you to act as an English translator, spelling corrector and improver. 
    I will speak to you in any language, and you will detect the language, 
    translate it and answer in the corrected and improved version of my text, in English. 
    I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. 
    Keep the meaning same, but make them more literary. 
    I want you to only reply the correction, the improvements and nothing else, do not write explanations.

    My sentence is: '{{.question}}'
```

* 知识库，使用 ```{{.context}} {{.question}}```
```
    Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.  
    
    {{.context}}
    
    Question: {{.question}}
    
    Helpful Answer:
```

* 多轮对话，使用 ```{{.history}} {{.question}}```
```
The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.

Current conversation:
{{.history}}

Human: {{.question}}
AI:
```

* 如果对提示词工程感兴趣，可以参考 [提示工程指南](https://www.promptingguide.ai/zh) 进行系统性的学习。