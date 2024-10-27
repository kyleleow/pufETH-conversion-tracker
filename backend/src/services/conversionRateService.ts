import { ethers } from "ethers";
import conversionRate from "../database/conversionRate";
import ContractABI from '../contractAbi.json'
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
  // Fetch rate once if no data
  const count = await conversionRate.countDocuments()
  if (count === 0) {
    await fetchConversionRate()
  }
  return conversionRate.find().sort({ timestamp: 'asc' }).exec();
}