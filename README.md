# pufETH Conversion Tracker
A simple fullstack project that display conversion rate over time by using `totalAssets` and `totalSupply` from PufferVaultV2 contract:  [0xd9a442856c234a39a81a089c06451ebaa4306a72](https://etherscan.io/address/0xd9a442856c234a39a81a089c06451ebaa4306a72 "0xd9a442856c234a39a81a089c06451ebaa4306a72")
using the formula:
```
rate = totalAsset / totalSupply
```
## Backend
This project is build using:
- NodeJS
- Express
- MongoDB
- Typescript

#### Getting started
To run in local:
```
npm run dev
```
All API can be accessed using [http://localhost:3000](http://localhost:3000) as the base URL

Available API:
- Fetch all historical conversion rates:  `GET /api/conversion-rate/historical`
- Fetch current conversion rate: `GET /api/conversion-rate/current`

#### Task Scheduler
When the server is running, a task scheduler is setup to fetch the conversion rate and store into db at an interval of 5 minutes

#### Test
To run integration test:
```
npm run test
```

## Frontend
This project is built using:
- React
- Typescript

#### Getting started
To run in local:
```
npm run start
```

The site can then be accessed in [http://localhost:3001](http://localhost:3001)

#### Test
To run test:
```
npm run test
```
