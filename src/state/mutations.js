const mutations = {
    newHovered(state, target){
        state.curHovered = target
    },
    newSelected(state, target){
        state.curSelected = target
    },
    deSelect(state){
        state.curSelected = 'NA'
    },
    setSimpleMode(state, newVal){
        state.simpleMode = newVal
    },
    setCurrentRound(state, newVal){
        state.curRound = newVal
    },
    revealSpoiler(state)
    {
        var index = state.revealed[state.curRound].findIndex(r => r === state.curSelected)
        if(index === -1){
            state.revealed[state.curRound].push(state.curSelected)
        }
    }
}

export default mutations;

const NEW_HOVERED = 'newHovered'
const NEW_SELECTED = 'newSelected'
const SET_SIMPLE_MODE = 'setSimpleMode'
const DESELECT = 'deSelect'
const CHANGE_ROUND = 'setCurrentRound'
const REVEAL_SPOILER = 'revealSpoiler'

export {NEW_HOVERED, NEW_SELECTED, SET_SIMPLE_MODE, DESELECT, CHANGE_ROUND, REVEAL_SPOILER}