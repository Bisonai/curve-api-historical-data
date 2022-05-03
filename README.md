# Curve API

This repository is from this [curvefi repo](https://github.com/curvefi/curve-api) which is an API for the curve finance.<br/>The reason we modify this API is to get historical data.

This API is used by various services to serve data. It is a public API intended for all those seeking to integrate Curve data onto their own projects.

---

## **How to run it ?**

1. Install `docker` and `docker-compose`.

2. Build: `docker-compose -f docker-compose.{dev|prod}.yaml build`

3. Run: `docker-compose -f docker-compose.{dev|prod}.yaml --env-file .env up `

### You can choose between **dev** and **prod**.

---

## **Historical Data**

### **Endpoints**

The endpoints below support historical data<br/>

#### 1. `/api/getFactoryAPYs?block={block_number}`

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

#### 2. `/api/getTVL?block={block_number}`

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

⚠️Currently `sideTVLs` and `sideChainTVL` always return **latest** value but we're working on it.

### **FYI**

If you get a timeout error or error such as <br/>
`"Error: Returned values aren't valid, did it run Out of Gas? You might also see this error if you are not using the correct ABI for the contract you are retrieving data from, requesting data from a block number that does not exist, or querying a node which is not fully synced."`
<br/>
This problem is likely to have occurred because the pool didn't exist at the time of the block number, or because there was no specific smart contract. In order to solve this problem, request the block number when the pool exist.
