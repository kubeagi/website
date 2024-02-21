---
sidebar_position: 1
title: Prerequisites
sidebar_label: Prerequisites
---

Prerequisites before install arcadia.

## 1. Prepare a Kubernetes Cluster

:::info

The Kubernetes version must equal to or greater than **v1.20.0**.

To check the version: `kubectl version --short`.

:::

If you do not have a cluster yet, create one by using one of the following provision tools:

* [kind](https://kind.sigs.k8s.io/docs/)
* [minikube](https://minikube.sigs.k8s.io/)
* [kubeadm](https://kubernetes.io/docs/admin/kubeadm/)

To utilize GPUs in kubernetes cluster,you must instlal [`GPU-Operator`](https://github.com/NVIDIA/gpu-operator).

Next we show you how to prepare a kubernetes cluster with kind

### Create a dev cluster with Kind

:::info

* [Docker](https://www.docker.com/)
* [Nvidia Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html)

:::

1. Configure docker to use nvidia runtime

Edit `/etc/docker/daemon.json` to configure default docker runtime

```json
{
    "default-runtime": "nvidia",
    "runtimes": {
        "nvidia": {
            "args": [],
            "path": "nvidia-container-runtime"
        }
    }
}
```

Restart docker when docker runtime updated

```shell
sudo systemctl restart docker
```

2. Configure nvidia container runtime

set `accept-nvidia-visible-devices-as-volume-mounts = true` in `/etc/nvidia-container-runtime/config.toml`

3. Install Kind CLI

Follow [document](https://kind.sigs.k8s.io/docs/user/quick-start/#installation) to install **kind** to your local machine

4. Create kind cluster `kubeagi`

At the root directory of [`kubeagi/arcadia`](https://github.com/kubeagi/arcadia).

Run command:

```shell
make kind
```

When kind created,link `ldconfig` to `ldconfig.real` in kind container.

```shell
docker exec -ti kubeagi-control-plane ln -s /sbin/ldconfig /sbin/ldconfig.real
```

5. Install Nvidia GPU-Operator

```shell
helm repo add nvidia https://helm.ngc.nvidia.com/nvidia
helm repo update
helm install --generate-name \
     -n gpu-operator --create-namespace \
     nvidia/gpu-operator --set driver.enabled=false
```

Check the installation status:

```shell
kubectl get pods -ngpu-operator --watch
```

## 2. Install Kubebb

See [install kubebb](http://kubebb.k8s.com.cn/docs/quick-start/quick-install) for more detals.
