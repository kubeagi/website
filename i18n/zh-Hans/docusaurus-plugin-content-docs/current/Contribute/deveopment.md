---
sidebar_position: 2
title: 创建一个 Operator 项目
sidebar_label: 创建一个 Operator 项目
---

# 创建一个 Operator 项目

## 初始化一个 Operator 项目

```bash
bash hack/install-operator-sdk

operator-sdk init --domain kubeagi.k8s.com.cn --component-config true --owner kubeagi --project-name arcadia --repo github.com/kubeagi/arcadia
```

## 创建一个 CRD

```bash
operator-sdk create api --resource --controller --namespaced=true --group arcadia --version v1alpha1 --kind Laboratory
```

### 在 CRD 发生变化后重新生成

```bash
make generate && make manifests
```

### 基础控制器协调

`// 注意:` 为便于理解，无需将其写入源文件。

```go
func (r *KnowledgeBaseReconciler) Reconcile(ctx context.Context, req ctrl.Request) (result ctrl.Result, err error) {
	logger := ctrl.LoggerFrom(ctx)
	logger.V(1).Info("Start KnowledgeBase Reconcile") // Note: V(1) means debug log level
	kb := &arcadiav1alpha1.KnowledgeBase{}
	if err := r.Get(ctx, req.NamespacedName, kb); err != nil {
		// There's no need to requeue if the resource no longer exists.
		// Otherwise, we'll be requeued implicitly because we return an error.
		logger.V(1).Info("Failed to get KnowledgeBase")
		return ctrl.Result{}, client.IgnoreNotFound(err)
	}
	logger = logger.WithValues("Generation", kb.GetGeneration(), "ObservedGeneration", kb.Status.ObservedGeneration, "creator", kb.Spec.Creator) // Note: add log value is optional
	logger.V(1).Info("Get KnowledgeBase instance")

	// Add a finalizer.Then, we can define some operations which should
	// occur before the KnowledgeBase to be deleted.
	// More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/finalizers
	if newAdded := controllerutil.AddFinalizer(kb, arcadiav1alpha1.Finalizer); newAdded {
		logger.Info("Try to add Finalizer for KnowledgeBase")
		if err = r.Update(ctx, kb); err != nil {
			logger.Error(err, "Failed to update KnowledgeBase to add finalizer, will try again later")
			return ctrl.Result{}, err
		}
		logger.Info("Adding Finalizer for KnowledgeBase done")
		return ctrl.Result{Requeue: true}, nil
	}

	// Check if the KnowledgeBase instance is marked to be deleted, which is
	// indicated by the deletion timestamp being set.
	if kb.GetDeletionTimestamp() != nil && controllerutil.ContainsFinalizer(kb, arcadiav1alpha1.Finalizer) {
		logger.Info("Performing Finalizer Operations for KnowledgeBase before delete CR")
		// TODO perform the finalizer operations here, for example: remove vectorstore data?
		logger.Info("Removing Finalizer for KnowledgeBase after successfully performing the operations")
		controllerutil.RemoveFinalizer(kb, arcadiav1alpha1.Finalizer)
		if err = r.Update(ctx, kb); err != nil {
			logger.Error(err, "Failed to remove finalizer for KnowledgeBase")
			return ctrl.Result{}, err
		}
		logger.Info("Remove KnowledgeBase done")
		return ctrl.Result{}, nil
	}
	
    // Note: do you logic here

	return result, err
}
```

### 更新 helm 依赖项
如果更新了 deploy/charts/arcadia 软件包的 helm 依赖关系，则应运行 ```helm dependency update```，它将更新 Chart.lock，否则 helm 软件包将在构建阶段失败。