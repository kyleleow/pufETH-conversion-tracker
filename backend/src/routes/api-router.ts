import bodyParser from 'body-parser';
import { Router } from 'express';
import { fetchConversionRate, getHistoricalConversionRates } from '../services/conversionRateService';
import BigNumber from 'bignumber.js';

export function apiRouter(): Router {
  const router = Router();
  router.use(bodyParser.json());

  router.get('/current', async (_, res) => {    
    try {
      const calculatedRate = await fetchConversionRate()
      res.json({
        rate: calculatedRate.toFixed(8)
      })
    } catch (e) {
      res.status(500).json({
        message: 'Error fetching conversion rate',
        error: e
      })
    }
  })

  router.get('/history', async(_, res) => {
    try {
      const latestRates = await getHistoricalConversionRates()
      res.json(latestRates.map(rate => {
        const rateObject = rate.toObject()
        return {
          ...rateObject,
          rate: BigNumber(rate.totalAssets).dividedBy(rate.totalSupply).toFixed(8),        
        }
      }))
    } catch (e) {
      res.status(500).json({
        message: 'Error getting historical rates',
        error: e
      })
    }
  })

  return router;
}