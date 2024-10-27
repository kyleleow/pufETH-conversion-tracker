import mongoose from "mongoose"
import conversionRate from "../src/database/conversion-rate"

import supertest from "supertest"
import cron from 'node-cron';
import { app } from "../src/app";

describe('Get historical conversion rates', () => {
  let db: typeof mongoose

  beforeAll(async () => {    
    db = await mongoose.connect(process.env.MONGO_URI_TEST || '')
  })

  afterAll(async () => {
    await conversionRate.deleteMany({})
    await db.connection.db?.dropDatabase()
    await db.connection.close()    
    cron.getTasks().forEach(task => {
      task.stop()
    })        
  })

  it('should return historical rate in ascending order of time', async () => {
    // Create mock data into db
    const mockData = [
      {
        totalAssets: "10",
        totalSupply: "9",
        timestamp: '2024-10-27T08:44:30.774Z'
      },
      {
        totalAssets: "50",
        totalSupply: "9",
        timestamp: '2024-10-27T08:45:30.774Z'
      },
      {
        totalAssets: "1000",
        totalSupply: "9",
        timestamp: '2024-10-27T08:46:30.774Z'
      },
    ]
    await conversionRate.insertMany(mockData)
    
    const response = await supertest(app).get(`/api/conversion-rate/history`);
    expect(response.status).toBe(200);
    expect(response.body.map(((res: any) => ({
      totalAssets: res.totalAssets,
      totalSupply: res.totalSupply,
      timestamp: res.timestamp
    })))).toStrictEqual(mockData)
  })
})
