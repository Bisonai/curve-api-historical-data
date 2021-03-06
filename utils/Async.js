/* eslint-disable no-restricted-syntax, no-await-in-loop */

import { flattenArray, getArrayChunks } from 'utils/Array';

const sleep = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

const sleepUntil = async (conditionFn, checkInterval = 200) => {
  if (typeof conditionFn !== 'function') {
    throw new Error('sleepUntil expects a function as first argument');
  }

  while (!conditionFn()) {
    await sleep(checkInterval);
  }
};

const sequentialPromiseMap = async (array, asyncFn, chunkSize) => {
  const results = [];
  let i = 0;

  const chunked = chunkSize ? getArrayChunks(array, chunkSize) : array;

  while (i < chunked.length) {
    const res = await asyncFn(chunked[i]); // eslint-disable-line no-await-in-loop
    results.push(res);

    i += 1;
  }

  return chunkSize ? flattenArray(results) : results;
};

const sequentialPromiseFlatMap = async (array, asyncFn, chunkSize) => (
  flattenArray(await sequentialPromiseMap(array, asyncFn, chunkSize))
);

const sequentialPromiseReduce = async (array, asyncFn) => {
  const results = [];
  let i = 0;

  while (i < array.length) {
    const res = await asyncFn(array[i], i, results); // eslint-disable-line no-await-in-loop
    results.push(res);

    i += 1;
  }

  return results;
};

export {
  sequentialPromiseMap,
  sequentialPromiseFlatMap,
  sequentialPromiseReduce,
  sleepUntil,
};
