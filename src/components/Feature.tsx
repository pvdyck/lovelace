import React from 'react';
import {
  featureContainer,
  featureTextContainer,
  featureLogo
} from './styles/feature.module.less';

const Feature = (props: any) => {
  const { text, Icon } = props;

  return (
    <div className={featureContainer}>
      <img src={Icon} className={featureLogo} />
      <div className={featureTextContainer}>{text}</div>
    </div>
  );
};

export default Feature as any;
