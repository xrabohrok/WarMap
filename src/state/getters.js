const getters = {
    hovering: state => state.curHovered,
    selecting: state => state.curSelected
}

export default getters;

const HOVERING_GETTER = 'hovering'
const SELECTING_GETTER = 'selecting'

export {HOVERING_GETTER, SELECTING_GETTER}