const fs = require("fs")
var args = process.argv.slice(2)

if (args.find(a => a.includes("help"))) {
  console.log(
    "the notes import script requires the following:" +
      "\n\tround argument: which round this should be marked to (1-9)" +
      "\n\tdata argument: path to a .json formatted file that includes the outcomes of the rounds"
  )

  process.exit(0)
}

const round_num = parseInt(
  args.find(a => a.includes("round")).split("=")[1],
  10
)
var map_round = require(`./round-${round_num}.json`)

const filename = args.find(a => a.includes("data")).split("=")[1]
const round_data = require(filename)

// console.log(map_round)

round_data.forEach(match => {
  //bastion
  if (match.notes && match.notes != "") {
    map_round[match.tile.toLowerCase()].notes = match.notes
  }
})

var round_out = JSON.stringify(map_round, null, 2)
fs.writeFileSync(`./new_round-${round_num}.json`, round_out)
