//round 1: https://git.io/JOimE ; https://cubari.moe/read/gist/JOimE/
//round 2: https://git.io/JOXfB ; https://cubari.moe/read/gist/JOXfB/
//round 3: https://git.io/JOXUt ; https://cubari.moe/read/gist/JOXUt/
//round 4: https://git.io/JsMjl ; https://cubari.moe/read/gist/JsMjl/
//round 5: https://git.io/JcJJF ; https://cubari.moe/read/gist/JcJJF/
//round 6: https://git.io/JBXt1 ; https://cubari.moe/read/gist/JBXt1/
//round 7: https://git.io/JEyjS ; https://cubari.moe/read/gist/JEyjS/
//round 8: https://git.io/J6Bqb ; https://cubari.moe/read/gist/J6Bqb/

//pyre clash r5: https://git.io/Jnaek ; https://cubari.moe/read/gist/Jnaek/

//prisoner/snix r6: https://git.io/JBu17 ; https://cubari.moe/read/gist/JBu17/
//pyre glash r6: https://git.io/JBwpe ; https://cubari.moe/read/gist/JBu17/
//girl with gun r7: https://git.io/JED9q ; https://cubari.moe/read/gist/JED9q/

//Pyre collab GB 3 r9 https://cubari.moe/read/gist/Z2lzdC94cmFib2hyb2svYTk2ZTlmYzM4YTQ1Njg2ZmYxYTE2NzlkY2NjZTE5MzYvcmF3Lw/

var args = process.argv.slice(2)
const round = parseInt(args.find(a => a.includes("round")).split("=")[1], 10)
const appenderModeValue = args.find(a => a.includes("append"))
const appenderMode = appenderModeValue >= 0 && appenderModeValue <= 9

var fighters = require("../src/assets/data/allfighters.json")

var roundData = {}
var chapterNum = 1

if (!appenderMode) {
  roundData = {
    title: `War For Rayuba Round ${round}`,
    description: `A War for Rayuba master set of comics for round ${round}.  PLEASE NOTE: This collection only includes comics that were submitted as imgur links; it does not include comics submitted directly through discord, twitter, or anything outside imgur.  You will still need to access the discord and view those battle channels to view those. \r\n ...And You should!`,
    artist: "Various artists on the WFR Discord (check each comic)",
    author: "Various artists on the WFR Discord (check each comic)",
    cover: "",
    chapters: {}
  }
} else {
  //load previous list, find last place in that list, and filter out old already placed stuff
  roundData = require(`./master-list-${round}.json`)
  chapterNum =
    parseInt(
      Object.keys(roundData.chapters).reduce((a, b) => {
        var ai = parseInt(a, 10)
        var bi = parseInt(b, 10)
        if (ai > bi) return a
        if (bi > ai) return b
        return a
      })
    ) + 1
  var toDelete = []
  Object.values(fighters).forEach(f => {
    //not part of the round
    if (!f.rounds.includes(round)) {
      toDelete.push(`${f.id}`)
    } else {
      var roundIndex = f.rounds.findIndex(i => i === round)
      var url = f.link[roundIndex]
      //no imgur link (apender wont deal with these)
      if (!url.includes("imgur")) {
        toDelete.push(`${f.id}`)
      } else {
        //and of course, this fighter is already on the list (by imgur id)
        var imgurPart = url.split("/")[4]
        Object.values(roundData.chapters).forEach(rd => {
          if (rd.groups.primary.includes(imgurPart)) {
            toDelete.push(`${f.id}`)
          }
        })
      }
    }
  })
  toDelete.forEach(td => delete fighters[td])
}

const imgurIDPart = /\/(a|gallery)\/.......$/i

const newChapter = function(title, roundnum, link) {
  var temp = {
    title: `${title}`,
    volume: `${roundnum}`,
    groups: {},
    last_updated: `${Math.floor(Date.now() / 1000)}`
  }
  // temp.groups[`${title} fight`] = `/proxy/api/imgur/chapter/${link}/`
  temp.groups["primary"] = `/proxy/api/imgur/chapter/${link}/`
  return temp
}

var excluded = []
var linkMap = new Map()

for (const key of Object.keys(fighters)) {
  var fighter = fighters[key]
  if (!fighter.rounds.includes(round)) continue

  var index = fighter.rounds.findIndex(r => r === round)
  var matches = fighter.link[index].match(imgurIDPart)
  if (matches === null) {
    excluded.push(fighter.name)
    console.log(fighter.name)
    continue
  }

  var imgurid = matches[0].split("/")[2]

  //sort comics by imgurids to detect and group collabs
  if (!linkMap.has(imgurid)) {
    linkMap.set(imgurid, [fighter.name])
  } else {
    var temp = linkMap.get(imgurid)
    temp.push(fighter.name)
    linkMap.set(imgurid, temp)
  }
}

linkMap.forEach((value, key) => {
  var chapterTitle = ""
  if (value.length > 1) {
    chapterTitle = value.reduce((accumulator, currentVal, curIndex, source) => {
      if (curIndex == source.length - 1) {
        return `${accumulator}, and ${currentVal}`
      }
      return `${accumulator}, ${currentVal}`
    })
  } else {
    chapterTitle = value[0]
  }

  roundData.chapters[chapterNum] = newChapter(chapterTitle, round, key)
  chapterNum += 1
})

if (excluded.length > 0 && !appenderMode) {
  var excludedString = ""
  excluded.forEach(e => (excludedString += ` ${e},`))
  roundData.description =
    roundData.description +
    "\r\n\r\n The following characters are not represented here:\r\n" +
    excludedString
}

var fs = require("fs")
fs.writeFileSync(
  `./master-list-${round}.json`,
  JSON.stringify(roundData, null, 2)
)
console.log("Complete!")
if (appenderMode)
  console.log("Reminder: you need to add the missing fighters yourself!")
