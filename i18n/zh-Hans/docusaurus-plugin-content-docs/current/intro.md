---
sidebar_position: 1
title: 简介
sidebar_label: 简介
---
# Arcadia: 一个多样化、简单易用和安全可靠的一站式LLMOps平台。

## 什么是 Arcadia?

**Arcadia** Arcadia（阿卡迪亚）源自[希腊神话](https://www.greekmythology.com/Myths/Places/Arcadia/arcadia.html)(一个宁静而田园风光的地区，代表着和谐、宁静和自然之美)。我们的目标是帮助每个人在人类和人工智能之间找到更完美的融合。

为了实现这个目标，我们提供这个一站式的LLMOps解决方案。还可以通过集成 [kubebb](https://github.com/kubebb)(Kubernetes building blocks) 轻松地将 Arcadia 部署在任何Kubernetes集群上，以使其具备生产就绪的能力。

## 功能特性

* 多租户隔离（数据、模型服务）、内置OIDC、RBAC和审计功能，支持不同的公司和部门通过统一平台进行开发
* Kubernetes 原生的 AI 智能体编排
* 构建在 langchaingo（使用 Golang 语言）之上，系统具有更好的性能和可维护性
* 支持使用 Ray 进行分布式推理
* 支持在不同配置下对 AI 智能体进行质量和性能评估
* 具备 AI 智能体的开发和运营平台，以及为最终用户提供的 AI 智能体门户
* 基于微前端和低代码模式进行开发，使平台具备快速的可扩展性和集成性

## Architecture

我们在 Arcadia 设计和开发中采用了 Operator模式，并扩展了 Kubernetes 的资源及API。

![Arch](../../../../static/img/kubeagi.drawio.png)
