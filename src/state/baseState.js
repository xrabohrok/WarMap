import allRounds from '../assets/data/rounds/allRounds'
import mapMeta from '../assets/data/map-meta.json'
import zoneInfo from '../assets/data/zones/zone-info.json'
import fighters from '../assets/data/allfighters.json'

const defaultState = {
    
    curHovered: 'NA',
    curSelected: "NA",
    curRound:0,
    roundData: allRounds,
    simpleMode: false,
    metaMap: mapMeta,
    zoneDesc: zoneInfo,
    allFighters: fighters,
}

export default defaultState;