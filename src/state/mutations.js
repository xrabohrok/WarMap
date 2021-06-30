import { getKey, initializeKey, setKey } from "../common/localStorage"

const mutations = {
  newSelected(state, target) {
    state.curSelected = target
  },
  deSelect(state) {
    state.curSelected = "NA"
  },
  setGraphicVisibility(state, newVal) {
    state.showGraphics = newVal
  },
  setCurrentRound(state, newVal) {
    if (isNaN(newVal)) {
      state.curRound = 0
      return
    }

    var input = parseInt(newVal)
    if (input > state.roundData.length - 1) {
      state.curRound = state.roundData.length - 1
      return
    } else if (input < 0) {
      state.curRound = 0
    }
    state.curRound = input
  },
  setLabelVisibility(state, newVal) {
    state.showLabels = newVal
  },
  setItemVisibility(state, newVal) {
    state.showItems = newVal
  },
  revealSpoiler(state) {
    var index = state.revealed[state.curRound].findIndex(
      r => r === state.curSelected
    )
    if (index === -1) {
      state.revealed[state.curRound].push(state.curSelected)
    }
  },
  localStorageAvailable(state, result) {
    state.localStorageAvailable = result
  },
  initializeReadingListFromStorage(state) {
    //no local storage
    if (!state.localStorageAvailable) {
      state.readingList = {}
      return
    }

    var storageList = getKey("readingList")
    //local storage but new user
    if (storageList == null) {
      initializeKey("readingList")
      state.readingList = {}
    } else {
      state.readingList = storageList
    }
  },
  markAsRead(state, input) {
    if (!(`${input.fighterId}` in state.readingList)) {
      state.readingList[input.fighterId] = []
    }

    state.readingList[input.fighterId].push(input.round)

    if (state.localStorageAvailable) {
      setKey("readingList", state.readingList)
    }
  },
  unmarkAsRead(state, input) {
    if (`${input.fighterId}` in state.readingList) {
      var index = state.readingList[input.fighterId].indexOf(input.round)
      if (index !== -1) state.readingList[input.fighterId].splice(index, 1)
    }
  }
}

export default mutations

const NEW_SELECTED = "newSelected"
const DESELECT = "deSelect"
const CHANGE_ROUND = "setCurrentRound"
const REVEAL_SPOILER = "revealSpoiler"
const LS_INIT = "initializeReadingListFromStorage"
const LS_AVAILABLE = "localStorageAvailable"
const MARK_READ = "markAsRead"
const MARK_UNREAD = "unmarkAsRead"

const OPT_SET_GRAPHIC_VISIBILITY = "setGraphicVisibility"
const OPT_SET_ZONE_VISIBILITY = "setLabelVisibility"
const OPT_SET_ITEM_VISIBILITY = "setItemVisibility"

export {
  NEW_SELECTED,
  DESELECT,
  CHANGE_ROUND,
  REVEAL_SPOILER,
  LS_INIT,
  LS_AVAILABLE,
  MARK_READ,
  MARK_UNREAD,
  OPT_SET_GRAPHIC_VISIBILITY,
  OPT_SET_ZONE_VISIBILITY,
  OPT_SET_ITEM_VISIBILITY
}
