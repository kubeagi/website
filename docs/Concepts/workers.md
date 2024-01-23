---
sidebar_position: 5
title: Workers
sidebar_label: Workers
---
## Worker

Example of a local model service running models through arcadia to drive rapid deployment of various fastchat-based model services.Worker resource is defined:
```golang
// WorkerSpec defines the desired state of Worker
type WorkerSpec struct {
    CommonSpec `json:",inline"`

    // Normal worker or vLLM Worker(inference acceleration)
    Type WorkerType `json:"type,omitempty"`

    // Model this worker wants to use
    Model *TypedObjectReference `json:"model"`

    // Resource request&limits including
    // - CPU or GPU
    // - Memory
    Resources corev1.ResourceRequirements `json:"resources,omitempty"`

    // Storage claimed to store model files
    Storage *corev1.PersistentVolumeClaimSpec `json:"storage,omitempty"`
}

// WorkerStatus defines the observed state of Worker
type WorkerStatus struct {
    // PodStatus is the observed stated of Worker pod
    // +optional
    PodStatus corev1.PodStatus `json:"podStatus,omitempty"`

    // ConditionedStatus is the current status
    ConditionedStatus `json:",inline"`
}
```
#### Spec Field Details
* CommonSpec: Basic descriptive information
* Type: Type of model worker node, currently classified as：
    - fastchat
    - fastchat-vllm
* Model: The CR of the model run by the model worker node, which records the storage information of the model and is used to load the model file when the model is deployed.
* Resource: The resources requested by the model worker node when it is running, including：
    - CPU
    - Memory
    - GPU: "nvidia.com/gpu: "1" # request 1 GPU"
* Storage: Requested persistent storage (If it is empty, emptydir is used by default to share data within the pod)

Worker startup process, registration session, and invocation process are illustrated in the following figure:

![](./images/2024-01-05-15-27-01.png)

### Worker 节点推荐硬件资源要求

- CPU
  - 不使用 CPU 推理：建议 2 核以上
  - 使用 CPU 推理 Embedding 模型： 
    - Lite/Small 级模型（~300 MB）：建议 4 核以上
    - 一般及 Large 模型（700~1.5GB）：建议 8 核以上
  - 使用 CPU 推理大模型：建议 16 核以上；
    - 使用支持 AVX-512 指令集的 CPU 效率更高；
    - CPU 推理大模型效率较为低下，仅供参考

- 内存
  - 不使用 CPU 推理：建议 2GB 以上
  - 使用 CPU 推理 Embedding 模型：
    - Lite/Small 级模型（~300 MB）：建议 4GB 以上
    - 一般模型（~700 MB）：建议 6GB 以上
    - Large 类模型（~1.5GB）：建议 8GB 以上
  - 使用 CPU 推理大模型：
    - 视模型规模而定，内存占用量与该模型在显卡上推理时占用的显存量基本相当
    - CPU 推理大模型效率较为低下，且 CPU 通常不支持 int8/int4 量化，因此仅供参考
- GPU
  - 建议使用英伟达 Turing 架构及更新的 GPU
    - RTX 20 系列及更新的显卡；Tesla T4 及更新的加速卡
  - 显存要求
    - 每 1B 参数对应的显存占用比例（估算）
      - float32：4GB
      - fp16/bf16：2GB —— 大多数无量化模型默认选项
      - int8：1G
      - int4：0.5G
    - 最低显存需求 = 参数量 × 比例 × 1.25，预留比例随模型不同有浮动
    - 例：
      - ChatGLM3-**6B**: 6 × 2 × 1.25 = 15 GB；官方要求 > 13GB
      - Qwen-**72B-int4**：72 × 0.5 × 1.25 = 45 GB；官方要求 > 48GB
  - 实际测试结果：

| 模型名称                                   | 实际显存占用    | 建议显存                           | 参考显卡配置                                                 |
| ------------------------------------------ | --------------- | ---------------------------------- | ------------------------------------------------------------ |
| ChatGLM2-6B                                | 13 GB（fp16）   | >= 16GB                            | 1 * Tesla T4 16GB<br />1 * RTX 4080 16GB<br />1 * RTX A4000 16GB |
| 7B 级模型<br />（如 Qwen-7B，Baichuan2-7B) | 15 GB（fp16）   | >= 20GB<br />（T4 显卡推理不稳定） | 1 * RTX 3090 24GB<br />1 * RTX 4000 Ada 20GB<br />1 * RTX A5000 24GB |
| 13B 级模型<br />(如 Qwen-13B)              | 28 GB（fp16）   | >= 32GB                            | 2 * Tesla T4 16GB<br />1 * V100 32GB                         |
| 70B 级模型<br />（如 Qwen-72B）            | ~150 GB（fp16） | >= 160GB                           | 8 * RTX 3090 24GB<br />5 * V100 32GB<br />2 * A100 80GB      |

