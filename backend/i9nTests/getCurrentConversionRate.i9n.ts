import mongoose from "mongoose"
import conversionRate from "../src/database/conversionRate"

import supertest from "supertest"
import cron from 'node-cron';
import { app } from "../src/app";
import BigNumber from "bignumber.js";
import { ethers } from "ethers";

describe('Get current conversion rates', () => {
  const ENDPOINT = '/api/conversion-rate/current'
  let db: typeof mongoose
  let mockedContract: {
    totalAssets: jest.Mock;
    totalSupply: jest.Mock;
  };

  beforeAll(async () => {    
    db = await mongoose.connect(process.env.MONGO_URI_TEST || '')    
  })

  beforeEach(() => {
    mockedContract = {
      totalAssets: jest.fn(),
      totalSupply: jest.fn(),
    };

    jest.spyOn(ethers, 'Contract').mockImplementation(
      () => mockedContract as unknown as ethers.Contract
    );
  })

  afterAll(async () => {
    await conversionRate.deleteMany({})
    await db.connection.db?.dropDatabase()
    await db.connection.close()    
    cron.getTasks().forEach(task => {
      task.stop()
    })          
  })

  it('should return current rate', async () => {
    const mockedTotalAssetsValue = 1100
    const mockedTotalSupplyValue = 1000
    const expectedRate = BigNumber(mockedTotalAssetsValue).dividedBy(mockedTotalSupplyValue).toFixed(8)
    mockedContract.totalAssets.mockResolvedValueOnce(mockedTotalAssetsValue)
    mockedContract.totalSupply.mockResolvedValueOnce(mockedTotalSupplyValue)
    
    const response = await supertest(app).get(ENDPOINT);
    expect(response.status).toBe(200);    
    expect(response.body).toStrictEqual({
      rate: expectedRate
    })
  })
})
