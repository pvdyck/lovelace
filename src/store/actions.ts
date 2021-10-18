export const CHANGE_ADDRESS = 'CHANGE_ADDRESS';
export function createAddressAction(address: string) {
  return {
    type: CHANGE_ADDRESS,
    payload: address,
  };
}

export const CHANGE_CHAINID = 'CHANGE_CHAINID';
export function createChainIdAction(chainId: number) {
  return {
    type: CHANGE_CHAINID,
    payload: chainId,
  };
}

// show nav
export const SET_NAV = 'SET_NAV';
export function setNav(show: boolean) {
  return {
    type: SET_NAV,
    payload: show,
  };
}

export const SET_WALLET_INFO = 'SET_WALLET_TYPE';
export function updateWalletInfo(info: any) {
  return {
    type: SET_WALLET_INFO,
    payload: info,
  };
}
