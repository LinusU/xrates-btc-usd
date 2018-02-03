# Exchange Rates: BTC - USD

Historical exchange rates for the BTC/USD pair.

## Installation

```sh
npm install --save @xrates/btc-usd
```

## Usage

```js
const btcToUsd = require('@xrates/btc-usd')

console.log(btcToUsd.lookup('2014-10-15'))
//=> 7.2696
```

## API

### `lookup(date: string | Date): number`

Get the exchange rate for the specified date. The return value is a number that fits the description "1 BTC = ? USD".

If the specified date falls outside the span of the provided data, a RangeError will be thrown.

## Source

The data is collected from the CoinDesk Bitcoin Price Index, via their official API.

You are free to use this API to include our data in any application or website as you see fit, as long as each page or app that uses it includes the text the following text (with the link):

> Powered by [CoinDesk](https://www.coindesk.com/price/)
