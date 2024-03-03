---
sidebar_position: 4
title: Tune your Prompt
sidebar_label: Tune your Prompt
---

In an AI agent, the importance of prompts can't be ignored. A prompt refers to the instructions or questions provided to an AI model to guide its response generation or task execution. The design and selection of prompts can significantly influence the output and behavior of an AI model.

* Guiding Model Behavior: Prompts can explicitly instruct the model on what actions to take or what responses to generate. They can define the task's objectives, expected output format, required steps, etc.to ensure that the model's behavior aligns with expectations.
* Controlling Output Quality: Proper prompt design can guide the model to generate more accurate, relevant, and complete answers. Prompts can include example answers, expected answer structures, question refinements, etc. to help the model understand the task requirements and generate higher-quality outputs.
* Language Style and Text Generation: Prompts can be used to guide AI models in generating specific language styles or text formats. By selecting appropriate vocabulary, syntactic structures, and contextual information, prompts can influence the generated answers to have different tones and styles, such as formal, friendly, professional, etc.
* Dialogue Consistency: In dialogue systems, prompts can ensure coherence and consistency in the conversation. By providing dialogue history, contextual information, or previous dialogue segments in prompts, the model can better understand the conversation context and generate responses consistent with earlier interactions.
* Avoiding Misleading and Bias: Prompt design can help avoid the generation of misleading, biased, or inappropriate answers. By explicitly specifying how to handle specific topics or sensitive issues within prompts, the risks of the model generating inappropriate content can be reduced.

When introducing the LLM Agent, it is necessary to define appropriate prompts. Currently, KubeAGI supports three types of placeholders in prompts:

Placeholder    | Usage
-------- | -----
```{{.context}}``` | Replaced with relevant contextual information (e.g. information retrieved from a knowledge base).
```{{.history}}``` | Replaced with the current session's history, where the number of historical records is determined by the model's "dialogue turns".
```{{.question}}``` | Replaced with the user's question.
```{{.date}}``` | Replaced with current date and weekday


When sending a question to the LLM, these placeholders are uniformly replaced with the corresponding information, and the replaced prompt is then sent to the model for processing.

### Example of prompt words:

* English teacher, using ```{{.question}}```
```
    I want you to act as an English translator, spelling corrector and improver. 
    I will speak to you in any language, and you will detect the language, 
    translate it and answer in the corrected and improved version of my text, in English. 
    I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. 
    Keep the meaning same, but make them more literary. 
    I want you to only reply the correction, the improvements and nothing else, do not write explanations.

    My sentence is: '{{.question}}'
```

* Knowledge base, using ```{{.context}} {{.question}}```
```
    Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.  
    
    {{.context}}
    
    Question: {{.question}}
    
    Helpful Answer:
```

* Multi-round dialogue, using ```{{.history}} {{.question}}```
```
The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.

Current conversation:
{{.history}}

Human: {{.question}}
AI:
```

* If you are interested in prompt engineering, you can refer to [Prompt Engineering Guide](https://www.promptingguide.ai/zh) for systematic learning.