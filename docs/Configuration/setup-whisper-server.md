---
sidebar_position: 5
title: Setup Whisper Service
sidebar_label: Setup Whisper Service
---

We need to setup a whisper service to transcribe audio to text, so we can use the context in the audio file as the context in the latter conversation.

We use ```onerahmet/openai-whisper-asr-webservice:latest-gpu``` image to setup the whisper service, refer to [this project](https://github.com/ahmetoner/whisper-asr-webservice) for details. You can also use ```onerahmet/openai-whisper-asr-webservice:latest``` if you don't have GPU resource, but it'll have low performance.

Run the service using K8s under kubeagi-system namespace.

```shell
# create the deployment
kubectl  create deploy whisper-apiserver --image=onerahmet/openai-whisper-asr-webservice:latest-gpu  -n kubeagi-system 
# create the service
kubectl  expose deploy whisper-apiserver --port=9000 -n kubeagi-system
```

Then the service will be available using endpoint ```whisper-apiserver.kubeagi-system:9000/asr```, and this will be the default address that whisper document loader will use to transcribe audio to text.

### Advanced Configration
It'll use openai_whisper by default, but you can use environment variables to use fast_whisper like below:
```
ASR_ENGINE=faster_whisper
ASR_MODEL=/data/models/whisper/large-v3 # mount /data/models/whisper/ to /tmp/whisper in the container
```
Get the models from [huggingface](https://huggingface.co/Systran/faster-whisper-large-v3).

When you use DocumentLoader in your application, and input .mp3 or .wav files when call this applicaiton, the whisper document loader will call this API to get text from audio. Refer to [DocumentLoader](../Concepts/documentloader.md) for details.
