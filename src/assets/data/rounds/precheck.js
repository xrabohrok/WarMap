var args = process.argv.slice(2)

const filename = args[0]
const inputfile = require(filename)

inputfile.forEach(rd => {
    const winner = rd.winner.trim().toLowerCase()
    if(!(rd.bastion_fighter.trim().toLowerCase() ===winner || rd.pyre_fighter.trim().toLowerCase() === winner )){
        console.log(`${rd.bastion_fighter} v ${rd.pyre_fighter} does not resolve`)
    }
    if(rd.tile.length > 3){
        console.log(`Something is up with ${rd.tile}`)
    }
})

console.log('done!')

