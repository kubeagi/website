---
sidebar_position: 2
title: Run LLM App using Streamlit
sidebar_label: Run LLM App using Streamlit
---

## 为您的命名空间启用 Streamlit
我们使用 Streamlit 作为进行数据分析和 LLM 应用程序开发的工具，并且我们可以为每个命名空间创建单独的 Streamlit 环境，以实现更好的隔离性。

1. 要为您的命名空间启动 Streamlit ，请将 ```kubeagi.k8s.com.cn/streamlit.installed: "true"``` 添加到该命名空间中
```yaml
apiVersion: v1
kind: Namespace
metadata:
  annotations:
    # enable streamlit for this namespace
    # change the value to 'false' will delete all resources related to this streamlit environment
    kubeagi.k8s.com.cn/streamlit.installed: "true"
  creationTimestamp: "2023-12-08T02:36:26Z"
```
然后，在该命名空间下将创建用于 Streamlit 的 deployment、service 和 ingress
## 访问 Streamlit
1. 使用命令 ```kubectl get ing streamlit-app -n <your-namespace> -o yaml``` 来检查 Streamlit 的入口配置

2. 它将具有类似于 ```/chats/<your-namespace>``` 的上下文路径，其中 /chats 是在 kubeagi-system 的 arcadia-config configMap 中配置的全局上下文

因此，您可以使用类似于 ```https://portal.172.40.20.125.nip.io/chats/<your-namespace>``` 的地址访问 Streamlit


## 自定义您的 Streamlit 应用程序
根据 Streamlit 的设计，我们可以使用 Python 脚本轻松自定义 Streamlit 应用程序
1. 检查您的 Streamlit Pod
```shell
# get the pod
kubectl get pods -n <your-namespace>
# copy python script to your streamlit pages directory
# you can find some samples under examples/app-ui-using-streamlit directory
kubectl cp your-demo-streamlit-app.py <pod-name>:/app/pages/
```

2. 然后使用 ```https://portal.172.40.20.125.nip.io/chats/<your-namespace>/your-demo-streamlit-app``` 访问应用程序
