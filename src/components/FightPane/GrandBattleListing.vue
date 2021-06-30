<template>
  <div class="onefighter" :class="{ duelist: isDuelist }">
    <div class="title" v-show="isDuelist">
      Duelist
    </div>
    <div class="details">
      <div class="imghere">
        <ProfilePic
          :imgUrl="fighterIcon"
          :faction="faction"
          :startPos="pictureShift"
          class="fighterIcon"
        />
      </div>
      <div class="fightername">
        {{ fighterName }}
      </div>
      <div class="fightername" v-show="!hideLink">
        <StrikeLink
          :fighterId="fighterId"
          :round="round"
          :inputURL="fighterComic"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { FIGHTER_GETTER } from "../../state/getters"
import ProfilePic from "../elements/ProfilePic.vue"

import StrikeLink from "../elements/StrikeLink.vue"

export default {
  props: {
    fighterId: Number,
    round: Number,
    hideLink: Boolean,
    isDuelist: Boolean
  },
  components: {
    StrikeLink,
    ProfilePic
  },
  computed: {
    fighterComic: function() {
      var fighterEntry = this.fighter(this.fighterId)
      var roundIndex = fighterEntry.rounds.findIndex(r => r === this.round)
      return roundIndex >= 0 ? fighterEntry.link[roundIndex] : "na"
    },
    fighterIcon: function() {
      return `fighterimages/${this.fighterId}.png`
    },
    fighterBackupIcon: function() {
      if (this.faction === "pyre")
        return require("../../assets/pics/pyre-standin.png")
      return require("../../assets/pics/bastion-standin.png")
    },
    fighterName: function() {
      return this.fighter(this.fighterId).name
    },
    faction: function() {
      var fighterEntry = this.fighter(this.fighterId)
      var roundIndex = fighterEntry.rounds.findIndex(r => r === this.round)
      return roundIndex >= 0 ? fighterEntry.faction[roundIndex] : "na"
    },
    pictureShift: function() {
      return this.fighter(this.fighterId).profilePic
    },
    ...mapGetters({
      fighter: FIGHTER_GETTER
    })
  },
  methods: {
    altIcon(event) {
      event.target.src = this.fighterBackupIcon
    }
  },
  name: "GrandBattleListing"
}
</script>

<style scoped>
.onefighter {
  height: 5em;
  padding: 0.3em;
  width: 95%;
  border-bottom: brown solid;
}

.onefighter.duelist {
  height: fit-content;
  background-color: rgb(165, 62, 62);
  color: gold;
}

.details {
  display: flex;
  flex-direction: row;
}

.title {
  color: rgb(70, 30, 17);
  font-size: 2.6vw;
  font-family: "Permanent Marker", cursive;
  margin-left: 30%;
  margin-right: 60%;
}

.fightername {
  margin-top: auto;
  margin-bottom: auto;
  width: 50%;
  padding: 0.2em;
  text-align: center;
  font-size: 1.9vw;
}

img::before {
  content: "";
  display: block;
  height: 0.6em;
  width: 0.6em;
}

.fighterIcon {
  width: 4.7em;
  height: 4.7em;
  margin: 0.1em;
}
</style>
