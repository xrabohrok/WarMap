//round 1: https://git.io/JOimE ; https://cubari.moe/read/gist/JOimE/
//round 2: https://git.io/JOXfB ; https://cubari.moe/read/gist/JOXfB/
//round 3: https://git.io/JOXUt ; https://cubari.moe/read/gist/JOXUt/
//round 4: https://git.io/JsMjl ; https://cubari.moe/read/gist/JsMjl/

//pyre clash r5: https://git.io/Jnaek ; https://cubari.moe/read/gist/Jnaek/

var args = process.argv.slice(2)
const round = parseInt(args.find(a => a.includes('round')).split('=')[1],10)

var fighters = require('../src/assets/data/allfighters.json')

var roundData = {
    title: `War For Rayuba Round ${round}`,
    description: `A War for Rayuba master set of comics for round ${round}.  PLEASE NOTE: This collection only includes comics that were submitted as imgur links; it does not include comics submitted directly through discord, twitter, or anything outside imgur.  You will still need to access the discord and view those battle channels to view those. \r\n ...And You should!`,
    artist: "Various artists on the WFR Discord (check each comic)",
    author: "Various artists on the WFR Discord (check each comic)",
    cover: "",
    chapters: {},
}

const imgurIDPart = /\/(a|gallery)\/.......$/i

const newChapter = function(title, roundnum, link){
    var temp = {
        title: `${title}`,
        volume: `${roundnum}`,
        groups: {},
        last_updated: `${Math.floor(Date.now()/1000)}`
    }
    // temp.groups[`${title} fight`] = `/proxy/api/imgur/chapter/${link}/`
    temp.groups["primary"] = `/proxy/api/imgur/chapter/${link}/`
    return temp
}

var excluded = []

var chapterNum = 1
for(const key of Object.keys(fighters)){
    var fighter = fighters[key]
    if(!fighter.rounds.includes(round)) continue

    var index = fighter.rounds.findIndex(r => r === round)
    var matches = fighter.link[index].match(imgurIDPart)
    if(matches === null) {
        excluded.push(fighter.name)
        console.log(fighter.name)
        continue
    }

    var id = matches[0].split('/')[2]
    roundData.chapters[chapterNum] = newChapter(fighter.name, round, id)
    chapterNum += 1
}

if(excluded.length > 0){
    var excludedString = ""
    excluded.forEach(e => excludedString += ` ${e},`)
    roundData.description = roundData.description + "\r\n\r\n The following characters are not represented here:\r\n" + excludedString
}

var fs = require('fs')
fs.writeFileSync(`./master-list-${round}.json`, JSON.stringify(roundData, null, 2))
console.log('Complete!')