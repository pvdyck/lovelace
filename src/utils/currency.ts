import { ethers, BigNumber } from 'ethers';

// 去除末尾的 .0
export function strip(amount: string): string {
  return amount.endsWith('.0') ? amount.slice(0, -2) : amount;
}

// 标准单位转换到最小单位
export function getAtom(amount: string, decimals: number): string {
  return ethers.utils.parseUnits(amount, decimals).toString();
}

export function getStandardUnit(atom: string, decimals: number): string {
  const f = ethers.utils.formatUnits(atom, decimals);
  return strip(f);
}

export function toWei(eth: string): BigNumber {
  return ethers.utils.parseEther(eth);
}

export function toInteger(value: BigNumber): number {
  return value.toNumber();
}

export function toEth(wei: string, fixed?: number): string {
  const et = ethers.utils.formatEther(wei);
  if (typeof fixed === 'number') {
    const pointIdx = et.indexOf('.');
    if (pointIdx > -1) {
      if (fixed) {
        return et.slice(0, pointIdx + fixed + 1);
      }
      return et.slice(0, pointIdx);
    }
  }
  return et;
}

export function formatForUSDT(wei: BigNumber, fixed?: number): string {
  return ethers.BigNumber.from(wei)
    .div(ethers.BigNumber.from('1000000'))
    .toString();
}

export function toZOM(atom: string): string {
  return getStandardUnit(atom, 18);
}

/**
 * ethRatio 1 BNB => xxx ABC
rate 转换为整数
_uints = 10的这么多次方 ((18 - erc20 decimail)  + rate 转换为整数需要的10倍数)
 */
export function getRateUnit(
  ethRatio: string,
  erc20Decimals: number
): { rate: string; units: string } {
  let units = 18 - erc20Decimals;

  const pointIdex = ethRatio.indexOf('.');
  // ratio 转换为整数需要移动的位数
  const moveToInt = pointIdex > -1 ? ethRatio.length - pointIdex - 1 : 0;
  if (moveToInt > 0) {
    ethRatio = ethRatio.slice(0, pointIdex) + ethRatio.slice(pointIdex + 1);
    units += moveToInt;

    // 删掉后面的整数位的 0
    let i = ethRatio.length - 1;
    while (ethRatio[i] === '0') {
      i--;
      units--;
    }
    ethRatio = ethRatio.slice(0, i + 1);

    if (units < 0) {
      ethRatio += '0'.repeat(-units);
      units = 0;
    }
  } else if (pointIdex > -1) {
    ethRatio = ethRatio.slice(0, pointIdex);
  }

  return {
    rate: ethers.BigNumber.from(ethRatio).toString(),
    units: ethers.BigNumber.from('1' + '0'.repeat(units)).toString(),
  };
}

export function getRatio(
  rate: string,
  units: string,
  erc20Decimals: number
): string {
  const dev = erc20Decimals - 18;

  let num = ethers.FixedNumber.from(units);
  if (dev > 0) {
    num = num.mulUnsafe(ethers.FixedNumber.from('1' + '0'.repeat(dev)));
  } else if (dev < 0) {
    num = num.divUnsafe(ethers.FixedNumber.from('1' + '0'.repeat(-dev)));
  }

  const ratio = ethers.FixedNumber.from(rate).divUnsafe(num).toString();
  return strip(ratio);
}
