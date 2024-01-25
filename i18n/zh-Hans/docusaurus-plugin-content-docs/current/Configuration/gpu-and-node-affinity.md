---
sidebar_position: 2
title: GPU 和节点亲和性
sidebar_label: GPU 和节点亲和性
---


## 使用指定的 GPU

如果节点上有不同类型的 GPU，可以在工作节点中使用额外的环境变量来控制使用哪些 GPU：
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

## 在指定节点上调度
您还可以使用节点亲和性将 fastchat worker Pod 调度到指定的节点上，例如：
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
