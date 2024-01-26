---
sidebar_position: 3
title: 使用 Kind 创建一个集群
sidebar_label: 使用 Kind 创建一个集群
---

## 创建一个未启用 GPU 的 Kind 集群

如果不想启用 GPU 支持，使用 Kind 调度一个集群非常容易，请按照以下步骤进行操作：

1. 安装 Kind CLI

按照 [文档](https://kind.sigs.k8s.io/docs/user/quick-start/#installation) 的说明将 **kind** 安装到你的本地机器上

2. 创建名为 `kubeagi` kind 集群

在 [`kubeagi/arcadia`](https://github.com/kubeagi/arcadia) 的根目录下

运行命令：

```shell
make kind
```

现在您已经有一个正在运行的 kind 集群了！

## 创建启用 GPU 的 Kind 集群

`Kind` 默认情况下不支持使用 GPU 但是幸运的是一群厉害的发现了 [**解决方法**](https://github.com/kubernetes-sigs/kind/pull/3257#issuecomment-1607287275)。

这个文档介绍如何做：

1. 创建一个可以利用 GPU 的 kind 集群
2. 安装 [`Nvidia GPU-Operator`](https://github.com/NVIDIA/gpu-operator) 来管理 kubernetes 集群中的 GPU

#### 预先准备

- [Docker](https://www.docker.com/)
- [Nvidia Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html)

#### 创建 kind 集群

1. 配置 docker 来使用 nvidia runtime

编辑 `/etc/docker/daemon.json` 文件来配置默认的 docker runtime

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

在更新 docker runtime 时后重新启动 docker

```shell
sudo systemctl restart docker
```

2. 配置 nvidia container runtime

在 `/etc/nvidia-container-runtime/config.toml` 文件中设置 `accept-nvidia-visible-devices-as-volume-mounts = true`

3. 安装 Kind CLI

请按照 [文档](https://kind.sigs.k8s.io/docs/user/quick-start/#installation) 的说明在本地机器上安装 **kind**

4. 创建名为`kubeagi` 的 kind 集群

在 [`kubeagi/arcadia`](https://github.com/kubeagi/arcadia) 的根目录下

运行命令：

```shell
make kind
```

在创建 kind 容器时，将 `ldconfig` 链接到 kind 容器中的 `ldconfig.real` 。

```shell
docker exec -ti kubeagi-control-plane ln -s /sbin/ldconfig /sbin/ldconfig.real
```

5. 安装 Nvidia GPU-Operator

To make it more easy to install `GPU Nvidia GPU-Operator` in kubernetes,we can use another tool [kubebb core](https://github.com/kubebb/core) to:
为了更方便地在 kubernetes 中安装 `GPU Nvidia GPU-Operator`，我们可以使用另一个工具 [kubebb core](https://github.com/kubebb/core) ：
```shell
helm repo add nvidia https://helm.ngc.nvidia.com/nvidia
helm repo update
helm install --generate-name \
     -n gpu-operator --create-namespace \
     nvidia/gpu-operator --set driver.enabled=false
```

 检查安装状态：

```shell
kubectl get pods -ngpu-operator --watch
```