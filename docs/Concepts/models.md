---
sidebar_position: 4
title: Models
sidebar_label: Models
---

Model is a resource definition for a model repository to manage user-trained models for subsequent deployment of model services.

* Definition Specification

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

* Core Process of Model Management
1. User creates a CR Model, which contains only the display name and description information.
2. User uploads the model file to the corresponding model file directory, e.g. if model.metadata.name is chatglm2-6b, which is created under the namespace kubeagi-test, then the model file needs to be uploaded to：
    - bucket: kubeagi-test 
    - object: model/chatglm2-6b/ 
3. Update the Type field of the model to re-trigger the operator's update logic and re-validate the model storage state.
