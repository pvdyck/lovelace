import { ethers } from 'ethers';
import { message } from 'antd';
import { IS_ETHEREUM, RPC_URL, CHAIN_ID, IS_DEV } from '../utils/const';

import WalletConnectProvider from '@walletconnect/web3-provider';
import { alertInstallMM } from '../utils/modal';
import { log, warn, reload } from '../utils/_';
import {
  changeAddress,
  changeChainID,
  setWalletInfo,
  getWalletInfo,
} from '../store';

let signer: ethers.providers.JsonRpcSigner | null = null;

export function getSigner(): ethers.providers.JsonRpcSigner | null {
  return signer;
}

type WalletInitCallback = (signer: ethers.providers.JsonRpcSigner) => void;

let callbacks: WalletInitCallback[] = [];

export function connectCallback(callback: WalletInitCallback) {
  callbacks.push(callback);
}

let provider: any | null = null;
let walletType: 0 | 1 = 0;

export function getProvider() {
  return provider;
}

export function getWalletType() {
  return walletType;
}

window.addEventListener(
  'beforeunload',
  () => {
    if (provider) {
      provider.disconnect();
    }
  },
  false
);

type Wallet = 'MM' | 'WC' | 'AK' | 'AK-GM' | 'AK-FB' | 'AK-TW';

let inited = false;

export async function logoutWallet() {
  signer = null;
  provider = null;
  inited = false;
  walletType = 0;

  if (getWalletInfo().type === 2) {
    const arkane = window.Arkane.arkaneConnect();
    arkane.logout({ windowMode: 'POPUP' });
  }

  changeAddress('');
  changeChainID(-1);
  setWalletInfo({
    type: -1,
    info: null,
  });
}

export async function connectWallet(wt: Wallet): Promise<boolean> {
  if (inited) {
    return true;
  }

  switch (wt) {
    case 'MM':
      log(`mm connect chainId ${CHAIN_ID}`);
      if (!IS_ETHEREUM) {
        alertInstallMM();
        return false;
      }

      provider = new ethers.providers.Web3Provider(window.ethereum);

      signer = provider.getSigner();
      const network = await provider.getNetwork();

      changeChainID(network.chainId);

      window.ethereum.on('accountsChanged', () => {
        const ads = window.ethereum.selectedAddress;
        window.analytics.identify({ id: ads });
        changeAddress(ads);
        log(`change address [mm]: ${ads}`);
      });

      window.ethereum.on('chainChanged', (chainId: number) => {
        warn(`mm change chainId ${chainId}`);
        changeChainID(parseInt(chainId + ''));
      });

      const ads = await window.ethereum.request<string[]>({
        method: 'eth_requestAccounts',
      });

      changeAddress(ads[0]);
      inited = true;
      walletType = 0;
      setWalletInfo({
        type: 0,
        info: null,
      });
      break;
    case 'WC':
      log(`wc connect chainId ${CHAIN_ID}`);

      provider = new WalletConnectProvider({
        rpc: RPC_URL,
      });

      provider.request({ method: 'eth_chainId' }).then((chainId: number) => {
        log(`wc chainId: ${chainId}`);
        changeChainID(parseInt(chainId + ''));
      });

      provider.on('accountsChanged', (accounts: string[]) => {
        changeAddress(accounts[0]);
        log(`change address [wc]: ${accounts[0]}`);
      });

      provider.on('disconnect', (code: number, reason: string) => {
        warn(`wc disconnect: ${code} ${reason}`);
        inited = false;
        message.info(`WalletConnect disconnected`).then(reload, reload);
      });

      provider.on('chainChanged', (chainId: number) => {
        warn(`ws change chainId ${chainId}`);
        changeChainID(parseInt(chainId + ''));
      });

      await provider.enable();

      signer = new ethers.providers.Web3Provider(provider).getSigner();

      setWalletInfo({
        type: 1,
        info: null,
      });
      inited = true;
      walletType = 0;
      break;
    case 'AK':
    case 'AK-FB':
    case 'AK-GM':
    case 'AK-TW':
      let options = {
        clientId: 'Bondly',
        environment: IS_DEV ? 'staging' : 'prod',
        authenticationOptions: {
          idpHint:
            wt === 'AK-FB'
              ? 'facebook'
              : wt === 'AK-GM'
              ? 'google'
              : wt === 'AK-TW'
              ? 'twitter'
              : 'default',
        },
      };

      window.Arkane.createArkaneProviderEngine(options).then(
        (provider: any) => {
          window.web3 = new Web3(provider);

          window.web3.eth.getAccounts().then((wallets: string[]) => {
            changeAddress(wallets[0]);
          });

          window.web3.eth.getChainId().then((chainID: number) => {
            changeChainID(chainID);
          });

          const arkane = window.Arkane.arkaneConnect();

          arkane.api.getProfile().then((profile: any) => {
            arkane.api.getWallets().then((wallets: any) => {
              setWalletInfo({
                type: 2,
                info: {
                  profile,
                  wallet: wallets[0],
                },
              });
              walletType = 1;
              inited = true;
            });
          });
        }
      );
  }

  callbacks.forEach((cb) => cb(signer!));

  return true;
}

export async function isTransactionMined(transactionHash: string) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const txReceipt = await provider.getTransactionReceipt(transactionHash);
  if (txReceipt && txReceipt.blockNumber) {
    return true;
  }
  return false;
}
