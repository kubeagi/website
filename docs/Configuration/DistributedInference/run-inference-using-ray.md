---
sidebar_position: 2
title: Distributed Inference using Ray
sidebar_label:  Distributed Inference using Ray
---

## Use ray cluster for distributed inference

* Read [deploy ray cluster](./deploy-ray.md) to deploy a Ray cluster if there is no existing one.

To use distributed inference for local model deployment, we can add some environment variables to fastchat ```Worker``` to enable it, then fastchat can run in vLLM mode with Ray enabled.

1. Configure ray cluster(s) in the arcadia-config file, for example:
```yaml
... # we can add multiple ray clusters and use one of them when run the worker
    rayClusters:
    - name: 3090-2-GPUs
      headAddress: raycluster-kuberay-head-svc.kuberay-system.svc:6379
      pythonVersion: 3.9.18
...
```
For headAddress of ray cluster, we can use the cluster DNS name if worker will be in the same cluster as the ray head.

2. When start the fastchat worker, add additional environment variabes as below:
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
Set ```NUMBER_GPUS``` to the number of GPUs that will request from the ray cluster. And the number of nvidia.com/gpu from resources will be used by the worker when Kubernetes try to scheduler this worker's pod.

Set ```RAY_CLUSTER_INDEX``` to the index of ray cluster in the arcadia-config file, by default it'll be 0, so the 1st ray cluster will be used on the resource pool.

* Note: vLLM will use ray by default, and vLLM does not support embedding for now, check [github issue](https://github.com/vllm-project/vllm/issues/183) for details. So you should use other embedding model to solve this.
