import React from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import { connectWallet } from '../contracts/base';
import metamask from '../assets/svg/metamask.svg';
import wcIcon from '../assets/images/wc.png';
import { IS_ETHEREUM } from './const';
import './modal.less';

interface ModalHandler {
  update(props: ModalProps): void;
  close(): void;
}

function noop() {
  return null;
}

export function open(comp: React.ReactElement) {
  const div = document.createElement('div');
  document.body.appendChild(div);

  ReactDOM.render(comp, div);

  function close() {
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
  }

  return close;
}

interface ModalOptions extends ModalProps {
  children?: React.ReactNode;
}

export default function openModal(props: ModalOptions): ModalHandler {
  const div = document.createElement('div');
  document.body.appendChild(div);

  function decProps(props: ModalProps) {
    const { onCancel = noop, onOk = noop } = props;

    props.onCancel = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      onCancel(e);
      close();
    };

    props.onOk = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      onOk(e);
      close();
    };

    props.visible = true;
  }

  decProps(props);

  const { children, ...rest } = props;
  ReactDOM.render(<Modal {...rest}>{children}</Modal>, div);

  function close() {
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
  }

  return {
    update(_props: ModalProps) {
      decProps(_props);
      props = {
        ...props,
        ..._props,
      };
      ReactDOM.unmountComponentAtNode(div);
      ReactDOM.render(<Modal {...props} />, div);
    },
    close,
  };
}

export function alertInstallMM() {
  openModal({
    title: 'Connect Your Wallet',
    children: 'Metamask is not installed, please install and try again',
    okText: 'Confirm',
    cancelText: true,
    onOk() {
      window.open('https://metamask.io/');
    },
  });
}

async function connectMM() {
  if (IS_ETHEREUM) {
    await connectWallet('MM');
    return;
  }

  window.open('https://metamask.io/');
}

export function alertInitWallet() {
  const { close } = openModal({
    title: 'Connect Your Wallet',
    children: (
      <div className='m-wallet'>
        <div className='m-wallet-item' onClick={() => connectMM().then(close)}>
          <div className='m-wallet-item_body'>
            <div className='text'>Login with Metamask</div>
            <img className='icon-wallet' src={metamask} />
          </div>
        </div>
        <div
          className='m-wallet-item'
          onClick={() => connectWallet('WC').then(close)}
        >
          <div className='m-wallet-item_body'>
            <div className='text'>Login with WalletConnect</div>
            <img className='icon-wallet icon-wallet-wc' src={wcIcon} />
          </div>
        </div>
      </div>
    ),
    footer: null,
  });
}
