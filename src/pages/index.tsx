import React, { useRef, useState, useEffect } from 'react';
import images from '../assets';
import Feature from '../components/Feature';
import Layout from '../components/Layout'
import './App.less';
import loadable from '@loadable/component';
const success = loadable(() => import('../components/Success'))

const RootIndex = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const onSignUp = () => {
    if (!email.includes('@') || !email.includes('.')) {
      setEmailError('Invalid Email Address');
      return;
    }

    setEmailError('Signing Up ...');

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        email: email,
      }),
    };

    fetch(
      'https://us-central1-btest-b5e90.cloudfunctions.net/api/addSubscription',
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        success.showSuccess({
          text: 'You are now successfully subscribed!',
          isError: false,
        });
        setEmailError('');
      })
      .catch((e) => {
        console.log(e);
        success.showSuccess({
          text: 'Something went wrong, please try again',
          isError: true,
        });
        setEmailError('');
      });
  };

  return (
    <Layout>
      <div className='landingContainer'>
        <div className='landingTextContainer'>
          <h1 className='landingBoldText'>DeFi-Enabled NFT Marketplace</h1>
          <div className='centeredRow centeredCol'>
            <h2 className='landingLightText'>For Cardano</h2>
            <img
              className='cardanoLogo'
              src={images.CardanoSVG}
              alt='Cardano'
            />{' '}
          </div>

          <div className='signUpButtonContainer'>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className='emailInputStyle'
              placeholder='Enter your email address'
            />
            <div
              className='signUpButton'
              onClick={() => onSignUp()}
            >
              <p className='connectWalletTextLanding'>Sign Up</p>
            </div>
          </div>
          <div
            className={
              emailError.includes('Invalid')
                ? 'signupStatus warning'
                : 'signupStatus information'
            }
          >
            {emailError}
          </div>
        </div>
        <img className='alonzo' src={images.Alonzo} alt='alonzo' />
      </div>
      <div className='featureWalletRefrence'/>
      <div className='featuresContainer'>
        <p className='featuresTitleText'>
          Lovelace enables users to create, find, finance, trade and use
          DeFi-enabled NFTs across chains, games and metaverses
        </p>
        <div className='featuresBoxContainer'>
          <Feature
            Icon={images.Trade}
            text='Trade and stake NFTs for good stuff'
          />
          <Feature
            Icon={images.Experience}
            text='Discover original NFT experiences'
          />
          <Feature
            Icon={images.Games}
            text='Crowdfund your  game on Launchpad'
          />
          <Feature
            Icon={images.Integrate}
            text='Earn bonuses in partner games & metaverses'
          />
        </div>
      </div>
      {/* <div className='connectWalletRefrence' ref={connectWalletRef} /> */}
    </Layout>
  )
}

export default RootIndex
