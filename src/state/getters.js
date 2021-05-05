const getters = {
    hovering: state => state.curHovered,
    selecting: state => state.curSelected,
    round: state => state.curRound,
    simple_mode: state => state.simpleMode,
    curRoundBoard: state => state.roundData[state.curRound],
    
    tileState: (state) => (tileName) => {
        return state.roundData[state.curRound][tileName];
    },
    tileOwner: (state) => (tileName) => {
        return state.roundData[state.curRound][tileName].owner;
    },
    numRounds: (state) => {
        return state.roundData.length
    },
    curZoneId: (state) => (tileName) => {
        return state.metaMap[tileName].zone
    },
    curZoneName: (state) => (tileName) => {
        return state.zoneDesc[getters.curZoneId(state)(tileName)].name
    },
    showZoneLabel: (state) => (tileName) => {
        return 'label' in state.metaMap[tileName]
    },
    curZoneDesc: (state) => (tileName) => {
        return state.zoneDesc[getters.curZoneId(state)(tileName)].desc
    },
    curZoneContested: (state) => (tileName) => {
        if(tileName === "NA") return false
        return state.roundData[state.curRound][tileName].contest
    },
    roundGrandBattles: (state) => {
        if(!('grandbattle' in state.roundData[state.curRound])) return ['na']
        return state.roundData[state.curRound].grandbattle.zones
    },
    curZoneAttacker:(state) => (tileName) => {
        if(tileName === "NA") return "na"
        const curZoneData = state.roundData[state.curRound][tileName]
        if(!curZoneData.contest && !curZoneData.clash) return "na"
        return state.roundData[state.curRound][tileName].attacker
    },
    curZoneGrandBattle: (state) => (tileName) => {
        if(tileName === "NA") return false
        return state.roundData[state.curRound][tileName].grandBattle
    },
    massBattleFighters: (state) => ( faction) => {
        if(state.curSelected === "NA") return []
        var allFighters = state.roundData[state.curRound][state.curSelected].fighters[faction]
        //the first fighter is the duelist if it is a mixed tile
        return state.roundData[state.curRound].contest ? allFighters.slice(1) : allFighters
    },
    curZoneFight: (state) => {
        if(state.curSelected == "NA") return {
            fighters: {pyre:[], bastion: []},
            contest: false,
            grandBattle:false
        }
        return state.roundData[state.curRound][state.curSelected]
    },
    fighter: (state) => (fighterId) => {
        return state.allFighters[fighterId]
    },
    duelistComicCurrent: (state, getters)=> (faction) => {
        var fight = getters.curZoneFight
        if(!fight.contest) return ""
        var fighter = state.allFighters[fight.fighters[faction][0]]
        var subIndex = fighter.rounds.findIndex(i => i == state.curRound)
        return fighter.link[subIndex]
    },
    currentSpoilerRevealed: (state, getters) => {
        var fight = getters.curZoneFight
        if(!(fight.contest || fight.grandBattle)) return false

        return state.revealed[state.curRound].findIndex(i => i === state.curSelected) !== -1
    },
    curZoneIsClash: (state) => {
        //state.roundData[state.curRound][state.curSelected].fighters[faction]
        if(state.curSelected === "NA") return false
        if(!('clash' in state.roundData[state.curRound][state.curSelected])) return false
        return state.roundData[state.curRound][state.curSelected].clash
    },
    tileIsClash: (state) => (tile) => {
        if(!('clash' in state.roundData[state.curRound][tile])) return false
        return state.roundData[state.curRound][tile].clash
    },
    hasReadFightersComic: (state) => (fighterId, round) => {
        if(!(`${fighterId}` in state.readingList)) return false
        return state.readingList[fighterId].includes(round)
    },
    fighterBackstory: (state) => (fighterId) =>{
        if(!(`${fighterId}` in state.backstories)) return ""
        return state.backstories[fighterId]
    },

}

export default getters;

const HOVERING_GETTER = 'hovering'
const SELECTING_GETTER = 'selecting'
const FIGHTER_GETTER = 'fighter'
const CURRENT_ROUND = 'round'
const TILE_OWNER = 'tileOwner'
const SIMPLE_MODE = 'simple_mode'
const CURRENT_ZONE_NAME = 'curZoneName'
const CURRENT_ZONE_DESC = 'curZoneDesc'
const CURRENT_ZONE_CONTESTED = 'curZoneContested'
const CURRENT_ZONE_GRANDBATTLE= 'curZoneGrandBattle'
const CURRENT_ZONE_FIGHT = 'curZoneFight'
const CUR_FIGHTER_LINK = 'duelistComicCurrent'
const CUR_SPOILER_REVEALED = 'currentSpoilerRevealed'
const CUR_ZONE_ID = 'curZoneId'
const SHOW_ZONE_LABEL = 'showZoneLabel'
const NUMBER_OF_ROUNDS = 'numRounds'
const CUR_ZONE_ATTACKER = 'curZoneAttacker'
const ROUND_GRANDBATTLES = 'roundGrandBattles'
const MASSBATTLE_FIGHTERS = 'massBattleFighters'
const CURZONE_IS_CLASH = 'curZoneIsClash'
const TILE_IS_CLASH = 'tileIsClash'
const FIGHTER_BACKSTORY = 'fighterBackstory'

const HAS_READ_COMIC = 'hasReadFightersComic'

export {HOVERING_GETTER, SELECTING_GETTER, CURRENT_ROUND, TILE_OWNER, SIMPLE_MODE, CURRENT_ZONE_NAME, CURRENT_ZONE_DESC, CURRENT_ZONE_CONTESTED, 
    CURRENT_ZONE_GRANDBATTLE, CURRENT_ZONE_FIGHT, FIGHTER_GETTER, CUR_FIGHTER_LINK, CUR_SPOILER_REVEALED, CUR_ZONE_ID, SHOW_ZONE_LABEL, NUMBER_OF_ROUNDS
    ,CUR_ZONE_ATTACKER, ROUND_GRANDBATTLES, MASSBATTLE_FIGHTERS, CURZONE_IS_CLASH, TILE_IS_CLASH, HAS_READ_COMIC, FIGHTER_BACKSTORY}