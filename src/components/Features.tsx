import React, {useState} from 'react';
import images from '../assets';
import ToggleSwitch from './ToggleSwitch.tsx'

import {
  featuresBoxContainer,
  featureContainer,
  featureTitleContainer,
  featureDescription,
  // featureTextContainer,
  // featureContentContainer,
  featureLogo
} from './styles/feature.module.less';

const features = [
  {
    title: 'NFT marketplace',
    image: images.Nft,
    creator: 'Present and sell NFTs',
    fan: 'Discover and trade NFTs'
  }, {
    title: 'Smart contracts',
    image: images.SmartContract,
    creator: 'Mint and add utility to NFTs, incl. DeFI attributes',
    fan: 'Stake, borrow and lend NFTs for rewards'
  }, {
    title: 'Play to earn gaming engines',
    image: images.PlayToEarn,
    creator: 'Create your own blockchain mini-games',
    fan: 'Play and earn rewards'
  }, {
    title: 'Partner integrations',
    image: images.Partners,
    creator: 'Integrate your NFTs and games across the metaverse',
    fan: 'Receive benefits across the metaverse for holding NFTs '
  }, {
    title: 'Launchpad ',
    image: images.LaunchPad,
    creator: 'Raise awareness and capital, and launch your blockchain game or NFT collection',
    fan: 'Participate in metaverse shaping projects'
  }, {
    title: 'Cardano connector',
    image: images.Cardano2,
    creator: 'Enable the porting of Ethereum NFTs to Cardano and other blockchains to increase value and community size',
    fan: 'Port your Ethereum NFTs to Cardano and other blockchains to increase value and earn rewards'
  }
]

const Feature = (props: any) => {
  let [isCreator, setCreator] = useState(false);
  const onCreatorChange = (checked:boolean) => {
    setCreator(checked);
  }
  return (
    <div>
      <ToggleSwitch name='newsletter' checked={ isCreator } onChange={ onCreatorChange }/>
      <div className={featuresBoxContainer}>
        { features.map((feature:any) => {
          return (
            <div className={featureContainer} key={feature.title}>
              <img src={feature.image} className={featureLogo} />
              <div>
                <div className={featureTitleContainer}>{feature.title}</div>
                  {!isCreator && (
                    <div className={featureDescription}>{feature.creator}</div>
                  )}
                  {isCreator && (
                    <div className={featureDescription}>{feature.fan}</div>
                  )}
              </div>
            </div>
          )})
        }
      </div>
    </div>
  );
};

export default Feature as any;
