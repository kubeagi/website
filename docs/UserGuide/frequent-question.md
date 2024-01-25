---
sidebar_position: 10
title: Frequent Question
sidebar_label: Frequent Question
---

### Q1: Why is data processing necessary?
A: Data processing is performed on dataset files for two main reasons:
1. In the data processing module, data cleaning can be done on the uploaded files, which includes anomaly processing, de-privacy processing, and other preprocessing tasks. This ensures the usability and security of the data.
2. To ensure the quality of the QA applications built on the knowledge base, it is preferable to have data in QA format. When users upload files in regular document formats (e.g. pdf, docx), the data processing module allows users to split the file into QA pairs.

### Q2: Is data processing necessary to create a knowledge base?
A: No, it is not mandatory. In the current version, to ensure the quality of the QA, the knowledge base has better support for CSV files (containing QA content) compared to other file formats. If you do not perform data processing, the knowledge base will directly associate with the original file, resulting in lower QA quality. Therefore, we recommend processing the original file to extract QA pairs, allowing for more accurate searching of the desired knowledge content.

### Q3: If I upload a CSV file, do I still need to perform data processing?
A: If you upload a CSV file directly, you do not need to perform QA pair extraction since the data is already in the appropriate format. However, please ensure that the CSV file adheres to the QA content format, meaning it should have two columns where the first column represents questions (Q) and the second column represents answers (A). Files that do not conform to this format cannot be processed in the current version.
