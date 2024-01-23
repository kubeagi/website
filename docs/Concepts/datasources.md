---
sidebar_position: 2
title: Datasources
sidebar_label: Datasources
---

Datasource is used to manage and view platform data sources. As a unified data entry for LLMOps, data such as training data, test data, and knowledge base files must be preferentially connected to data sources for reference by other modules. 

Datasources support Object storage, MySQL, MongoDB, Data API etc.

Management of data sources is achieved by defining a CRD Datasource. The datasources provide data access capabilities so that when building an Arcadia dataset and selecting a dataset file, they can provide a list of data files to query and the ability to download the data files.

### Datasources categories
According to the types of datasources themselves, they can be broadly categorized into two categories:
* Storage datasources, including Object storage service (OSS), relational databases (MySQL, PostgreSQL), non-relational databases (MongoDB) etc.
* Real-time data sources, including Google Search, OpenAPI etc.

According to the source of the data services, they can be broadly categorized into two categories:
* System Data Sources: Data is sourced from within Arcadia and is stored in Minio (OSS) objects by default.
* Third-Party Data Sources: Data provided by third-party data services that are deployed or acquired by the user's own data source services.
  
A single project (namespace) corresponds to a bucket, and each bucket contains two subdirectories by default:
* dataset: used to store datasets files.
* model: used to store models files.

The storage structure in MinIO organized by project is illustrated in the following diagram:

![](./images/2024-01-05-15-01-34.png)
