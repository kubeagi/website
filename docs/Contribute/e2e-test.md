---
sidebar_position: 3
title: e2e Test
sidebar_label: e2e Test
---

<!--How to do e2e test to verify your code.-->

The overall test of KubeAGI is divided into code correctness check and e2e test. The code correctness check include code formatting checks, CRD verification, and LLM workflow, etc.  The e2e test ensures that the KubeAGI can work normally for the basic funcationalities.

* Execute the test
    ```shell
    bash tests/example-test.sh
    ```

### From Github
You just need to push the code to github and the github action will automatically create the environment and execute the tests.
