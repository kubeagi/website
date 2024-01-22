---
sidebar_position: 1
title: 安装
sidebar_label: 安装
---
本文档将介绍如何在 Kubernetes 集群上安装 Arcadia。

## 安装并运行 Arcadia

#### 创建或者使用现有的 Kubernetes 集群

首先，需要有一个 Kubernetes 集群，并且必须配置一个 `kubectl` 命令行工具，以便与该集群通信。

Kubernetes版本必须等于或大于 **v1.20.0**。为了检查版本，请使用 `kubectl version --short`

如果还没有集群，请使用以下工具之一创建一个：

* [kind](https://kind.sigs.k8s.io/docs/)
* [kubeadm](https://kubernetes.io/docs/admin/kubeadm/)
* [minikube](https://minikube.sigs.k8s.io/)

#### 使用 helm 安装 Arcadia
1. 克隆代码仓库
```shell
git clone https://github.com/kubeagi/arcadia.git
``` 

2. 获取所需镜像

容器镜像可在 Docker Hub 上获取。如果你的集群可以访问 Docker Hub，你可以将它们拉取并推送到你的镜像注册表或直接使用它们。
```
# image of core controller
docker pull kubeagi/arcadia:v0.1.0
# image of data-processing
docker pull kubeagi/data-processing:v0.1.0
# image of fastchat and its workers
docker pull kubeagi/fastchat:v0.1.0
docker pull kubeagi/fastchat-worker:v0.1.0
# image of minio
docker pull kubeagi/minio:RELEASE.2023-02-10T18-48-39Z
# image of minio client to download objects
docker pull kubeagi/minio-mc:RELEASE.2023-02-10T18-48-39Z
# image of bff-server, contains apiserver and portal
docker pull kubeagi/kubeagi-portal:v0.1.0
# image of vector database using chroma, to be replaced by pgvector
docker pull kubeagi/chroma:0.4.14
# image of streamlit, only used during runtime(not by helm)
docker pull kubeagi/streamlit:v1.29.0

```
3. 安装依赖组件

* 按照下面的文档安装 kubebb

  [install kubebb](http://kubebb.k8s.com.cn/docs/quick-start/quick-install)

* Chromadb、PostgreSQL 和 MinIO 将作为依赖项使用 sub-chart 进行安装。你可以查看 Arcadia 的 charts 文件夹，并且还可以在 values.yaml 文件中禁用其中的一些组件。
4. 创建用于安装 Arcadia 的命名空间
```shell
cd deploy/charts/arcadia
# create the namespace
kubectl create ns kubeagi-system
```

5. 在 run helm install 之前编辑值，我们仅列出必须更新的值如下：
   
* 将 ```<replaced-ingress-nginx-ip>``` 更新为 ingress nginx 的 IP 地址
* 更新 apiserver.oidc 的值，使用 kubebb 的 u4a-component 的配置
* 更新 minio.rootUser、minio.rootPassword 和 minio.persistence.storageClass 的值
* 更新 dataprocess.postgres 下的其他值

```yaml
# NOTE: values that don't need to show was removed from yaml here

# graphql and bff server
apiserver:
  oidc:
    enabled: true
    clientID: bff-client
    issuerURL: https://portal.<replaced-ingress-nginx-ip>.nip.io/oidc
    clientSecret: 61324af0-1234-4f61-b110-ef57013267d6
    masterURL: https://k8s.<replaced-ingress-nginx-ip>.nip.io

minio:
  rootUser: "admin"
  rootPassword: "Passw0rd!"
  persistence:
    enabled: true
    storageClass: "openebs-hostpath"
    size: 30Gi

dataprocess:
  port: 28888
  config:
    llm:
      qa_retry_count: '2'

postgresql:
  enabled: true
  global:
    storageClass: "openebs-hostpath"
    postgresql:
      auth:
        # default username and password
        username: "admin"
        password: "Passw0rd!"
        # default database
        database: "arcadia"
```

6. 运行 helm install 命令来安装资源并启动 Arcadia

```shell
# use --dry-run to test the yaml resources to be deployed
helm install arcadia -n kubeagi-system --dry-run .
# install using helm
helm install arcadia -n kubeagi-system .
# check if all pod will be ready
kubectl get pods -n kubeagi-system
```
7. 完成安装后的后续步骤

* 根据需要更新 Arcadia 的配置文件，请参考 [Configuration](../Configuration/arcadia-config-file.md) 中的文档

* 其他必要步骤
```
TODO
``` 

8. 访问 kubeagi 门户

* 请访问```https://portal.<replaced-ingress-nginx-ip>.nip.io``` 并使用正确的用户进行登录，与 kubebb 的操作方式相同

* 运行你的第一个 LLM 应用程序 *[run llm application](./run-llm-app-using-streamlit.md)*


### 注意事项
1. 暴露 minio 控制台来访问你的数据，你可以启用 *minio.ingress.console* 并从 ```https://minio-console.<replaced-ingress-nginx-ip>.nip.io``` 来访问控制台。

2. Minio API 将被暴露，因为 *minio.ingress.api* 默认被启用。文件将直接使用 MinIO API 上传。 API 地址为 ```https://minio-api.<replaced-ingress-nginx-ip>.nip.io```
   
## 卸载

1. 删除 arcadia

   ```
   $ helm uninstall arcadia -n kubeagi-system 
   ```
