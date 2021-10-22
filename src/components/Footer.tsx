import React from 'react';
import SocialShare from './SocialShare';
import {
  footerContainer,
  footerRights
} from './styles/footer.module.less';

const Footer = () => {
  const redirectTo = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className={footerContainer}>
      <span className={footerRights}>©2021 Lovelace All rights reserved.</span>
      <SocialShare />
    </div>
  );
};

export default Footer as any;
