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
    curZoneId: (state) => (tileName) => {
        return state.metaMap[tileName].zone
    },
    curZoneName: (state) => (tileName) => {
        return state.zoneDesc[getters.curZoneId(state)(tileName)].name
    },
    curZoneDesc: (state) => (tileName) => {
        return state.zoneDesc[getters.curZoneId(state)(tileName)].desc
    },
    curZoneContested: (state) => (tileName) => {
        if(state.curSelected === "NA") return false
        return state.roundData[state.curRound][tileName].contest
    },
    curZoneGrandBattle: (state) => (tileName) => {
        return state.roundData[state.curRound][tileName].grandBattle
    },
    curZoneFight: (state) => {
        if(state.curSelected == "NA") return {
            fighters: {pyre:[], bastion: []},
            constest: false,
            grandBattle:false
        }
        return state.roundData[state.curRound][state.curSelected]
    },
    fighter: (state) => (fighterId) => {
        return state.allFighters[fighterId]
    }

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

export {HOVERING_GETTER, SELECTING_GETTER, CURRENT_ROUND, TILE_OWNER, SIMPLE_MODE, CURRENT_ZONE_NAME, CURRENT_ZONE_DESC, CURRENT_ZONE_CONTESTED, 
    CURRENT_ZONE_GRANDBATTLE, CURRENT_ZONE_FIGHT, FIGHTER_GETTER}