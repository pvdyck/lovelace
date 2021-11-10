import React, { useRef, useState, useEffect } from 'react';
import images from '../assets';
import Waves from '../components/Waves';
import Features from '../components/Features';
import Layout from '../components/Layout'
import { showSuccess } from '../components/Success';
import DistributionChart from '../components/DistributionChart';
import Particles from 'react-particles-js';
import './App.less';

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
        showSuccess({
          text: 'You are now successfully subscribed!',
          isError: false,
        });
        setEmailError('');
      })
      .catch((e) => {
        console.log(e);
        showSuccess({
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
          <h1 className='landingBoldText'>Realize the Potential of the Metaverse</h1>
          {/* <div className='centeredRow centeredCol'>
            <h2 className='landingLightText'>We help builders build and players play in the metaverse</h2>
            <img
              className='cardanoLogo'
              src={images.CardanoSVG}
              alt='Cardano'
            />{' '}
          </div> */}

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
              className='button'
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
          {/* <ScrollDown scrollTo='scrollTo'/> */}
        </div>
        <img className='alonzo' src={images.Alonzo} alt='alonzo' />
      </div>
      <div id='scrollTo' className='featureWalletRefrence'/>
      <div className='featuresContainer'>
        <Waves />
        <h2 className='landingLightText'>
          We help builders build and players play in the metaverse
        </h2>
      </div>
      <div className='featuresContainer'>
        <p className='featuresTitleText'>
        Develop or participate in NFT experiences, play-to-earn games, digital economies and worlds across Cardano and other chains using our Metaverse-as-a-Service toolkit:
        </p>
        <Features />
      </div>
      {/* <div className='referFriend'>
        <h2 className='landingLightText'>
          Refer Friends
        </h2>
        <p className='featuresTitleText'>
        Earn rewards and gain access to special NFT drops by signing up and referring your friends
        </p>
        <a href="https://upvir.al/123461/lp123461" target="_blank"
          className='button'
        >
          <span className='connectWalletTextLanding'>Refer</span>
        </a>
      </div> */}

      <div className='tokenSale'>
        <h2 className='landingLightText'>
          Development Roadmap
        </h2>
        <div className="timeline">
          <div className="cards">
            <div className="card">
              <h4>$LACE fungible token</h4>
            </div>
            <div className="card">
              <h4>Lovelink, Ethereum-Cardano connector, allowing for cross-chain rewards</h4>
            </div>
            <div className="card">
              <h4>Adanimals NFT release on EVM, with connected rewards on Cardano</h4>
            </div>
            <div className="card">
              <h4>Adanimals P2E ecosystem token</h4>
            </div>
            <div className="card">
              <h4>Lovelace Marketplace</h4>
            </div>
            <div className="card">
              <h4>NFT Creator Toolkit smart contracts</h4>
            </div>
            <div className="card">
              <h4>Adanimals P2E game</h4>
            </div>
            <div className="card">
              <h4>Launch of NFT and GameFi projects from Lovelace Launchpads</h4>
            </div>
            <div className="card">
              <h4>Deploy Lovelace NFT smart contracts and marketplace on Cardano</h4>
            </div>
          </div>
        </div>
      </div>
      <div className='tokenSale'>
        <h2 className='landingLightText'>
          TOKEN SALE
        </h2>
        <div className='tokenSaleContainer'>
          <div className='tokenSaleTextContainer'>
            <p className='tokenSaleSubtitleText'>
            $LACE Token is your ticket to the Metaverse
            </p>
            <p className='tokenSaleTitleText'>
            Purchase $LACE tokens to benefit from the following:
            </p>
            <div className='simple-frature-box-container'>
              <div className='simple-feature-container'>
                <div className='simple-feature-text-container'>Discounts on NFTs and transaction fees</div>
              </div>
              <div className='simple-feature-container'>
                <div className='simple-feature-text-container'>Access to IDO and INO launchpad</div>
              </div>
              <div className='simple-feature-container'>
                <div className='simple-feature-text-container'>Play to Earn game transactions</div>
              </div>
              <div className='simple-feature-container'>
                <div className='simple-feature-text-container'>Native staking</div>
              </div>
              <div className='simple-feature-container'>
                <div className='simple-feature-text-container'>Governance</div>
              </div>
            </div>

            <h3 className='tokenSaleSubtitleText'>
              How to Buy $LACE
            </h3>

            <div className="tokenSaleWrapper">
              <div className="tokenSaleElement">
                <div>
                  <strong>Token Ticker:</strong>	LACE
                </div>
                </div>
              <div className="tokenSaleElement">
                <h4>LACE Contract Addresses:</h4>
                <div>
                  <strong>ETH:</strong> Coming soon
                </div>
                <div>
                  <strong>BSC:</strong> Coming soon
                </div>
              </div>
              <div className="tokenSaleElement">
                <h4>Exchanges:</h4>
                <div>
                  <strong>Uniswap:</strong> Coming soon
                </div>
                <div>
                  <strong>Pancakeswap:</strong> Coming soon
                </div>
              </div>
              <div className="tokenSaleElement">
                <h4>Token Listing Information:</h4>
                <div>
                  <strong>CoinMarketCap:</strong> <a href='https://coinmarketcap.com/currencies/lovelace/' target='_blank'>Visit coinmarketcap</a>
                </div>
                <div>
                  <strong>CoinGecko:</strong> Coming soon
                </div>
              </div>
            </div>

            {/* <div className="tokenSaleWrapper">
              <div>
                <strong>Circulating Supply:</strong>
                <ul>
                  <li>
                    <strong>Initial:</strong>
                  </li>
                  <li>
                    <strong>After 6 months:</strong>
                  </li>
                  <li>
                    <strong>After 12 months:</strong>
                  </li>
                </ul>
              </div>
            </div> */}
            <div className="tokenDistributionWrapper">
              <h2 className='landingLightText'>
                TOKEN Distribution
              </h2>
              <div className="tokenSaleElement">
                <div>
                  <strong>Supply:</strong> 250,000,000
                </div>
              </div>
              <div className='particleWrapper'>
                <Particles
                  params={{
                    detectRetina: false,
                    fpsLimit: 60,
                    interactivity: {
                      detectsOn: "canvas",
                      events: {
                        onHover: {
                          enable: true,
                          mode: ["connect"]
                        },
                        resize: true
                      },
                      modes: {
                        connect: {
                          distance: 25,
                          radius: 50,
                          link: 30
                        }
                      }
                    },
                    particles: {
                      color: {
                        value: "#dd9cf4",
                        animation: {
                          enable: false,
                          speed: 20,
                          sync: true
                        }
                      },
                      lineLinked: {
                        blink: false,
                        color: "#500F82",
                        consent: false,
                        distance: 30,
                        enable: true,
                        opacity: 1,
                        width: 1
                      },
                      move: {
                        attract: {
                          enable: false,
                          rotate: {
                            x: 600,
                            y: 1200
                          }
                        },
                        bounce: false,
                        direction: "none",
                        enable: true,
                        outMode: "bounce",
                        random: true,
                        speed: 0.5,
                        straight: false
                      },
                      number: {
                        density: {
                          enable: false,
                          area: 2000
                        },
                        limit: 0,
                        value: 200
                      },
                      opacity: {
                        animation: {
                          enable: true,
                          minimumValue: 0.05,
                          speed: 2,
                          sync: false
                        },
                        random: false,
                        value: 1
                      },
                      shape: {
                        type: "circle"
                      },
                      size: {
                        animation: {
                          enable: false,
                          minimumValue: 0.1,
                          speed: 40,
                          sync: false
                        },
                        random: true,
                        value: 1
                      }
                    },
                    polygon: {
                      draw: {
                        enable: true,
                        lineColor: "#dd9cf4",
                        lineWidth: 0.8
                      },
                      move: {
                        radius: 100
                      },
                      inlineArrangement: "equidistant",
                      scale: 2,
                      type: "inline",
                      url: "/svg/lovelace-logo2.svg"
                    }
                }} />
              </div>
              <DistributionChart />
            </div>
          </div>
        </div>
      </div>
      {/* <div className='connectWalletRefrence' ref={connectWalletRef} /> */}
    </Layout>
  )
}

export default RootIndex
