import { NEW_SELECTED, CHANGE_ROUND } from "../state/mutations"

const validTile = /[abcdefghijklmn](\d|(1[01234]))$/i

const skipToTile = function(params, component) {
  if (params.has("tile")) {
    if (params.get("tile").match(validTile))
      component.$store.commit(NEW_SELECTED, params.get("tile"))
  }
  if (params.has("round")) {
    var roundNum = Number(params.get("round"))
    if (!isNaN(roundNum) && roundNum >= 0 && roundNum < 10) {
      component.$store.commit(CHANGE_ROUND, roundNum)
    }
  }
}

const rules = [skipToTile]

const extractAndProcessParams = function(component) {
  const uri = window.location.hash.substring(2)
  var params = new URLSearchParams(uri)

  rules.forEach(r => r(params, component))
}

// const getUrlToRoundAndTile = function(round, tile){
//     return `${window.location.origin}${window.location.pathname}#/?round=${round}&tile=${tile}`
// }

export { extractAndProcessParams }
