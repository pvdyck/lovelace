import Lovelace from '../../static/svg/lovelace.svg';
import List from '../assets/svg/List.svg';
import Close from '../assets/svg/close.svg';
import './styles/Header.less';
import React, { useState, useEffect } from 'react';
import { alertInitWallet } from '../utils/modal';
import { Link } from 'gatsby'

const Header = (props: any) => {
  const { address } = props;

  const [showMenu, setShowMenu] = useState(false);
  const [discordId, setDiscordId] = useState('');
  const [adaAddr, setAdaAddr] = useState('');

  const connectText = address
    ? address.substr(0, 4) +
      '....' +
      address.substr(address.length - 4, address.length)
    : 'Connect';

  useEffect(() => {
    if (address) {
      var message = '';
      const data = JSON.stringify({
        types: {
          EIP712Domain: [{ name: 'name', type: 'string' }],
          EIP712Data: [{ name: 'message', type: 'string' }],
        },
        primaryType: 'EIP712Data',
        domain: {
          name: 'Lovelink',
        },
        message: {
          message,
        },
      });

      var from = address;
      var params = [from, data];
      var method = 'eth_signTypedData_v3';

      window.ethereum.sendAsync(
        { method, params, from },
        (err: any, result: any) => {
          if (err) return console.dir(err);
          if (result.error) {
            alert(result.error.message);
          }
          if (result.error) return console.error('ERROR', result);

          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              signature: result.result,
            }),
          };
          fetch(
            'https://us-central1-btest-b5e90.cloudfunctions.net/api/getLink',
            requestOptions
          )
            .then((response) => response.json())
            .then((data) => {
              setAdaAddr(data.adaAddress == null ? '' : data.adaAddress);
              setDiscordId(data.discordId == null ? '' : data.discordId);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      );

      fetch(
        'https://us-central1-btest-b5e90.cloudfunctions.net/api/getLinkCount',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }
      )
        .then((response) => response.json())
        .then((data) => {})
        .catch((e) => {
          console.log(e);
        });
    } else {
      setAdaAddr('');
      setDiscordId('');
    }
  }, [address]);

  return (
    <div className={`headerContainer ${showMenu ? 'open' : 'close'}`}>
      <Link to="/" className='headerLogoContainer'>
        <img src={Lovelace} className='lovelaceLogo' />
      </Link>

      <nav role="navigation" className='headerButtonRow' aria-label="Main">
        <div className="headerButtons">
          <Link to="/blog/the-nft-dilemma" activeClassName="active" className="getStartedText">
            Blog
          </Link>
        </div>
        <div className="getStartedContainer">
          <div className="getStartedText" onClick={() => alertInitWallet()}>
            {connectText}
          </div>
        </div>
      </nav>

      <img
        src={showMenu ? Close : List}
        onClick={() => setShowMenu(!showMenu)}
        className='menuButton'
      />
    </div>
  );
};

export default Header;