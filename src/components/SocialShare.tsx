import './styles/socialShare.less';
import React from 'react';
import Twitter from '../assets/svg/twitter.svg';
import Telegram from '../assets/svg/telegram.svg';
import Medium from '../assets/svg/medium.svg';
import Discord from '../assets/svg/discord.svg';

const SocialShare = () => {
  const redirectTo = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className='socialMediaGroup'>
      <img
        onClick={() => redirectTo('https://twitter.com/lovelacemaas')}
        src={Twitter}
        className='socialShareIcon'
      />
      <img
        onClick={() => redirectTo('https://t.me/lovelaceofficial')}
        src={Telegram}
        className='socialShareIcon'
      />
      <img
        onClick={() => redirectTo('https://lovelaceworld.medium.com/')}
        src={Medium}
        className='socialShareIcon'
      />
      <img
        onClick={() => redirectTo('https://discord.com/invite/6w49dSAd5M')}
        src={Discord}
        className='socialShareIcon'
      />
    </div>
  );
};

export default SocialShare as any;
