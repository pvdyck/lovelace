export const IS_SSR = typeof window === 'undefined'
// export const IS_DEV = process.env.NODE_ENV === 'development'; // process.env.NODE_ENV === 'development';
export const IS_DEV = false
export const IS_ETHEREUM = typeof window.ethereum !== 'undefined'
export const APP_NAME = 'Lovelace Launchpad'
export const PAGE_SIZE = 20

export const BONDLY_CONTRACT = IS_DEV
  ? '0xbd7a72f9fb20ff69a9679c79cc749838d5d39b87'
  : '0xd2dda223b2617cb616c1580db421e4cfae6a8a85'

export const WETH_CONTRACT = IS_DEV
  ? '0xdf032bc4b9dc2782bb09352007d4c57b75160b15'
  : '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'

export const USDT_CONTRACT = IS_DEV
  ? '0xdac17f958d2ee523a2206206994597c13d831ec7'
  : '0xdac17f958d2ee523a2206206994597c13d831ec7'

export const USDC_CONTRACT = IS_DEV
  ? '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
  : '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'

export const DISTRIBUTER_CONTRACT = IS_DEV
  ? '0x288b54CECcd6C345B1C3877EF9F6DbF81e149013'
  : '0x55c99BCD6eDa6Aa017A5189dF8b2823d9f3948EC'

export const HERO_NFT_CONTRACT = '0x8280D56Ac92b5bFF058d60c99932FDEcDCc9441a'
export const LOGAN_NFT_CONTRACT = '0x0c69326bea87398a12be5d3224bd37ac64b30b76'
export const POLKAPET_NFT_CONTRACT =
  '0xba8cDaa1C4C294aD634ab3c6Ee0FA82D0A019727'
export const VILLIAINS_NFT_CONTRACT =
  '0xe3782B8688ad2b0D5ba42842d400F7AdF310F88d'
export const TORY_NFT_CONTRACT = '0x47dD306909fcD7cD22dFBF2548f7E43a8594b243'
export const THE_FORCE_CONTRACT = IS_DEV
  ? '0x1fDCf478AAa90Ff95d01B751B056ca4781c38Bfa'
  : '0x027B06bE0C23664c52C60c07106560fE78c706FF'
export const NETVRK_NFT_CONTRACT = IS_DEV
  ? '0xe3782B8688ad2b0D5ba42842d400F7AdF310F88d'
  : '0xe3782B8688ad2b0D5ba42842d400F7AdF310F88d'
export const POLKER_NFT_CONTRACT = IS_DEV
  ? '0x4469c4fc07ea287ed31c26367e14c76656058ea6'
  : '0x3D34976a56b17AA3403B4EA78c3376B8bf74f70D'
export const NFT_CONTRACT = IS_DEV
  ? '0x4469c4fc07ea287ed31c26367e14c76656058ea6'
  : '0x3D34976a56b17AA3403B4EA78c3376B8bf74f70D'

export const ORIGINAL_TERMS_TEXT = [`Lovelace`]

export const GENERAL_TERMS_TEXT = [`Lovelace NFTs Terms of Use`]

export const CHAIN_ID = IS_DEV ? 4 : 1

// decimals 18
export const RPC_URL = IS_DEV
  ? 'https://mainnet.eth.aragon.network/'
  : 'https://mainnet.eth.aragon.network/'
