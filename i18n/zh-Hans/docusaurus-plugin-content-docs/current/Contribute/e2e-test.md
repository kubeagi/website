---
sidebar_position: 3
title: e2e 测试
sidebar_label: e2e 测试
---

<!--如何进行 e2e 测试以验证您的代码-->

KubeAGI 的整体测试分为代码正确性检查和 e2e 测试。代码正确性检查包括代码格式检查、CRD 验证和 LLM 工作流等。 e2e 测试确保 KubeAGI 的基本功能能够正常工作。

* 执行测试
    ```shell
    bash tests/example-test.sh
    ```

### 从 Github
您只需将代码推送到 github，github 操作就会自动创建环境并执行测试。
