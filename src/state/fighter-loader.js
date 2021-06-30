import fighters from "../assets/data/allfighters.json"

//an array doesn't allow me to delete entries..., so we pretend

var fighterMap = new Map()
var fighterIterator = Object.keys(fighters)
// var fighterMap = []
for (const fighterP of fighterIterator) {
  fighterMap[fighters[fighterP].id] = fighters[fighterP]
}

export default fighterMap
