---
sidebar_position: 2
title: QuickStart
sidebar_label: Quick Start
---

How to quickly build a knowledge base application will be described here.

## Preparation/Pre-requisites
- Preparation of a knowledge base corpus file is required, currently supporting only PDF and DOCX formats.
- If you don't want to use the built-in models, you need to prepare model files.
- If you want to deploy a local model service, you need to prepare arithmetic resources.
- If integrating with an external model service, the following information of the external model service needs to be prepared: Vendor (currently supporting only Zhipuai, OpenAI, Baichuan), service address, and token.
## Operational Flowchart
Create knowledge bases
![Fig. 0](images/c5378e38ea5f8bc5011bddb40fb16ac39f46472fc51e432744ebe0af9e515e26.png)

## Operation Steps
### Step 1: Create a Model
In the platform, we have pre-built common open-source models such as: qwen-7b-chat, baichuan2-7b and so on. (For specific pre-built models, please refer to the Built-in Models documentation)
If you are using the pre-built models, you can skip this step after logging into the platform.
If you do not want to use the pre-built models, you need to prepare your own model file and upload it to the model repository. Follow the steps below:
1. Go to the Model Repository page and click the【新增模型】button to access the model creation page. Fill in the required information on the model creation page. Click【确认】 to create the model.
![Fig. 1](images/a777ddb0e9fab429ab937d0e707c5d1bd5de40fc59c05441f6eac52e377f5777.png) 

2. After creation, go to the model details page and upload model files in Model Files. Uploading folders is supported.
   ![Fig. 2](images/3379069b62f9a33281ef5dd9c1649601c605788e3d919d3879a1f8841292f8df.png)


**Note:**
* When uploading files, certificate authentication may be required. When the pop-up window prompts that the certificate is not trusted, click the link to manually authenticate the certificate, and then return to the page to upload the file again.

3. Other model operations
  - Deployment: Go to the "模型服务/新增模型服务" page.
  - Edit: Support editing basic information.
  - Delete

4. Built-in models support deployment only, do not support editing, deleting, uploading files, deleting files.

5. Model descriptions and model files can be viewed on the model details page.
![Fig. 3](images/02905fa510ab28208e961316fce2590558f7689030b97837ddf103cd4b6587e3.png)


### Step 2: Add Model Service
1. Enter the Model Services page and click the【新增模型服务】button to enter the Add Model Service page.
   When deploying a local model service, you need to select the corresponding model and configure the service specifications. After you finish filling in the form, click the【确定】button to complete the creation operation.
![Fig. 5](images/9501a487af304a69b34b2a76435610624868be260dd57e43bf7da4505142e104.png)

2. Model service information can be viewed on the Model Service Details page.
![Fig. 6](images/17b40812c628d726d89ce07f1c8f7802da66396d3696074c8c20dd76cce3f357.png)


3. Other operations of the model service
  * Online/Offline
  * Edit
  * Delete                                           

### Step 3: Create a dataset
1. After logging in the platform, enter the dataset page, click the【新增数据集】button to enter the new dataset page, fill in the basic information and click【确认】.
  * Datasets support version management, when adding a new dataset, it will add v1 version by default.
  * If you want to add other versions, click【新增版本】in the dataset list. The new version will continue the previous version number.
![Fig. 7](images/49f6ce23d73389df7d25f2b578c67375eb804f41ab7d89a38a5309c397f64bfd.png)

![Fig. 8](images/e771987377e65f07cfc37c5f3c2e7c4c140b627a2bad19abb710888aa584cd9c.png)

2. After successfully adding a new dataset, import the file in the dataset version details. Click【新增文件】to upload the prepared pdf or docx file. 
![Fig. 9](images/f296d59658955fc6c39ea63bdcb19cf7f735cbf21fca06c0b5152dac08877c08.png)

![Fig. 10](images/87433826c32fb12d18c6066c07be2edeef6d263980bdfebec871fe8c92ed3539.png)

