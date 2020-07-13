# GraphQL TS Client

Generate fully typed Typescript clients for your GraphQL APIs.

## Install
```
yarn add graphql-ts-client
```

## Usage

### Generate the client

```typescript
import { generateTypescriptClient } from 'graphql-ts-client'

generateTypescriptClient({
  output: './myAwesomeApi.ts',
  endpoint: 'https://my.awesome-api.com/graphql',
  verbose: process.env.NODE_ENV === 'development', // when true, log requests to the console
  headers: {
    Authorization: 'Bearer 1234567890987654321',
  },
})
```

### Using the generated client

```typescript
import myAwesomeApi, { AssetType, Granularity, OnBoardingStage } from './myAwesomeApi'

async function somewhereOverTheRainbow() {
  // Set an specific header if needed
  myAwesomeApi.setHeader('Authorization', 'Bearer 010101010101')

  const response = await myAwesomeApi.queries.globalIndicators({
    __args: {
      liveStatus: OnBoardingStage.COMPLETED,
      assetType: AssetType.LEASED,
      granularity: Granularity.DAILY,
    },
    customerExperience: {
      avgRating: {
        __args: {
          from: '2020-01-01',
          to: '2020-02-01',
        },
      },
    },
    lorem: true, // selected field
    ipsum: true  // selected field
  })

  console.log(response.customerExperience.avgRating)
  console.log(response.lorem)
  console.log(response.ipsum)
  console.log(response.dolor) // compilation time error
}
```
