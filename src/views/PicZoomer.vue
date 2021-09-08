<template>
  <div class="about">
    <h1>Character auditor</h1>

    <v-multiselect-listbox
      :options="allFighters"
      :reduce-display-property="option => option.name"
      :reduce-value-property="option => option.id"
      v-model="selected"
      @change="changeFighter"
      class="boxClass"
    />
    <div class="row">
      <div class="button" @click="clear">Clear</div>
      <div class="button" @click="reset">Reset Position</div>
      <div class="button" @click="send">Change Pic Center</div>
    </div>

    <div class="editorText">{{ selected }}</div>
    <div class="row">
      <ProfilePicEditor
        :imgUrl="`/fighterimages/${curFighterPic}.png`"
        class="profPic"
        :zoom_start="curPositioning.zoom"
        :left_start="curPositioning.left"
        :top_start="curPositioning.top"
        :lazyUpdate="updatePos"
      />
      <ProfilePic
        :imgUrl="`/fighterimages/${curFighterPic}.png`"
        class="smallPic"
        :zoom_start="curPositioning.zoom"
        :left_start="curPositioning.left"
        :top_start="curPositioning.top"
        ref="smallView"
      />
      <ProfilePic
        :imgUrl="`/fighterimages/${curFighterPic}.png`"
        class="gbPic"
        :zoom_start="curPositioning.zoom"
        :left_start="curPositioning.left"
        :top_start="curPositioning.top"
        ref="tinyView"
      />
    </div>

    <div class="editorText">{{ curPositioning }}</div>
  </div>
</template>

<script>
import vMultiselectListbox from "vue-multiselect-listbox"
import "vue-multiselect-listbox/dist/vue-multi-select-listbox.css"
import ProfilePicEditor from "../components/elements/ProfilePicEditor.vue"
import ProfilePic from "../components/elements/ProfilePic.vue"

const axios = require("axios").default
// const api = axios.create({baseURL: '/server'});

const alpahbeticalSort = function(a, b) {
  const theFinder = /the /i
  var textA = a.name.toUpperCase().replace(theFinder, "")
  var textB = b.name.toUpperCase().replace(theFinder, "")
  return textA < textB ? -1 : textA > textB ? 1 : 0
}

export default {
  components: {
    vMultiselectListbox,
    ProfilePicEditor,
    ProfilePic
  },
  data() {
    return {
      selected: [],
      curFighters: [],
      curPositioning: { zoom: 1, left: 50, top: 50 },
      availablePics: []
    }
  },
  computed: {
    allFighters: function() {
      return Object.keys(this.curFighters)
        .map(k => this.curFighters[k])
        .sort(alpahbeticalSort)
    },
    curFighterPic: function() {
      if (this.selected.length === 0) return "no-pic"
      return this.selected[0]
    }
  },
  methods: {
    clear: function() {
      console.log("cleared!")
      console.log(this.selected)
      this.selected = []
    },
    reset: function() {
      this.curPositioning = {
        zoom: 1,
        left: 50,
        top: 50
      }
    },
    changeFighter: function() {
      var curr = this.selected[0]
      if (curr === undefined) return

      var fighter = this.allFighters.find(f => f.id === curr)
      if ("profilePic" in fighter) {
        this.curPositioning = {
          zoom: Number(fighter.profilePic.zoom),
          left: Number(fighter.profilePic.left),
          top: Number(fighter.profilePic.top)
        }
      } else {
        this.curPositioning = {
          zoom: 1,
          left: 50,
          top: 50
        }
      }
    },
    send: function() {
      axios
        .post(`/server/picture/${this.selected[0]}`, {
          zoom: this.curPositioning.zoom.toFixed(2),
          left: this.curPositioning.left.toFixed(2),
          top: this.curPositioning.top.toFixed(2)
        })
        .then(() => {
          axios
            .get("/server/allFighters")
            .then(response2 => {
              this.curFighters = response2.data
              this.$refs.smallView.updateView()
              this.$refs.tinyView.updateView()
            })
            .catch(r2 => console.log(r2))
        })
        .then(response => {
          const updateFighters = response => {
            this.availablePics = response.data
            var keepers = Object.keys(this.curFighters).filter(cf =>
              this.availablePics.includes(parseInt(cf, 10))
            )
            var retval = {}
            keepers.forEach(k => (retval[`${k}`] = this.curFighters[`${k}`]))
            this.curFighters = retval
          }
          axios
            .get("/server/pics")
            .then(updateFighters)
            .catch(r => console.log(r))
          this.clear()
          return response
        })
        .catch(r => console.log(r))
    },

    updatePos: function(zoom, left, top) {
      this.curPositioning["zoom"] = zoom
      this.curPositioning["left"] = left
      this.curPositioning["top"] = top
    }
  },
  mounted: function() {
    axios
      .get("/server/allFighters")
      .then(response => {
        this.curFighters = response.data
        return response
      })
      .then(response => {
        const updateFighters = response => {
          this.availablePics = response.data
          var keepers = Object.keys(this.curFighters).filter(cf =>
            this.availablePics.includes(parseInt(cf, 10))
          )
          var retval = {}
          keepers.forEach(k => (retval[`${k}`] = this.curFighters[`${k}`]))
          this.curFighters = retval
        }

        axios
          .get("/server/pics")
          .then(updateFighters)
          .catch(r => console.log(r))
        return response
      })
      .catch(r => console.log(r))
  },
  name: "PicZoomer"
}
</script>

<style scoped>
.profPic {
  height: 30vh;
  width: 30vh;
  border-style: solid;
  border-color: black;
}

.smallPic {
  height: 15vh;
  width: 15vh;
  border-style: solid;
  border-color: yellow;
}

.gbPic {
  height: 7.5vh;
  width: 7.5vh;
  border-style: solid;
  border-color: purple;
}

.editorText {
  font-size: 5vw;
  color: rgb(247, 233, 179);
}

.boxClass {
  color: black;
  background-color: white;
}

.button {
  background-color: brown;
  color: whitesmoke;
  margin-top: 0.2em;
  margin-left: auto;
  margin-right: auto;
  padding-top: 0.4em;
  padding-bottom: 0.4em;
  padding-left: 0.7em;
  padding-right: 0.7em;
  width: 5vw;
}

.backgrounds {
  height: 30vh;
  width: 30vw;
}

.button:active {
  background-color: rgb(194, 25, 25);
  color: rgb(185, 185, 185);
}

.row {
  display: flex;
  flex-direction: row;
  margin-top: 1em;
  margin-left: 25%;
  margin-right: 25%;
}
</style>
