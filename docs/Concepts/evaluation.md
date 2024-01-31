---
sidebar_position: 11
title: Evaluation
sidebar_label: Evaluation
---

智能体评估（Evaluation）可通过多种维度及指标定量评估应用的表现。

## RAG 应用评估

### 流程

#### 数据

一个典型的检索增强生成（RAG）应用通常会产生一系列数据。创建 RAG 应用评估任务时，需要以下列条目及格式准备数据，并以 csv 格式存储：

- 问题（question）`list[str]`：用户向应用发起的询问
- 上下文（contexts）`list[list[str]]`：基于用户的问题，检索器（Retriever）向知识库查找知识条目，形成上下文，并提供给大模型。多条上下文条目间以分号`;`分割。
- 回答（answer）`list[str]`：大模型基于问题、上下文和提示词模板生成的回答

此外，在评估中，为了将应用与真实内容对齐，通常还需要：
- 正确答案（ground_truths）`list[list[str]]`：用户提问所对应的真实、正确的答案。若一个问题下有多条正确答案（例如涉及多个部分的原文），条目间以分号`;`分割。

#### “裁判”

评估任务需要指定一个大模型或大模型服务作为评估者（或者说”裁判“/"考官"）。默认使用 GPT-3.5 作为裁判。

若使用本地运行的大模型作为评估者，建议：

- 使用 7B 及以上参数量级的模型。更大的模型通常能更好地完成任务。
- 使用”指令微调“（Instruct fine-tuned）类模型。这类微调模型通常能更好地依照指令返回特定格式的结果。
- 涉及专业领域知识（如医疗、金融）时，使用经过该领域知识微调的大模型效果更好。

此外，部分指标需要使用 Embedding 模型将数据向量化。默认使用 OpenAI Embedding 接口，也可使用支持 Huggingface 库的本地模型，如 bge 系列。

### 指标

对于以“知识库+大模型”为典型结构的检索增强生成（RAG）应用，可评估以下指标：

- 忠实度（Faithfulness）

    大模型是否**仅使用上下文提供的信息回答**问题？有无产生“幻觉”信息？该指标评估大模型回答时是否忠实地遵循上下文提供的信息。

    - 评估对象：问题、上下文、回答

- 答案相关度（Answer Relevancy）

    大模型是否**完整地回答了问题**？有无答非所问？该指标衡量大模型的回答与问题的对应程度。

    - 该指标不考虑答案正确与否
    - 评估该指标需调用 Embedding 模型
    - 评估对象：问题、回答

- 上下文准确度（Context Precision）

    检索器从知识库中检索多条上下文条目时，是否能将**与正确答案**（ground truth）**更相关**的上下文条目置于搜索结果的靠前位置？该指标衡量检索器将更准确的上下文与问题优先匹配的能力。

    - 评估对象：问题、上下文

- 上下文相关度（Context Relevancy）

    检索器获取的上下文中，有**多大比例的条目有助于回答问题**？该指标衡量检索器精确搜索与问题相关的条目的能力。

    - 评估对象：问题、上下文

- 上下文召回率（Context Recall）

    检索器获取的上下文内容**是否完整覆盖了正确答案**？该指标衡量检索器完整搜索与正确答案相关上下文的能力。

    - 评估对象：正确答案、上下文

- 答案语义相似度（Answer Similarity）

    该指标基于交叉编码器（cross-encoder）模型，计算答案与正确答案的语义相似度。

    - 评估该指标需调用 Embedding 模型
    - 评估对象：回答、正确答案

- 答案正确度（Answer Correctness）

    该指标基于一定权重，综合语义相似度与事实相似度，评估大模型的回答是否符合正确答案。

    - 语义相似度与事实相似度的权重默认为 [0.5,0.5]，可自定义。
    - 评估该指标需调用 Embedding 模型
    - 评估对象：回答、正确答案

创建评估任务时，**默认评估前 5 项指标**。

### ragas_once cli 工具

准备 ragas 及 langchain 环境：

```sh
pip install ragas==0.0.22 langchain==0.0.354
```

源码安装：

```sh
git clone https://github.com/kubeagi/arcadia.git
cd arcadia/pypi/ragas_once
pip install -e .
```

使用 openai apikey，评测 fiqa 数据集 demo：

```sh
ro --apikey YOUR_API_KEY
```

使用其他 openai 格式接口及 Huggingface Embedding 模型，评测指定数据集 csv：

```sh
ro --model MODEL_NAME --apibase API_BASE_URL --embeddings BAAI/bge-small-en --dataset path/to/dataset.csv
```

- Embedding 模型运行需要 `sentence-transformers` 库：`pip install sentence-transformers`

参数说明：

- `--model`: Specifies the model to use for evaluation.
    - Default value is "gpt-3.5-turbo". Langchain compatible.
- `--apibase`: Specifies the base URL for the API.
    - Default value is "https://api.openai.com/v1".
- `--apikey`: Specifies the API key to authenticate requests. 
    - Not required if using psuedo-openai API server, e.g. vLLM, Fastchat, etc.
- `--embeddings`: Specifies the Huggingface embeddings model to use for evaluation. 
    - Embeddings will run **locally**.
    - Will use OpenAI embeddings if not set.
    - Better set if using psuedo-openai API server.
- `--metrics`: Specifies the metrics to use for evaluation.
    - Will use Ragas default metrics if not set.
    - Default metrics: `["answer_relevancy", "context_precision", "faithfulness", "context_recall", "context_relevancy"]`
    - Other metrics: `"answer_similarity", "answer_correctness"`
- `--dataset`: Specifies the path to the dataset for evaluation.    
    - Dataset format must meet RAGAS requirements.
    - Will use fiqa dataset as demo if not set.