const fs = require('fs')

var args = process.argv.slice(2)

if(args.find(a => a.includes("help"))){
    console.log('the grandBattle import script requires the following:'+
    '\n\tround argument: which round this should be marked to (1-9)'+
    '\n\tdata argument: path to a .json formatted file that includes the outcomes of the rounds'+
    '\n\ttile_location: The tile that was flipped due to this grand battle'+
    '\n\tcontext(default: gb): switch context for this set, for example, \'clash\'')

    return
}

const round_num = parseInt(args.find(a => a.includes('round')).split('=')[1],10)
const tile_location = args.find(a => a.includes('tile')).split('=')[1]

const filename = args.find(a => a.includes('data')).split('=')[1]
const round_data = require(filename)

var context = args.find(a => a.includes('context'))
var context = context == undefined ? "gb" : context.split('=')[1]

var fighters = require('../allfighters.json')

var convert = require('./convert.js')

//load the grand battle info
//context 
var map_round = require(`./round-${round_num}.json`)
var lastId = 0

var fighterIter = Object.values(fighters)
var fighter_map = new Map()
for (const fighter of fighterIter) {
    fighter_map.set(fighter.id, fighter) //apparantly you need this in order to be iterable
    lastId = lastId < fighter.id ? fighter.id : lastId
}

var tile = map_round[tile_location.toLowerCase()]
tile.grandBattle = true


round_data.forEach((match, i) => {
    //bastion
    if(match.bastion_fighter !== ""){
        var bastionfighterId = convert.upsert_fighter(match, fighter_map, 'bastion', lastId, round_num, context)
        lastId = bastionfighterId > lastId ? bastionfighterId : lastId
        tile.fighters.bastion.push(bastionfighterId)
    }

    //pyre
    if(match.pyre_fighter !== ""){
        var pyrefighterId = convert.upsert_fighter(match, fighter_map, 'pyre', lastId, round_num, context)
        lastId = pyrefighterId > lastId ? pyrefighterId : lastId
        tile.fighters.pyre.push(pyrefighterId)
    }
})

var flatmap = {}
fighter_map.forEach((v,k) => flatmap[`${k}`] = v)

//output the round and the new fighters
var fighter_data = JSON.stringify(flatmap, null, 2)
fs.writeFileSync('./new_allfighters.json', fighter_data)

var round_out = JSON.stringify(map_round, null, 2)
fs.writeFileSync(`./new_round-${round_num}.json`, round_out)

