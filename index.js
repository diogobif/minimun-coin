class CoinCalculator {

  constructor(coinSet) {
    this.coins = coinSet.map(el => el * 100).sort((a, b) => a - b);
  }

  changeIndexToDecimal (composition) {
    let compositionDecimal = {};
    const compositionKeys = Object.keys(composition);
    const compositionValues = Object.values(composition);
    for (let i = 0; i < Object.values(composition).length; i++) {
      compositionDecimal[(compositionKeys[i] / 100).toFixed(2)] = compositionValues[i];
    }

    return compositionDecimal;
  }

  calculatePossibilities(value, initCoinValue) {
    let counter = 1, 
      rest = 0, 
      reverseCoin = this.coins.reverse(), 
      composition = {};

    rest = value - initCoinValue;
    composition[initCoinValue] = 1;

    while (rest > 0) {
      for (let i = 0; i < reverseCoin.length; i++) {
        const coinVal = reverseCoin[i];
        if (rest >= coinVal) {
          composition[coinVal] = composition[coinVal] ? composition[coinVal] + 1 : 1;
          rest -= coinVal;
          counter ++;
          break;
        }
      }
    }

    return { usedCoins: counter, composition: this.changeIndexToDecimal(composition) };
  }

  calculateMinCoins (total) {
    let fnResult = null;
    total = total * 100;

    this.coins.forEach(coin => {
      if (coin <= total) {
        const result = this.calculatePossibilities(total, coin);
        fnResult = !fnResult ? result : (fnResult.usedCoins > result.usedCoins ? result : fnResult);
      }
    });

    return fnResult;
  }
}

const test = new CoinCalculator([0.01, 0.05, 0.10, 0.25, 0.50, 1]);
console.log(test.calculateMinCoins(0.83));