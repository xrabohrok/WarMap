var args = process.argv.slice(2)

const filename = args[0]
const finalmode = args[1]
const skipWinner = args[2]
const inputfile = require(filename)

const shouldIgnoreTile = finalmode === "true"
const hasNoWinner = skipWinner === "true"

console.log(
  `1: ${finalmode}/${shouldIgnoreTile}, 2: ${skipWinner}/${hasNoWinner}`
)

const checker = require("./convert.js")
const allFighters = require("../allfighters.json")

inputfile.forEach(rd => {
  if (!hasNoWinner) {
    const winner = rd.winner.trim().toLowerCase()
    if (
      !(
        rd.bastion_fighter.trim().toLowerCase() === winner ||
        rd.pyre_fighter.trim().toLowerCase() === winner
      )
    ) {
      console.log(`${rd.bastion_fighter} v ${rd.pyre_fighter} does not resolve`)
    }
  }
  if (!shouldIgnoreTile && rd.tile.length > 3) {
    console.log(`Something is up with ${rd.tile}`)
  }

  if (rd.bastion_fighter !== "")
    checker.check_fighter_exists(allFighters, rd.bastion_fighter)
  if (rd.pyre_fighter !== "")
    checker.check_fighter_exists(allFighters, rd.pyre_fighter)
})

console.log("done!")
