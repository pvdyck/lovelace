import './styles/Footer.less';
import React from 'react';
import SocialShare from './SocialShare';

const Footer = () => {
  const redirectTo = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className='footerContainer'>
      <span className='footerRights'>©2021 Lovelace All rights reserved.</span>
      <SocialShare />
    </div>
  );
};

export default Footer as any;
