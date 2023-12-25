import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

import Translate, {translate} from '@docusaurus/Translate';

const FeatureList = [
  {
    title: <Translate>End-to-End Lifecycle Management</Translate>,
    Svg: require('@site/static/img/easy-to-use.svg').default,
    description: (
      <>
        <Translate>Provide comprehensive management capabilities throughout the entire lifecycle of language models, including data preparation, model training, deployment, and monitoring</Translate>
      </>
    ),
  },
  {
    title: <Translate>Kubernetes Native</Translate>,
    Svg: require('@site/static/img/design-to-extend.svg').default,
    description: (
      <>
        <Translate>Designed and built using native Kubernetes features, including OIDC, RBAC, Operator, multi-tenant etc ..., can seamlessly integrate with existing Kubernetes clusters and infrastructure</Translate>
      </>
    ),
  },
  {
    title: <Translate>Versioning and Experiment Tracking</Translate>,
    Svg: require('@site/static/img/scheduling-scaling.svg').default,
    description: (
      <>
        <Translate>Allow experiments and evaluations, enables reproducibility, comparison of different model versions, and efficient collaboration among team members.</Translate>
      </>
    ),
  },
  {
    title: <Translate>Monitoring and Logging</Translate>,
    Svg: require('@site/static/img/trigger-action.svg').default,
    description: (
      <>
        <Translate>Robust monitoring and logging functionalities, allowing users to track model performance, resource utilization, and other relevant metrics</Translate>
      </>
    ),
  },
  {
    title: <Translate>Automation and Orchestration</Translate>,
    Svg: require('@site/static/img/out-of-box-plugins.svg').default,
    description: (
      <>
       <Translate>Provide automation and orchestration capabilities, streamlining the end-to-end workflow of language model development and deployment</Translate>
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
