---
sidebar_position: 2
title: GPU and Node Affinity
sidebar_label: GPU and Node Affinity
---


## Use specified GPUs

If you have different type of GPUs on the node, use additional environment variables in the worker to control which GPUs to use:
```yaml
apiVersion: arcadia.kubeagi.k8s.com.cn/v1alpha1
kind: Worker
...
spec:
  additionalEnvs:
  # the GPU IDs will be ordered by pci bus IDs.
  - name: CUDA_DEVICE_ORDER
    value: "PCI_BUS_ID"
  # specify which GPU(s) to be used
  - name: CUDA_VISIBLE_DEVICES
    value: "0,3"
  creator: admin
  description: qwen-7b
  displayName: qwen-7b
```

## Schedule on specified Nodes
You can also use nodeAffinity to schedule fastchat worker pod to the specified node(s), for example:
```yaml
apiVersion: arcadia.kubeagi.k8s.com.cn/v1alpha1
kind: Worker
...
spec:
  matchExpressions:
  - key: kubernetes.io/hostname
    operator: In
    values:
    - gpu-node-2
  creator: admin
  description: qwen-7b
  displayName: qwen-7b
```
