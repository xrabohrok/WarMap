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
    }
}

export default mutations;

const NEW_HOVERED = 'newHovered'
const NEW_SELECTED = 'newSelected'
const SET_SIMPLE_MODE = 'setSimpleMode'
const DESELECT = 'deSelect'
const CHANGE_ROUND = 'setCurrentRound'

export {NEW_HOVERED, NEW_SELECTED, SET_SIMPLE_MODE, DESELECT, CHANGE_ROUND}