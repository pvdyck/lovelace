import { createStore, AnyAction } from 'redux';
import {
  SET_NAV,
  CHANGE_ADDRESS,
  CHANGE_CHAINID,
  SET_WALLET_INFO,
  createAddressAction,
  createChainIdAction,
  updateWalletInfo,
} from './actions';
import state, { State } from './state';

function reducer(prevState = state, action: AnyAction): State {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_ADDRESS:
      return {
        ...prevState,
        address: payload,
      };
    case SET_NAV:
      return {
        ...prevState,
        nav: payload,
      };
    case SET_WALLET_INFO:
      return {
        ...prevState,
        walletInfo: payload,
      };
    default:
      return prevState;
  }
}

const store = createStore(reducer);

export const changeChainID = (chainId: number) => {
  store.dispatch(createChainIdAction(chainId));
};

export const changeAddress = (address: string) => {
  store.dispatch(createAddressAction(address));
};

export const setWalletInfo = (info: any) => {
  store.dispatch(updateWalletInfo(info));
};

export function getAddress(): string {
  return store.getState().address;
}

export function getChainId(): number {
  return store.getState().chainId;
}

export function getStyle(): string {
  return store.getState().style;
}

export function getWalletInfo(): any {
  return store.getState().walletInfo;
}

export default store;
