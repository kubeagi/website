---
sidebar_position: 2
title: Installation
sidebar_label: Installation
---

This document will introduce how to install Arcadia on a Kubernetes cluster quickly.
We assume you already read the [prerequsities](./prerequisites.md).

## Install

1. Clone the code repoistory

```shell
git clone https://github.com/kubeagi/arcadia.git
```

2. Enter the working directory

```shell
cd deploy/charts/arcadia
```

3. Edit the `values.yaml`

> See [chart parameters](https://github.com/kubeagi/arcadia/tree/main/deploy/charts/arcadia/values.yaml) for advanced customization.

* Replace ```<replaced-ingress-nginx-ip>``` to the ip of ingress nginx

4. Install arcadia

```shell
helm install arcadia -n kubeagi-system --create-namespace  .
```

Check if all pods will be ready

```shell
kubectl get pods -n kubeagi-system
```

5. Access the Portal

Visit `https://portal.<replaced-ingress-nginx-ip>.nip.io` and use proper user to login, same as how kubebb works!

## Uninstall

1. Remove arcadia

```shell
helm uninstall arcadia -n kubeagi-system
```

## Some notes

1. Expose minio console to visit your data, you can enable *minio.ingress.console* and access the console from ```https://minio-console.<replaced-ingress-nginx-ip>.nip.io```

2. Minio API will be exposed, as *minio.ingress.api* will be enabled by default. And files will be uploaded using MinIO API directly. API address is ```https://minio-api.<replaced-ingress-nginx-ip>.nip.io```
