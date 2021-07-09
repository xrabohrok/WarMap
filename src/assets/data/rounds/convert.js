//for converting the round on https://docs.google.com/spreadsheets/d/1qcOQ5XtHYM2DvT-_YClxSi5fx7Hbizox1czpGWm1aTA/edit#gid=30197188
//convert the tsv of the match data into the following schema

//tile
//bastion_fighter
//bastion_comic_link
//pyre_fighter
//pyre_comic_link
//winner

//then require in that file, and this one, pass in the new round file into this adapt_fighters

//bastion_fighter
//bastion_comic_link
//pyre_fighter
//pyre_comic_link

const checkForNonSubmission = function(url) {
  if (url === "[no submission]") return "na"
  return url
}

exports.upsert_fighter = function(
  match,
  fighter_map,
  faction,
  lastId,
  round_num,
  context = "duel"
) {
  let curFighter = null

  for (const value of fighter_map.values()) {
    if (
      value.name.trim().toLowerCase() ===
      match[`${faction}_fighter`].trim().toLowerCase()
    ) {
      curFighter = value
      // console.log(`adding to ${value.name} 's entry`)
      break
    }
  }

  //var curFighter = fighter_map.find(f => f.name.toLowerCase() === match[`${faction}_fighter`].toLowerCase())
  var link = checkForNonSubmission(match[`${faction}_comic_link`])
  link = derive_cubari_link(link)

  var fighterId = curFighter != null ? curFighter.id : -1
  if (fighterId === -1) {
    fighter_map.set(lastId + 1, {
      id: lastId + 1,
      name: match[`${faction}_fighter`],
      rounds: [round_num],
      link: [link],
      context: [context],
      faction: [faction],
      artists: {},
      backstory: "",
      verified: false //new fighters need to be audited
    })
    console.log(
      `New Fighter ${fighter_map.get(lastId + 1).name} fighter id : ${lastId +
        1}`
    )
    return lastId + 1
  }

  var fighter = fighter_map.get(fighterId)
  fighter.rounds.push(round_num)
  fighter.context.push(context)
  fighter.faction.push(faction)
  fighter.link.push(link)
  return fighter.id
}

const derive_cubari_link = function(link) {
  //https://cubari.moe/read/imgur/2t0kUUs/1/1/

  const cubariLinkFormat = /^https:\/\/cubari\.moe\/read\/imgur\/......./i
  if (!cubariLinkFormat.test(link)) return link
  const imgurId = /\/\w\w\w\w\w\w\w/i
  var index = link.match(imgurId)[0].slice(1)
  return `https://imgur.com/a/${index}`
}
