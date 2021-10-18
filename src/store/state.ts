import { ethers } from 'ethers';

export interface State {
  address: string;
  chainId: number;
  ethPrice: string;
  balance: string;
  loading: boolean;
  nav: boolean;
  walletInfo: any;
  style: string;
}

const state: State = {
  address: '',
  chainId: 0,
  ethPrice: '',
  balance: '',
  loading: false,
  style: '',
  nav: false,
  walletInfo: {
    type: -1,
    info: null,
  },
};

export default state;
