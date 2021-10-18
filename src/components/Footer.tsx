import './styles/Footer.less';
import React from 'react';
import Twitter from '../assets/svg/twitter.svg';
import Telegram from '../assets/svg/telegram.svg';
import Medium from '../assets/svg/medium.svg';
import Discord from '../assets/svg/discord.svg';

const Footer = () => {
  const redirectTo = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className='footerContainer'>
      <span className='footerRights'>©2021 Lovelace All rights reserved.</span>
      <div className='footerSocialMediaGroup'>
        <img
          onClick={() => redirectTo('https://twitter.com/lovelacemaas')}
          src={Twitter}
          className='socialMediaIconFooter'
        />
        <img
          onClick={() => redirectTo('https://t.me/lovelaceofficial')}
          src={Telegram}
          className='socialMediaIconFooter'
        />
        <img
          onClick={() => redirectTo('https://lovelaceworld.medium.com/')}
          src={Medium}
          className='socialMediaIconFooter'
        />
        <img
          onClick={() => redirectTo('https://discord.com/invite/6w49dSAd5M')}
          src={Discord}
          className='socialMediaIconFooter'
        />
      </div>
    </div>
  );
};

export default Footer as any;
