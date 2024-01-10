---
sidebar_position: 1
title: Deploy a Ray cluster
sidebar_label: Deploy a Ray cluster
---

Install Ray if we need to use distributed inference capability, following the steps below.

## Deploy a Ray cluster

* Refer [Ray Quick Start](https://docs.ray.io/en/master/cluster/kubernetes/getting-started/raycluster-quick-start.html) for details.
* Refer [Ray Cluster Concepts](https://docs.ray.io/en/master/cluster/key-concepts.html) for details.

```
# Note: the images below for vLLM and Ray integration:
# for fastchat worker
# kubeagi/arcadia-fastchat-worker:vllm-v0.1.0
# for head of ray cluster
# kubeagi/ray-ml:2.9.0-py39-vllm
```

1. Deploy the kuberay opeartor

```shell
helm repo add kuberay https://ray-project.github.io/kuberay-helm/
helm repo update

# Install both CRDs and kuberay operator v1.0.0.
helm install kuberay-operator -n kuberay-system kuberay/kuberay-operator --version 1.0.0

# Confirm that the operator is running in the namespace `kuberay-system`.
kubectl get pods -n kuberay-system
# NAME                                READY   STATUS    RESTARTS   AGE
# kuberay-operator-7fbdbf8c89-pt8bk   1/1     Running   0          27sray-operator
#
```

2. Deploy a kuberay cluster

Create a ray cluster using yaml below, update the values as needed. And head and worker node require GPU resource, make sure you have scheduable GPUs. 
* By default, no worker will be deployed, we just need a head node to manage ray cluster.
* For ray cluster, all members MUST have the same model files, so prepare the model files on each member before starting the model.

```yaml
apiVersion: ray.io/v1
kind: RayCluster
metadata:
  name: raycluster-kuberay
  namespace: kuberay-system
spec:
  headGroupSpec:
    rayStartParams:
      dashboard-host: 0.0.0.0
    template:
      metadata:
        labels:
          app.kubernetes.io/instance: raycluster
          app.kubernetes.io/name: kuberay
      spec:
        containers:
        - image: kubeagi/ray-ml:2.9.0-py39-vllm
          name: ray-head
          resources:
            limits:
              cpu: "1"
              memory: 2G
              nvidia.com/gpu: 1
            requests:
              cpu: "1"
              memory: 2G
              nvidia.com/gpu: 1
          volumeMounts:
          - mountPath: /tmp/ray
            name: log-volume
        volumes:
        - emptyDir: {}
          name: log-volume
  workerGroupSpecs:
  - groupName: workergroup
    replicas: 0
    minReplicas: 0
    maxReplicas: 5
    rayStartParams: {}
    template:
      metadata:
        labels:
          app.kubernetes.io/instance: raycluster
          app.kubernetes.io/name: kuberay
      spec:
        containers:
        - image: kubeagi/ray-ml:2.9.0-py39-vllm
          name: ray-worker
          resources:
            limits:
              cpu: "1"
              memory: 1G
              nvidia.com/gpu: 1
            requests:
              cpu: "1"
              memory: 1G
              nvidia.com/gpu: 1
          volumeMounts:
          - mountPath: /tmp/ray
            name: log-volume
        volumes:
        - emptyDir: {}
          name: log-volume
```

Create the RayCluster resource and check the status.
```shell
kubectl apply -f <yaml-above> -n kuberay-system
# Once the RayCluster CR has been created, you can view it by running:
kubectl get rayclusters -n kuberay-system

# NAME                 DESIRED WORKERS   AVAILABLE WORKERS   STATUS   AGE
# raycluster-kuberay   1                 1                   ready    72s

# View the pods in the RayCluster named "raycluster-kuberay"
kubectl get pods -n kuberay-system --selector=ray.io/cluster=raycluster-kuberay

# NAME                                          READY   STATUS    RESTARTS   AGE
# raycluster-kuberay-head-vkj4n                 1/1     Running   0          XXs
# raycluster-kuberay-worker-workergroup-xvfkr   1/1     Running   0          XXs
```

## Expose ray dashboard using ingress
* Make sure you have nginx ingress deployed in your K8s cluster.

Create ingress resource using yaml below:
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    description: ray-head-ingress
    displayName: ray-head-ingress
    httpSend: /
    ingress-lb: portal-ingress
    kubernetes.io/ingress.class: portal-ingress
    nginx.ingress.kubernetes.io/enable-access-log: "false"
    nginx.ingress.kubernetes.io/enable-rewrite-log: "false"
    nginx.ingress.kubernetes.io/load-balance: round_robin
    nginx.ingress.kubernetes.io/proxy-body-size: 102400m
    nginx.ingress.kubernetes.io/proxy-buffering: "on"
    nginx.ingress.kubernetes.io/proxy-connect-timeout: "60"
    nginx.ingress.kubernetes.io/server-alias: ""
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/upstream-vhost: $host
  name: ray-head-ingress
  namespace: kuberay-system
spec:
  rules:
  - host: kuberay.<ingress-nginx-ip-address>.nip.io
    http:
      paths:
      - backend:
          service:
            name: raycluster-kuberay-head-svc
            port:
              number: 8265
        path: /
        pathType: Prefix
```

Then you can access ray dashboard using ```kuberay.<ingress-nginx-ip-address>.nip.io``` from browser.
![图 0](images/c77f49099df3cce7e6f646cb122654d6300ed1f74ebdc946022e31e4ed054da2.png)  


## Notice

1. kuberay raycluster updates are extremely limited:
```
* Only updating replicas and workersToDeleteUpdate is supported, updating other fields in RayCluster manifests is not supported. In particular, updating Ray head pod and Ray worker pod configuration is not supported.
* To update pod configuration, delete the RayCluster, edit its configuration and then re-create the cluster. In other words, use kubectl delete and kubectl create to update a RayCluster's pod configuration, rather than kubectl apply.
* Support for in-place updates of pod configuration is tracked in KubeRay issue [#527](https://github.com/ray-project/kuberay/issues/527).

```
