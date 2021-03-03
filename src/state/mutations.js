const mutations = {
    newHovered(state, target){
        state.curHovered = target
    },
    newSelected(state, target){
        state.curSelected = target
    }
}

export default mutations;

const NEW_HOVERED = 'newHovered'
const NEW_SELECTED = 'newSelected'

export {NEW_HOVERED, NEW_SELECTED}