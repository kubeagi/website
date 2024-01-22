---
sidebar_position: 5
title: Workers
sidebar_label: Workers
---
## Worker

通过 arcadia 来运行模型的本地模型服务示例，用来驱动基于 fastchat 的各类模型服务的快速部署。Worker 资源定义：
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
#### Spec字段详解
* CommonSpec: 基础的描述性信息
* Type: 模型工作节点的类型，目前分为:
    - fastchat
    - fastchat-vllm
* Model: 模型工作节点运行的模型对应的 CR。模型CR中记录模型的存储信息，用于后续模型部署时加载模型文件使用
* Resource: 模型工作节点运行时申请的资源，包括:
    - CPU
    - Memory
    - GPU: "nvidia.com/gpu: "1" # request 1 GPU"
* Storage: 申请的持久化存储(如果为空，默认采用 emptydir 在 pod 内部共享数据)

Worker 的启动流程、注册会话、调用流程参考下图示意：

![](./images/2024-01-05-15-27-01.png)
