---
sidebar_position: 1
title: 准备和开始
sidebar_label: 准备和开始
---
# 准备并开始为 KubeAGI 做贡献

**欢迎来到 KubeAGI！**

我们鼓励您通过报告问题、改进文档、修复错误或添加新功能来帮助我们。
请您还要查看我们的 [行为准则](https://github.com/kubeagi/arcadia/blob/main/CODE_OF_CONDUCT.md)，其中详细说明了作为 KubeAGI 社区的一员，贡献者应如何规范自己的行为。

我们将 KubeAGI 开源，是为了让开发人员有权修复和扩展产品，以更好地满足他们的需求。对于那些愿意花费自己的时间来学习代码库并回馈社区的热情用户，我们感到非常高兴。我们创建了这个文档，以便在支持贡献者的同时，不会牺牲我们用来服务用户和实现社区目标的宝贵资源。

## 报告问题

老实说，我们将 KubeAGI 的每个用户都视为非常友善的贡献者。在使用 KubeAGI 后，您可能对项目有一些反馈。那么请随时提出问题。
在很多情况下，您都可以提出问题：

- 错误报告
- 功能请求
- 性能问题
- 功能建议
- 功能设计
- 寻求帮助
- 文档不完整
- 测试改进
- 关于项目的任何问题
- 等等

此外，我们必须提醒您，在提交新问题时，请记得删除帖子中的 **敏感数据**。
*敏感数据可能包括密码、密钥、网络位置、私人业务数据等。*

## 代码和文档贡献

我们鼓励采取一切行动来改进 KubeAGI。在 GitHub 上，对 KubeAGI 的每一个改进都可以通过 PR（pull request 的缩写）来实现。

- 如果你发现了拼写错误，尝试修复它！
- 如果你发现了 bug，尝试修复它！
- 如果你发现了一些冗余的代码，尝试删除它们！
- 如果你发现一些缺失的测试用例，尝试添加它们！
- 如果你能增强某个功能，请不要犹豫！
- 如果你发现代码不够明确，请尝试添加注释以使其清晰明了！
- 如果你觉得代码不够美观，请尝试重构！
- 如果你能帮助改进文档，那将是再好不过的了！
- 如果你发现文档错误，请纠正它！
- ...

### 工作区准备

要提交 PR，我们假设您已经注册了一个 GitHub ID。然后按以下步骤完成准备工作：

1. **Fork** 要在上面进行工作的存储库，请先将其 Fork 到您的账户下。您只需要在项目存储库主页的右边点击 "Fork" 按钮即可。这样您就会在你的 GitHub 用户名下拥有一个属于你自己的存储库。
2. **Clone** 您自己的存储库到本地进行开发。使用 `git clone https://github.com/<your-username>/arcadia.git` 将存储库克隆到您本地机器上。然后您可以创建新的分支来完成您想要的更改。
3. **Set remote** 远程上游（upstream）为 `https://github.com/kubeagi/arcadia.git` 使用以下两个命令：

   ```bash
   git remote add upstream https://github.com/kubeagi/arcadia.git
   git remote set-url --push upstream no-pushing
   ```

   添加这个设置后，我们可以轻松地将本地分支与上游分支同步。

4. **Create a branch** 来添加新功能或修复问题

   更新本地工作目录：

   ```bash
   cd <project>
   git fetch upstream
   git checkout main
   git rebase upstream/main
   ```

   创建一个新的分支：

   ```bash
   git checkout -b <new-branch>
   ```

   在新分支上进行任何更改，然后构建并测试代码。

### PR 描述

PR 是更改 KubeAGI 项目文件的唯一方式。为了帮助审核人员更好地理解您的目的，PR 描述不能太详细。我们鼓励贡献者按照 [PR 模版](https://github.com/kubeagi/arcadia/blob/main/.github/PULL_REQUEST_TEMPLATE.md)完成拉取请求。

### 开发环境

作为贡献者，如果您想为 KubeAGI 项目做出任何贡献，我们应该就开发环境中使用的工具版本达成一致。以下是一些依赖工具的具体版本：

- Golang : v1.19+
- Kubernetes: v1.21+ for [main](https://github.com/kubeagi/arcadia/tree/main) branch
- kubernetes: 1.18 ~ 1.20, scheduler should use [pre](https://github.com/kubeagi/arcadia/tree/pre) branch

### 开发指南

根文件夹中有一个 `Makefile` 文件，其中描述了构建和安装的选项。下面是一些常见的选项：

```bash
# build binary 
make binary

# delete _output dir
make clean 

# update all (go vendor, codegen, crdgen and so on)
make update

# verify all (shell format, go vendor, codegen, crdgen, file copyright, run golangci-lint and so on)
make verify

# Build image 
make image
```

### 建议

如果您打算贡献一个新的 API 功能，或者需要付出大量努力，请先在 [doc/proposals/](https://github.com/kubeagi/arcadia/blob/main/docs/proposals) 中提交一份提案。

## 参与并提供帮助

我们选择 GitHub 作为 KubeAGI 协作的主要平台。所以 KubeAGI 的最新更新总是在这里。虽然通过 PR做 出贡献是一种明确的方式，但我们仍然呼吁任何其他方式的帮助。

- 如果您可以的话，请回答其他人的问题；
- 帮助解决其他用户的问题；
- 帮助审查其他人的 PR 设计；
- 帮助审查 PR 中的代码；
- 讨论 KubeAGI，以使事情更清晰；
- 在 GitHub 以外的地方推广 KubeAGI 技术；
- 撰写关于 KubeAGI 的博客等。

总之， **任何帮助都是贡献**。


## 加入社区

如果您想加入，请按照以下说明操作：

- 成为 KubeAGI GitHub 组织的成员（见下文）
- 成为 KubeAGI 构建协作或发布团队的一部分
- 成认定为对 KubeAGI 有贡献的个人或组织

### 加入 KubeAGI GitHub 组织

在要求加入社区之前，请先做出少量贡献，以证明您有意继续为 KubeAGI 做出贡献。

- **注意**: 任何人都可以为 KubeAGI 做出贡献，将自己添加为组织成员不是必需的步骤。

有多种方式可以为 KubeAGI 做出贡献：

- 提交PR
- 提交问题报告错误或提供反馈意见
- 在 Slack 或 GitHub 问题上回答问题
- **注意**: 这只包括与 GitHub 相关的贡献方式

当您准备好加入时

- 在 **kubeagi/arcadia** 存储库上[开启一个问题](https://github.com/kubeagi/arcadia/issues/new?assignees=&labels=area%2Fgithub-membership&template=membership.yml&title=REQUEST%3A+New+membership+for+%3Cyour-GH-handle%3E)
- 确保包含的贡献列表代表您在项目上的工作。
- 提及 2 位赞助您成为成员的现有审阅者。
- 批准请求后，管理员会向您发送邀请。
   - 这是一个手动过程，通常每周运行几次。
   - 如果一周过去了还没有收到邀请，请在 DingTalk 或 Slack 上联系管理员。