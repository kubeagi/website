---
sidebar_position: 10
title: DocumentLoaders
sidebar_label: DocumentLoaders
---

We support the following kinds of DocumentLoaders to handle various document, audio files including

* pdf
* csv
* html/htm
* .mp3
* .wav


We can use DocumentLoader resource to define it, for example:
```yaml
apiVersion: arcadia.kubeagi.k8s.com.cn/v1alpha1
kind: DocumentLoader
metadata:
  name: audo-handler
  namespace: kubeagi-test
spec:
  chunkOverlap: 20
  chunkSize: 100
  displayName: transcribe mp3 to txt
  fileExtName: .mp3 # we can define the file extension or leave it empty to use the extension from the file name
```
Then in the application, we can refer to this document loader to handle the files that will be used when run the application:
```yaml
...
  - description: Use documents as the input of chat context
    displayName: mp3-loader
    name: mp3-loader
    nextNodeName:
    - chain-node
    ref:
      apiGroup: arcadia.kubeagi.k8s.com.cn
      kind: DocumentLoader
      name: mp3-loader
...
```

Then you should add a ```files``` value as the input to call /chat API.

```shell
curl -k -H "Authorization: bearer xxx" -XPOST https://portal.172.40.20.125.nip.io/kubeagi-apis/chat --data '{"query":"Write a meeting minutes based on the context","files":["meeting-minutes.mp3"],"response_mode":"blocking","conversion_id":"","app_name":"test", "app_namespace":"kubeagi-test"}'
```

