# Curve API

This API is used by various services to serve data. It is a public API intended for all those seeking to integrate Curve data onto their own projects.

## [Status / Uptime monitoring](https://statuspage.freshping.io/59335-CurveAPI)

## [Changelog](https://github.com/curvefi/curve-api/blob/main/CHANGELOG.md)

## Public REST API Endpoints

Endpoints list and example response can be found by **[clicking here](https://github.com/curvefi/curve-api/blob/main/endpoints.md)**

## How to add a new endpoint

1. Create a new file under `/pages/api`: the endpoint will be accessible through the same path, e.g. `/pages/api/hithere` would accessible through `api.curve.fi/api/hithere`
2. If this endpoint requires passing any data as a query parameter, name that parameter in the path itself (e.g. `/pages/api/user/[id].js`)
3. The endpoint script must export a function, wrapped in the utility `fn()`, that returns a json object – that's it
4. **Query params:** any query params defined as in (2) are accessible in the first argument passed to `fn`, e.g. `fn(({ id }) => ({ message: \`Id passed as argument: ${id}\`}))`
5. **Caching:** pass an object as second argument to `fn`, and set the cache duration in seconds with the `maxAge` property: `{ maxAge: 60 }`

## Dev

Run: `vercel dev`

## **Historical Data**

### **Endpoints** 
The endpoints below supports historical data<br/>
1. `/api/getFactoryAPYs?block={block_number}`
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
2. `/api/getTVL?block={block_number}`
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
    #####  ⚠️⚠️⚠️`sideTVLs` and `sideChainTVL` always return __latest__ value ⚠️⚠️⚠️

### **FYI**
If you get a timeout error or error such as <br/>
`"Error: Returned values aren't valid, did it run Out of Gas? You might also see this error if you are not using the correct ABI for the contract you are retrieving data from, requesting data from a block number that does not exist, or querying a node which is not fully synced."`
<br/>
Try higher block number!