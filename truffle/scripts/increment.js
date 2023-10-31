/*
  Try `truffle exec scripts/increment.js`, you should `truffle migrate` first.

  Learn more about Truffle external scripts: 
  https://trufflesuite.com/docs/truffle/getting-started/writing-external-scripts
*/

const FileHash = artifacts.require("FileHash");

module.exports = async function (callback) {
  const deployed = await FileHash.deployed();

  const currentValue = (await deployed.read()).toNumber();
  console.log(`Current FileHash value: ${currentValue}`);

  const { tx } = await deployed.write(currentValue + 1);
  console.log(`Confirmed transaction ${tx}`);

  const updatedValue = (await deployed.read()).toNumber();
  console.log(`Updated FileHash value: ${updatedValue}`);

  callback();
};
