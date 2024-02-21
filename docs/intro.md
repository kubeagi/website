---
sidebar_position: 1
title: Introduction
sidebar_label: Introduction
---
# Arcadia: A diverse, simple, and secure one-stop LLMOps platform

## What is Arcadia?

**Arcadia** comes from [Greek mythology](https://www.greekmythology.com/Myths/Places/Arcadia/arcadia.html)(a tranquil and idyllic region, representing harmony, serenity, and natural beauty). We aim to help everyone find a more perfect integration between humans and AI.

To achieve this goal, we provide this one-stop LLMOps solution. Furthermore, we can easily host **Arcadia** at any Kubernetes cluster as production ready by integrating [kubebb](https://github.com/kubebb)(Kubernetes building blocks).

## Features

* Multi-tenant isolation (data, model services), built-in OIDC, RBAC, and auditing, supporting different companies and departments to develop through a unified platform
* Kubernetes native AGI agent orchestration
* Built on langchaingo(golang), has better performance and maintainability
* Support distributed inference using Ray
* Support quality and performance evaluation of AGI agent under different configurations
* A development and operational platform for AI agents, along with an AI agent portal for end-users
* Developed based on micro frontends and low-code approach, allowing for quick scalability and integration

## Architecture

Our design and development in Arcadia design follows operator pattern which extends kubernetes APIs.

![Arch](./../static/img/kubeagi.drawio.png)
