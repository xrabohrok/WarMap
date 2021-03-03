const mutations = {
    newHovered(state, target){
        state.curHovered = target
    },
    newSelected(state, target){
        state.curSelected = target
    }
}

export default mutations;