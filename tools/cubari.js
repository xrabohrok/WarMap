//round 1: https://git.io/JOiLS

var args = process.argv.slice(2)
const round = parseInt(args.find(a => a.includes('round')).split('=')[1],10)

var fighters = require('../src/assets/data/allfighters.json')

var roundData = {
    title: `War For Rayuba Round ${round}`,
    description: `A War for Rayuba master set of comics for round ${round}`,
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
        last_updated: `${Date.now()}`
    }
    // temp.groups[`${title} fight`] = `/proxy/api/imgur/chapter/${link}/`
    temp.groups["primary"] = `/proxy/api/imgur/chapter/${link}/`
    return temp
}

var chapterNum = 1
for(const key of Object.keys(fighters)){
    var fighter = fighters[key]
    if(!fighter.rounds.includes(round)) continue

    var index = fighter.rounds.findIndex(r => r === round)
    var matches = fighter.link[index].match(imgurIDPart)
    if(matches === null) continue

    var id = matches[0].split('/')[2]
    roundData.chapters[chapterNum] = newChapter(fighter.name, round, id)
    chapterNum += 1
}

var fs = require('fs')
fs.writeFileSync(`./master-list-${round}.json`, JSON.stringify(roundData, null, 2))
console.log('Complete!')