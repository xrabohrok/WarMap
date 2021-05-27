
var args = process.argv.slice(2)
const round = parseInt(args.find(a => a.includes('round')).split('=')[1],10)

var fighters = require('../src/assets/data/allfighters.json')
var roundData = require(`../src/assets/data/rounds/round-${round}.json`)

Object.keys(roundData).forEach(k =>{
    if(!(k === "grandbattle")){
        const tile = roundData[k]
        
        tile.fighters.bastion.forEach(fb =>{
            if(!(fb in fighters)){
                console.log(`No bastion fighter:\t ${fb} on tile ${k}`)
            }
        })

        tile.fighters.pyre.forEach(fp =>{
            if(!(fp in fighters)){
                console.log(`No pyre fighter: \t ${fp} on tile ${k}`)
            }
        })
    }
})

console.log('Complete!')