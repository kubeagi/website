---
sidebar_position: 4
title: Models
sidebar_label: Models
---

Model 是对模型仓库的资源定义，用来管理用户训练好的模型，用于后续的模型服务部署。

* 定义规范

```golang
// ModelSpec defines the desired state of Model
type ModelSpec struct {
    // Creator defines dataset creator(AUTO-FILLED by webhook)
    Creator string `json:"creator,omitempty"`

    // DisplayName defines dataset display name
    DiplayName string `json:"displayName"`

    // Description defines datasource description
    Description string `json:"description,omitempty"`

    // Type defines what kind of model this is
    Type ModelType `json:"type,omitempty"`

    // TODO: extend model to utilize third party storage sources
    // Source *TypedObjectReference `json:"source,omitempty"`
    // // Path(relative to source) to the model files
    // Path string `json:"path,omitempty"`
}

// ModelStatus defines the observed state of Model
type ModelStatus struct {
    // ConditionedStatus is the current status
    ConditionedStatus `json:",inline"`
}

//+kubebuilder:object:root=true
//+kubebuilder:subresource:status

// Model is the Schema for the models API
type Model struct {
    metav1.TypeMeta   `json:",inline"`
    metav1.ObjectMeta `json:"metadata,omitempty"`

    Spec   ModelSpec   `json:"spec,omitempty"`
    Status ModelStatus `json:"status,omitempty"`
}
```

* 模型管理核心流程
1. 用户创建 CR Model，仅包含展示名、描述信息
2. 用户上传模型文件到对应的模型文件目录，如下：
如果 model.metadata.name 为 chatglm2-6b，创建在命名空间 kubeagi-test 下，则模型文件则需要上传到:
    - bucket:  kubeagi-test 
    - object：  model/chatglm2-6b/ 
3. 更新 model 的 Type 字段，重新触发 operator 的更新逻辑，重新验证模型存储状态
