import { readFileSync, writeFileSync } from 'fs'

const swPath = './public/sw.js'
let sw = readFileSync(swPath, 'utf8')

// Remove the duplicate marker-icon entry with the wrong revision
sw = sw.replace(
  /\{url:"\/\_next\/static\/media\/marker-icon\.d577052a\.png",revision:"2273e3d8ad9264b7daa5bdbf8e6b47f8"\},?/,
  ''
)

writeFileSync(swPath, sw)
console.log('✓ Removed duplicate marker-icon entry from sw.js')