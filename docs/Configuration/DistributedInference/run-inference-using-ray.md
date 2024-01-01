---
sidebar_position: 2
title: Distributed Inference using Ray
sidebar_label:  Distributed Inference using Ray
---

## Use ray cluster for distributed inference

* Read [deploy ray cluster](./deploy-ray.md) to deploy a Ray cluster if there is no existing one.

To use distributed inference for local model deployment, we can add some environment variables to fastchat ```Worker``` to enable it, then fastchat can run in vLLM mode with Ray enabled.

1. Set ```NUMBER_GPUS``` to a value bigger than 1, so ray will init when run vLLM worker, and ray can only be supported using vLLM mode.

2. Set environment variable ```RAY_ADDRESS``` to the address of ray cluster, by default it can be accessed at ```raycluster-kuberay-head-svc.kuberay-system.svc:6379``` inside Kubernetes cluster.

```
# Note: you must use the images below for vLLM and Ray integration:
# kubeagi/arcadia-fastchat:v0.1.0-vllm
# kubeagi/ray-ml:2.9.0-py39-vllm
# Update the command of fastchat pod to the command below (add 'ray start' before vllm_worker starts)
echo "Start ray worker"
ray start --address=$RAY_ADDRESS
echo "Run model worker..."
python3.9 -m fastchat.serve.model_worker --model-names $FASTCHAT_REGISTRATION_MODEL_NAME --model-path /data/models/qwen-14b-chat --worker-address $FASTCHAT_WORKER_ADDRESS --controller-address $FASTCHAT_CONTROLLER_ADDRESS --num-gpus $NUMBER_GPUS --host 0.0.0.0 --port 21002
```

## Use specified GPUs

If you have different type of GPUs on the node, use environment variables to control which GPUs to use:
```
CUDA_DEVICE_ORDER=PCI_BUS_ID # the GPU IDs will be ordered by pci bus IDs.
CUDA_VISIBLE_DEVICES="0,3"  # specify which GPU(s) to be used
```

So you can use nodeSelector or nodeAffinity to schedule fastchat worker pod to the specified node(s) and set the environment variables above, then the expected GPUs will be used.
