---
sidebar_position: 2
title: 使用 Ray 的分布式推理
sidebar_label:  使用 Ray 的分布式推理
---

## 使用 Ray 集群进行分布式推理e

* 如果没有现有的 Ray 集群，请阅读 [部署 Ray 集群](./deploy-ray.md) 以部署一个 Ray 集群。

要在本地模型部署中使用分布式推理，我们可以为 fastchat 的 ```Worker``` 添加一些环境变量以启用它，然后 fastchat 就可以在启用 Ray 的 vLLM 模式下运行。

1. 在 arcadia-config 文件中配置 Ray 集群，例如
```yaml
... # we can add multiple ray clusters and use one of them when run the worker
    rayClusters:
    - name: 3090-2-GPUs
      headAddress: raycluster-kuberay-head-svc.kuberay-system.svc:6379
      pythonVersion: 3.9.18
...
```
对于 ray 集群的 headAddress，如果 worker 将位于与 ray head 相同的集群中，我们可以使用集群的 DNS 名称。

2. 在启动 fastchat worker 时，添加以下额外的环境变量：
```yaml
apiVersion: arcadia.kubeagi.k8s.com.cn/v1alpha1
kind: Worker
...
spec:
  additionalEnvs:
  - name: NUMBER_GPUS
    value: "2"
  - name: RAY_CLUSTER_INDEX
    value: "0"
  creator: admin
  description: qwen-7b
  displayName: qwen-7b
  resources:
    limits:
      cpu: "4"
      memory: 16Gi
      nvidia.com/gpu: "1"
...
```
将 ```NUMBER_GPUS``` 设置为从 ray 集群请求的 GPU 数量。当 Kubernetes 尝试调度该 worker 的 pod 时，worker 将使用资源中的 nvidia.com/gpu 数量。

将 ```RAY_CLUSTER_INDEX``` 设置为 arcadia-config 文件中 ray 集群的索引，默认为 0，因此将使用资源池中的第一个 ray 集群。

* 注意：vLLM 默认使用 ray，并且目前不支持嵌入式表示，详细信息请查看 [github issue](https://github.com/vllm-project/vllm/issues/183)。因此，您应该使用其他嵌入式表示模型来解决此问题。
