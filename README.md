# Curve API Historical Data

This repository is an updated version of [curve-api](https://github.com/curvefi/curve-api) that enables access to the latest data from Curve Finance DEX.
We can additionally provide historical data by simply specifying the block number as an additional parameter.

## Prerequisites

* Docker
* Docker Compose

## Settings

Create `dev.env` or `prod.env` file with corresponding environment variables required by Docker Compose.
The list of required environment variables is included under the `environment` section.

## Development setup

```shell
docker-compose -f docker-compose.dev.yaml build
docker-compose -f docker-compose.dev.yaml --env-file dev.env up
```

## Production setup

```shell
docker-compose -f docker-compose.prod.yaml build
docker-compose -f docker-compose.prod.yaml --env-file prod.env up -d
```

## Historical Data Endpoints

The endpoints listed below enable access to historical data.

### `/api/getFactoryAPYs?block={block_number}`

Example output
```
"poolDetails": [
  {
    "index": 0,
    "poolAddress": "0x9547429C0e2c3A8B88C6833B58FCE962734C0E8C",
    "poolSymbol": "DOLA",
    "apyFormatted": "0.12%",
    "apy": 0.11813988038860135,
    "apyWeekly": 0.12632708044177932,
    "virtualPrice": "1014802666754888345",
    "volume": 0
  },
...
],
"totalVolume": 20572200.081073303
```

### `/api/getTVL?block={block_number}`

Example output
```
tvl": 12376315054.757349,
"usdTVL": 6831486622.154737,
"ethTVL": {
  "native": 1652987.7054902713,
  "usd": 4898215818.294046,
  "asset": "ethereum"
},
"btcTVL": {
  "native": 15254.736434638018,
  "usd": 603401099.6721067,
  "asset": "bitcoin"
},
"eurTVL": {
  "native": 31648893.302398853,
  "usd": 33769369.153659575,
  "asset": "euro"
},
"otherTVL": {
  "usd": 9442145.482802702
},
"allPools": [
  {
    "lptoken": "0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490",
    "pool_address": "0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7",
    "balance": 3342439876.110956,
    "asset_price": 1
  },
  ...
],

"sideTVLs": [
  {
    "chain": "Polygon",
    "tvl": 392428028.38835347
  },
  ...
],
"sideChainTVL": 2782688533.573472,
```

## TODO

* Historical data extraction for `sideTVLs`, currently returns the latest data.
* Historical data extraction for `sidechainTVLs`, currently returns the latest data.

## FAQ

#### Why do I get following error? `Error: Returned values aren't valid, did it run Out of Gas? You might also see this error if you are not using the correct ABI for the contract you are retrieving data from, requesting data from a block number that does not exist, or querying a node which is not fully synced.`

This problem most likely occurs because the pool has been created sometime after the generation of the requested block.
Also, it could be caused by the lack of a specific smart contract.
To solve this problem, request a block number when the pool exists.
