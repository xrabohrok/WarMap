//to be run on node REPL
//for converting the round on https://docs.google.com/spreadsheets/d/1qcOQ5XtHYM2DvT-_YClxSi5fx7Hbizox1czpGWm1aTA/edit#gid=30197188
//convert the tsv of the match data into the following schema

//tile
//bastion_fighter
//bastion_comic_link
//pyre_fighter
//pyre_comic_link
//winner

//then require in that file, and this one, pass in the new round file into this adapt_fighters

// "h6": {
//     "location": "h6",
//     "contest": true,
//     "owner": "bastion",
//     "attacker": "pyre",
//     "fighters": {
//       "pyre": [
//         26
//       ],
//       "bastion": [
//         27
//       ]
//     },
//     "grandBattle": false,
//     "outcome": {
//       "bastion": "win",
//       "pyre": "lose"
//     },
//     "items": []
//   },

//bastion_fighter
//bastion_comic_link
//pyre_fighter
//pyre_comic_link


// import { assert } from 'console';
const fs = require('fs')
const fighters = require('../allfighters.json')
// const round = require('../empty-map-schema.js')

console.log('Loaded, use adapt_fighters(round number, round_json, bool-pyre-attacking')
console.log('or use the gb loader adapt_grand_battle(round_num, round_data, tile_location, context)')
console.log(`found `)

const upsert_fighter = function(match, fighter_map, faction, lastId, round_num, context = 'duel'){
    let curFighter = null
    for (const [_, value] of fighter_map) {
        if(value.name.toLowerCase() === match[`${faction}_fighter`].toLowerCase()){
            curFighter = value
            break
        }
    }

    //var curFighter = fighter_map.find(f => f.name.toLowerCase() === match[`${faction}_fighter`].toLowerCase())
    var fighterId = !!curFighter ? curFighter.id : -1
    if(fighterId === -1){
        fighter_map[lastId+1] = {
            id: lastId + 1,
            name: match[`${faction}_fighter`],
            rounds: [round_num],
            link: [match[`${faction}_comic_link`]],
            context: [context],
            faction: [faction],
            artists: [],
            backstory: "",
            verified: false  //new fighters need to be audited
        }
        return lastId + 1
    }

    var fighter = fighter_map[fighterId]
    fighter.rounds.push(round_num)
    fighter.context.push(context)
    fighter.faction.push(faction)
    fighter.link.push(match[`${faction}_comic_link`])
    return fighterId
    
}

const determine_tile_owner = function(tile){
    //the arbitrary nature of GB's mean those have to be flipped manually, unfortuanately
    if(!tile.contest) return tile.owner
    if(tile.outcome.pyre === "win") return "pyre"
    if(tile.outcome.bastion === "win") return "bastion"
    return "na"
}

//load the grand battle info
//context 
exports.adapt_grand_battle = function(round_num, round_data, tile_location, context){
    var map_round = require(`./round-${round_num}.json`)
    var lastId = 0
    
    var fighterIter = Object.values(fighters)
    var fighter_map = new Map()
    for (const fighter of fighterIter) {
        fighter_map[fighter.id] = fighter
        lastId = lastId < fighter.id ? fighter.id : lastId
    }

    var tile = map_round[tile_location.toLowerCase()]
    tile.grandBattle = true


    round_data.forEach((match, i) => {
        //bastion
        if(match.bastion_fighter !== ""){
            var bastionfighterId = upsert_fighter(match, fighter_map, 'bastion', lastId, round_num, context)
            lastId = bastionfighterId > lastId ? bastionfighterId : lastId
            tile.fighters.bastion.push(bastionfighterId)
        }

        //pyre
        if(match.pyre_fighter !== ""){
            var pyrefighterId = upsert_fighter(match, fighter_map, 'pyre', lastId, round_num, context)
            lastId = pyrefighterId > lastId ? pyrefighterId : lastId
            tile.fighters.pyre.push(pyrefighterId)
        }
    })

        //output the round and the new fighters
        var fighter_data = JSON.stringify(fighter_map, null, 2)
        fs.writeFileSync('./new_allfighters.json', fighter_data)
    
        var round_data = JSON.stringify(map_round, null, 2)
        fs.writeFileSync(`./new_round-${round_num}.json`, round_data)

}

exports.adapt_fighters = function(round_num, round_data, pyre_attacking){
    var map_round = {}
    var lastId = 0

    var fighterIter = Object.values(fighters)
    var fighter_map = new Map()
    for (const fighter of fighterIter) {
        fighter_map[fighter.id] = fighter
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
            items: [],
            fighters: {
                pyre: [],
                bastion: []
            },
            outcome: {
                pyre: "",
                bastion: ""
            }
       }
    })
    // console.log(map_round)

    round_data.forEach((match,i) => {
        
        //bastion
        var bastionfighterId = upsert_fighter(match, fighter_map, 'bastion', lastId, round_num)
        lastId = bastionfighterId > lastId ? bastionfighterId : lastId

        //pyre
        var pyrefighterId = upsert_fighter(match, fighter_map, 'pyre', lastId, round_num)
        lastId = pyrefighterId > lastId ? pyrefighterId : lastId

        let winnerId = -1
        if(fighter_map[bastionfighterId].name.toLowerCase() === match.winner.toLowerCase()){
            winnerId = bastionfighterId
        }else if (fighter_map[pyrefighterId].name.toLowerCase() === match.winner.toLowerCase()){
            winnerId = pyrefighterId
        }
        assert(winnerId !== -1, `Could not find the winner of match for ${match.tile}, could not find ${match.winner}`)

        //do the round def
        console.log(`|${match.tile.toLowerCase()}|`)
        var tile = map_round[match.tile.toLowerCase()]
        tile.contest = true
        tile.attacker = pyre_attacking && i < round_data.length/2 ? 'pyre' : 'bastion'
        tile.fighters.bastion = [bastionfighterId]
        tile.fighters.pyre = [pyrefighterId]
        tile.outcome.bastion = winnerId === bastionfighterId ? "win" : "lose"
        tile.outcome.pyre = winnerId === bastionfighterId ? "lose" : "win"

    });

    //output the round and the new fighters
    var fighter_data = JSON.stringify(fighter_map, null, 2)
    fs.writeFileSync('./new_allfighters.json', fighter_data)

    var round_data = JSON.stringify(map_round, null, 2)
    fs.writeFileSync(`./new_round-${round_num}.json`, round_data)
}
