const fs = require('fs')
var args = process.argv.slice(2)

if(args.find(a => a.includes("help"))){
    console.log('the duel import script requires the following:'+
    '\n\tround argument: which round this should be marked to (1-9)'+
    '\n\tdata argument: path to a .json formatted file that includes the outcomes of the rounds'+
    '\n\tpyre_attacking: true if pyre is attacking first this round, false if bastion'+
    '\n\tgrandBattle_zones: comma delimited zones of the two grandbattle arenas')

    return 0
}

var args = process.argv.slice(2)

const round_num = parseInt(args.find(a => a.includes('round')).split('=')[1],10)
const pyre_attacking = args.find(a => a.includes('pyre_attacking')).split('=')[1] === "true"

const filename = args.find(a => a.includes('data')).split('=')[1]
const round_data = require(filename)

var context = args.find(a => a.includes('context'))
var context = context == undefined ? "gb" : context.split('=')[1]

var fighters = require('../src/assets/data/allfighters.json')

var convert = require('./convert.js')

const determine_tile_owner = function(tile){
    //the arbitrary nature of GB's mean those have to be flipped manually, unfortuanately
    if(!tile.contest) return tile.owner
    if(tile.outcome.pyre === "win") return "pyre"
    if(tile.outcome.bastion === "win") return "bastion"
    return "na"
}

var map_round = {}
var lastId = 0

var fighterIter = Object.values(fighters)
var fighter_map = new Map()
for (const fighter of fighterIter) {
    fighter_map.set(fighter.id, fighter) //apparantly you need this in order to be iterable
    lastId = lastId < fighter.id ? fighter.id : lastId
}

//initialize round schema:
var round = require(`./round-${round_num-1}.json`)
Object.keys(round).forEach(t => {
    var ownership = determine_tile_owner(round[t])
    // console.log(ownership)
    map_round[t] = {
        location: t,
        contest: false,
        attacker: 'na',
        owner: ownership,
        grandBattle: false,
        clash: false,
        items: [],
        fighters: {
            pyre: [],
            bastion: []
        },
        outcome: {
            pyre: "",
            bastion: ""
        },
        events:[]
    }
})

map_round['grandbattle'] = {zones:gb_zone_array}

// console.log(map_round)

round_data.forEach((match,i) => {
    
    //bastion
    var bastionfighterId = convert.upsert_fighter(match, fighter_map, 'bastion', lastId, round_num)
    lastId = bastionfighterId > lastId ? bastionfighterId : lastId

    //pyre
    var pyrefighterId = convert.upsert_fighter(match, fighter_map, 'pyre', lastId, round_num)
    lastId = pyrefighterId > lastId ? pyrefighterId : lastId

    let winnerId = -1
    // console.log(`${pyrefighterId}: ${fighter_map}`)

    if(fighter_map.get(bastionfighterId).name.trim().toLowerCase() === match.winner.trim().toLowerCase()){
        winnerId = bastionfighterId
    }else if (fighter_map.get(pyrefighterId).name.trim().toLowerCase() === match.winner.trim().toLowerCase()){
        winnerId = pyrefighterId
    }
    assert(winnerId !== -1, `Could not find the winner of match for ${match.tile}, could not find ${match.winner}`)

    //do the round def
    // console.log(`|${match.tile.toLowerCase()}|`)
    var tile = map_round[match.tile.toLowerCase()]
    tile.contest = true
    tile.attacker = (pyre_attacking && i < round_data.length/2) || (!pyre_attacking && i > round_data.length/2) ? 'pyre' : 'bastion'
    tile.fighters.bastion = [bastionfighterId]
    tile.fighters.pyre = [pyrefighterId]
    tile.outcome.bastion = winnerId === bastionfighterId ? "win" : "lose"
    tile.outcome.pyre = winnerId === bastionfighterId ? "lose" : "win"

});

var flatmap = {}
fighter_map.forEach((v,k) => flatmap[`${k}`] = v)

//output the round and the new fighters
var fighter_out = JSON.stringify(flatmap, null, 2)
fs.writeFileSync('./new_allfighters.json', fighter_out)

var round_out = JSON.stringify(map_round, null, 2)
fs.writeFileSync(`./new_round-${round_num}.json`, round_out)
