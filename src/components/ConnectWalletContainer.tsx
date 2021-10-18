import React from 'react';
import WarningCircle from '../assets/svg/WarningCircle.svg';
import './styles/ConnectWalletContainer.less';

const ConnectWalletContainer = (props: any) => {
  const { address, onClick } = props;

  const connectText = address
    ? 'Connected!    ' +
      address.substr(0, 4) +
      '........' +
      address.substr(address.length - 4, address.length)
    : 'Step 1: Connect your EVM wallet';

  return (
    <div className='connectWalletContainer' onClick={() => onClick()}>
      {!address && <img src={WarningCircle} className='warningIcon' />}
      <span className='connectWalletText'>{connectText}</span>
    </div>
  );
};

export default ConnectWalletContainer;
