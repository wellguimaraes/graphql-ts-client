const { generateTypescriptClient } = require('./generateTypescriptClient')
const path = require('path')

generateTypescriptClient({
  endpoint: 'https://arriere.stage.avantstay.dev/public/graphql',
  headers: {
    Authorization: `Bearer 63x9OdRKPWr38z7XkxPUVUD5PMl39A2i`
  },
  output: path.resolve(__dirname,'./arrierePublic.ts')
}).catch(err => console.error(err))

generateTypescriptClient({
  endpoint: 'https://arriere.stage.avantstay.dev/backoffice/graphql',
  headers: {
    Authorization: `Bearer 63x9OdRKPWr38z7XkxPUVUD5PMl39A2i`
  },
  output: path.resolve(__dirname,'./arriereBackoffice.ts')
}).catch(err => console.error(err))