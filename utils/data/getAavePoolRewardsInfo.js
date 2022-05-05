import groupBy from 'lodash.groupby';
import memoize from 'memoizee';
import { multiCall } from 'utils/Calls';
import { flattenArray, sum } from 'utils/Array';
import Request from 'utils/Request';
import getAssetsPrices from 'utils/data/assets-prices';
import pools from 'constants/pools';
import coins from 'constants/coins';

const AAVE_SWAP_PARTIAL_ABI = [{"name":"balances","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"uint256","name":"i"}],"stateMutability":"view","type":"function","gas":2731}];

const getAaveMarketData = memoize(async () => (
  (await Request.get('https://aave-api-v2.aave.com/data/markets-data/0xb53c1a33016b2dc2ff3653530bff1848a515c8c5')).json()
), {
  promise: true,
  maxAge: 0,
});

const getAavePoolRewardsInfo = memoize(async (gaugesRewardData, CUSTOM_LOGIC_REWARD_CONTRACTS) => {
  const { reserves } = await getAaveMarketData();
  const { [coins.stkaave.coingeckoId]: stkaavePrice } = await getAssetsPrices([coins.stkaave.coingeckoId]);

  const aaveGaugesRewardData = gaugesRewardData.filter(({ rewardContract }) => CUSTOM_LOGIC_REWARD_CONTRACTS.includes(rewardContract));
  const poolTokenBalances = await multiCall(flattenArray(aaveGaugesRewardData.map(({ address }) => {
   const pool = pools.find(({ addresses: { gauge: gaugeAddress } }) => gaugeAddress?.toLowerCase() === address.toLowerCase());

    return pool.coins.map(({ address, decimals }, i) => ({
      address: pool.addresses.swap,
      abi: AAVE_SWAP_PARTIAL_ABI,
      methodName: 'balances',
      params: [i],
      metaData: { coinAddress: address, decimals, poolId: pool.id },
    }));
    
  })));

  const tokenBalancesPerPool = groupBy(poolTokenBalances, 'metaData.poolId');

  return Array.from(Object.entries(tokenBalancesPerPool)).map(([poolId, poolData]) => {
    const pool = pools.getById(poolId);

    const tokenBalances = poolData.map(({ data, metaData: { decimals } }) => (
      data / (10 ** decimals)
    ));
    const poolTokenApys = poolData.map(({ metaData: { coinAddress } }) => (
      reserves.find(({ aTokenAddress }) => aTokenAddress.toLowerCase() === coinAddress.toLowerCase()).aIncentivesAPY
    ));

    const poolApy = (
      sum(tokenBalances.map((balance, i) => balance * poolTokenApys[i]))
      / sum(tokenBalances)
      * 100
    );

    return {
      gaugeAddress: pool.addresses.gauge,
      tokenAddress: coins.stkaave.address,
      tokenPrice: stkaavePrice,
      name: coins.stkaave.symbol,
      symbol: coins.stkaave.symbol,
      decimals: coins.stkaave.decimals,
      apy: poolApy,
    };
  });
}, {
  promise: true,
  maxAge: 0,
});

export default getAavePoolRewardsInfo;
