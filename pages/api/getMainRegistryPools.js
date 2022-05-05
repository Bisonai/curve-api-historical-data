import Web3 from 'web3';
import WEB3_CONSTANTS from 'constants/Web3';
import { fn } from '../../utils/api';
import { getRegistry, getMultiCall } from '../../utils/getters';
import registryAbi from '../../constants/abis/factory_registry.json';
import multicallAbi from '../../constants/abis/multicall.json';

const web3 = new Web3(WEB3_CONSTANTS.RPC_URL);


export default fn(async () => {

  const registryAddress = await getRegistry();
  const multicallAddress = await getMultiCall();
  const registry = new web3.eth.Contract(registryAbi, registryAddress);
  const poolCount = await registry.methods.pool_count().call();
  const multicall = new web3.eth.Contract(multicallAbi, multicallAddress);

  // get pool addresses
  let calls = [];
  for (let i = 0; i < poolCount; i += 1) {
    calls.push([registryAddress, registry.methods.pool_list(i).encodeABI()]);
  }
  let aggcalls = await multicall.methods.aggregate(calls).call();
  const poolList = aggcalls[1].map((hex) => web3.eth.abi.decodeParameter('address', hex));


  return { poolList  };

}, {
  maxAge: 0,
});
