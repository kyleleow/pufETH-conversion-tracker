import { ethers } from "ethers";
import conversionRate from "../database/conversion-rate";
import ContractABI from '../contract-abi.json'
import BigNumber from "bignumber.js";

export async function fetchConversionRate() {
  const provider = new ethers.InfuraProvider('mainnet', process.env.INFURA_API_KEY);
  const contract = new ethers.Contract(process.env.PUFETH_CONTRACT_ADDRESS ?? "", ContractABI, provider)

  const totalAssetsResponse = await contract.totalAssets()
  const totalSupplyResponse = await contract.totalSupply()      
  const calculatedRate = BigNumber(totalAssetsResponse.toString()).dividedBy(totalSupplyResponse.toString())

  // Store into db  
  const rate = new conversionRate({
    totalAssets: totalAssetsResponse,
    totalSupply: totalSupplyResponse
  })

  await rate.save()
  return calculatedRate  
}

export async function getHistoricalConversionRates() {
  return conversionRate.find().sort({ timestamp: 'asc' }).exec();
}