**Note:**
* Certificate authentication may be required when uploading files. When a pop-up window prompts that the certificate is not trusted, click the link to manually authenticate the certificate, and then return to the page to upload the file again.

3. Other Operations of Datasets
  * Support adding dataset versions
  * Support importing new data for dataset versions
  * Support viewing CSV-format dataset files (i.e. files processed through QA data splitting, detailed in the "Data Processing" module)
  * Support deleting dataset versions
  * Support deleting datasets

### Step 4: Data Processing
1. After creating a dataset and uploading files, you can perform data processing operations on the dataset files. Go to the data processing page and click on 【创建处理任务】.

![Fig. 11](images/2c24f874e049d9b8e922906ef19103c1a70adbf4c7b88abfd9d3295706f28d8b.png)


2. Fill in the basic information for the task and select the files to be processed.
![Fig. 12](images/00403fdd9555db2fb42d56dd0d3ce4134d8a9154a0627dfdfa605591576a54b5.png)

![Fig. 13](images/343d9d3b0d04176f54840af284c46a68e55942487672392169b593db1643ec84.png)

**Note:**
* Pre-processing Dataset: Select the dataset you want to process.
* Post-processing Dataset: Choose where to store the processed files in which dataset/version. By default, the processed files will be stored in the source dataset/version v0.1.0.

3. After selecting the dataset files, choose the processing configuration.
![Fig. 14](images/e922d6aa7b3e7989ada9aca5f3be8a5d0d174be2161fea453f9efc3324aeb4ca.png)

![Fig. 15](images/c5525f7036efdb65ed81038b0283d6bbf3d3c3a85a31cdd1fd7a4d21a20ec6c5.png)

**Note:**
* Turn on the switch to indicate that you want to perform this processing. Turn off the switch, and the task will not perform this processing. At least one configuration must be selected, and the QA splitting switch is enabled by default.
* When performing QA splitting, you need to select a model service.
* After QA splitting, a new CSV file will be generated, containing the split QAs. 
You can view the details of the newly generated CSV file in the “数据集/数据集版本详情” section.

4. After completing the configuration, you can enter the configuration preview page. Please note that the content here is not the actual result of data processing but rather a data processing sample. Click the【完成】button to create the data processing task.

![Fig. 16](images/7bec0d9e4945b9224bf06e59ba27cd35a976a1fba1ef241a1e056f0c0155c449.png)


5. You can view the task progress and result preview on the data processing details page.
![Fig. 17](images/f7c0395a97bd92ed0cf08b72d08552c1198a1d3a5be5047bb930932789fc0290.png)


6. Other Operations of Data Processing
  * Support task deletion. If a task is in progress, deleting the task will also delete the processed files. If a task has been completed, deleting the task will not affect the processed data.


### Step 5: Build Knowledge Bases
After deploying the model service and processing the dataset data, you can build a knowledge base. The specific steps are as follows:
1. Go to the knowledge base page and click on【新增知识库】to enter the new knowledge base page.
![Fig. 18](images/ca147743ee38f760d93f73404c05cb013cbac55150a1057edab9aaab356ec01a.png)

2. Fill in the basic information, select the vectorization model, and choose the specific corpus files.

3. Click the【确认】button to create the knowledge base successfully.

![Fig. 19](images/bd4767356046d4ff08d8a7f86a40976410482b1ff9234453203e6fe1cd43d6dc.png)


4. You can view the file list and the processing status of files in the knowledge base details.
![Fig. 20](images/a6368f70f5c7b8fff6aee9226f908cd3a718735db151db7a6f32c4df731fe31a.png)

**Note:**
* After the knowledge base is created, the platform will automatically perform vectorization processing on the files (for QA format files, the Q will be vectorized) and store them in the vector database.

At this point, the knowledge base construction is complete. The next step is to perform the creation of the model application and start experiencing the power of generative AI.
