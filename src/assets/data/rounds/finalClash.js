const fs = require("fs")
const assert = require("assert")
var args = process.argv.slice(2)

if (args.find(a => a.includes("help"))) {
  console.log(
    "the final-clash import script requires the following:" +
      "\n\tdata argument: path to a .json formatted file that includes the outcomes of the rounds"
  )

  process.exit(0)
}

const round_num = 9

const filename = args.find(a => a.includes("data")).split("=")[1]
const round_data = require(filename)

var fighters = require("../allfighters.json")
var convert = require("./convert.js")

var map_round = require(`./round-9.json`)
var lastId = 0

var fighterIter = Object.values(fighters)
var fighter_map = new Map()
for (const fighter of fighterIter) {
  fighter_map.set(fighter.id, fighter) //apparantly you need this in order to be iterable
  lastId = lastId < fighter.id ? fighter.id : lastId
}

map_round["grandbattle"] = {
  zones: ["grandbattle1", "grandbattle2", "grandbattle3"]
}

// console.log(map_round)

round_data.forEach((match, i) => {
  //bastion
  var bastionfighterId = convert.upsert_fighter(
    match,
    fighter_map,
    "bastion",
    lastId,
    round_num
  )
  lastId = bastionfighterId > lastId ? bastionfighterId : lastId

  //pyre
  var pyrefighterId = convert.upsert_fighter(
    match,
    fighter_map,
    "pyre",
    lastId,
    round_num
  )
  lastId = pyrefighterId > lastId ? pyrefighterId : lastId

  let winnerId = -1
  // console.log(`${pyrefighterId}: ${fighter_map}`)

  if (
    fighter_map
      .get(bastionfighterId)
      .name.trim()
      .toLowerCase() === match.winner.trim().toLowerCase()
  ) {
    winnerId = bastionfighterId
  } else if (
    fighter_map
      .get(pyrefighterId)
      .name.trim()
      .toLowerCase() === match.winner.trim().toLowerCase()
  ) {
    winnerId = pyrefighterId
  }
  assert(
    winnerId !== -1,
    `Could not find the winner of match for ${match.tile}, could not find ${match.winner}`
  )

  //do the round def
  // console.log(`|${match.tile.toLowerCase()}|`)
  var tile = map_round[match.tile.toLowerCase()]
  console.log(`updating: ${match.tile.toLowerCase()}`)
  tile.fighters.bastion.push(bastionfighterId)
  tile.fighters.pyre.push(pyrefighterId)
  tile.outcome.bastion = winnerId === bastionfighterId ? "win" : "lose"
  tile.outcome.pyre = winnerId === bastionfighterId ? "lose" : "win"

  tile.miniclash = true
})

var flatmap = {}
fighter_map.forEach((v, k) => (flatmap[`${k}`] = v))

//output the round and the new fighters
var fighter_out = JSON.stringify(flatmap, null, 2)
fs.writeFileSync("./new_allfighters.json", fighter_out)

var round_out = JSON.stringify(map_round, null, 2)
fs.writeFileSync(`./new_round-${round_num}.json`, round_out)