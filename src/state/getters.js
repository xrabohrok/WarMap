const getters = {
    hovering: state => state.curHovered,
    selecting: state => state.curSelected,
    round: state => state.curRound,
    curRoundBoard: state => state.roundData[state.curRound],
    
    tileState: (state) => (tileName) => {
        return state.roundData[state.curRound][tileName];
    },
    tileOwner: (state) => (tileName) => {
        return state.roundData[state.curRound][tileName].owner;
    }

}

export default getters;

const HOVERING_GETTER = 'hovering'
const SELECTING_GETTER = 'selecting'
const CURRENT_ROUND = 'round'
const TILE_OWNER = 'tileOwner'

export {HOVERING_GETTER, SELECTING_GETTER, CURRENT_ROUND, TILE_OWNER}