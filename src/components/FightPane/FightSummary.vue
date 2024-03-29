<template>
  <div class="fightSummary">
    <div
      class="fight"
      v-if="renderFight"
      :class="{
        bastionGradient: bastionAttacking,
        pyreGradient: !bastionAttacking
      }"
    >
      <div class="row">
        <h2 class="fightTitle">{{ fightTitle }}</h2>
      </div>

      <div class="positionCards">
        <div
          class="positionCard"
          :class="{
            victory: this.wasRevealed && attackerWin,
            defeat: this.wasRevealed && !attackerWin
          }"
        >
          <img
            src="../../assets/pics/sword.png"
            class="attackIcon"
            draggable="false"
          />
          <img
            src="../../assets/pics/splatter.png"
            class="bloodSplatter"
            draggable="false"
          />
          <h3 class="position">Attacker</h3>
          <h2 class="faction">
            {{ bastionAttacking ? "bastion" : "pyre" }}
          </h2>

          <div v-show="isDuel">
            <StrikeLink
              class="cell"
              :fighterId="
                this.zoneFight.fighters[
                  bastionAttacking ? 'bastion' : 'pyre'
                ][0]
              "
              :round="round"
              :inputURL="getComicLink(true)"
            />
          </div>
        </div>
        <h3 class="versus">vs</h3>
        <div
          class="positionCard"
          :class="{
            victory: this.wasRevealed && !attackerWin,
            defeat: this.wasRevealed && attackerWin
          }"
        >
          <img
            src="../../assets/pics/shield.png"
            class="defendIcon"
            draggable="false"
          />
          <img
            src="../../assets/pics/splatter.png"
            class="bloodSplatter"
            draggable="false"
          />
          <h3 class="position">Defender</h3>
          <h2 class="faction">
            {{ bastionAttacking ? "pyre" : "bastion" }}
          </h2>

          <div v-show="isDuel">
            <StrikeLink
              class="cell"
              :fighterId="
                this.zoneFight.fighters[
                  bastionAttacking ? 'pyre' : 'bastion'
                ][0]
              "
              :round="round"
              :inputURL="getComicLink(false)"
            />
          </div>
        </div>
      </div>
      <div class="resultTile">
        <Spoiler :fightOutcome="fightOutcome" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { linkLabel, cubariLink, showCubari } from "../../common/links"
import Spoiler from "./Spoiler.vue"
import StrikeLink from "../elements/StrikeLink.vue"
import {
  SELECTING_GETTER,
  CURRENT_ZONE_FIGHT,
  CUR_FIGHTER_LINK,
  CURRENT_ROUND,
  CURRENT_ZONE_NAME,
  CUR_SPOILER_REVEALED
} from "../../state/getters"

import { FIGHT } from "../DetailPane"

export default {
  props: {
    mode: Number
  },
  components: {
    Spoiler,
    StrikeLink
  },
  computed: {
    renderFight: function() {
      return this.mode === FIGHT && this.isSelecting
    },
    bastionAttacking: function() {
      if (!this.selected == "NA") return -1
      return this.zoneFight.attacker === "bastion"
    },
    attackerWin: function() {
      if (
        (this.bastionAttacking && this.zoneFight.outcome.bastion === "win") ||
        (!this.bastionAttacking && this.zoneFight.outcome.pyre === "win")
      ) {
        return true
      } else {
        return false
      }
    },
    isSelecting: function() {
      return this.selected !== "NA"
    },
    isDuel: function() {
      return this.zoneFight.contest
    },
    zoneName: function() {
      return this.currZone(this.selected)
    },
    fightTitle: function() {
      var fightType = ""
      if (this.zoneFight.contest && this.zoneFight.grandBattle) {
        return `Duel at ${this.zoneName}, but the Grand Battle at ${this.zoneFight.gbZone} reversed the outcome`
      } else if (this.zoneFight.contest) {
        fightType = "Duel at "
      } else if (this.zoneFight.grandBattle) {
        return `The Grand Battle at ${this.zoneFight.gbZone} took this tile at ${this.zoneName}`
      } else if (this.zoneFight.miniclash) {
        return `Double the fighters faced each other here.`
      } else if (this.zoneFight.clash) {
        fightType = "Clash at"
      }
      var name = this.zoneName

      return `${fightType} ${name}`
    },
    fightOutcome: function() {
      if (
        !(
          this.zoneFight.contest ||
          this.zoneFight.grandBattle ||
          this.zoneFight.miniclash ||
          this.zoneFight.clash
        )
      )
        return { message: "Not Available" }

      const message =
        this.zoneFight.outcome.bastion === "win"
          ? "Bastion Victory"
          : "Pyre Victory"

      return {
        message: message,
        note: this.zoneFight.note || ""
      }
    },
    ...mapGetters({
      currZone: CURRENT_ZONE_NAME,
      selected: SELECTING_GETTER,
      zoneFight: CURRENT_ZONE_FIGHT,
      comicLink: CUR_FIGHTER_LINK,
      round: CURRENT_ROUND,
      wasRevealed: CUR_SPOILER_REVEALED
    })
  },
  methods: {
    getComicLink: function(attacker) {
      var facs =
        (this.bastionAttacking && attacker) ||
        (!this.bastionAttacking && !attacker)
          ? "bastion"
          : "pyre"
      return this.comicLink(facs)
    },
    linkLabel: linkLabel,
    showCubari: showCubari,
    cubariLink: cubariLink
  },
  name: "FightSummary"
}
</script>

<style scoped>
.fight {
  margin-left: auto;
  height: 22vh;
  padding: 2% 6% 10%;
  margin-top: -10px;
  margin-right: -10px;
}

@media only screen and (max-width: 840px) {
  div.fight {
    height: auto;
    overflow-y: clip;
  }
}

.bastion {
  color: rgb(69, 123, 221);
  font-weight: bold;
}

.bastionGradient {
  background: linear-gradient(118deg, #5174a2 50%, #c07e85 50%);
}
.pyreGradient {
  background: linear-gradient(118deg, #c07e85 50%, #5174a2 50%);
}

.resultTile {
  position: relative;
  bottom: 5%;
  height: 30%;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}

.duelLinks {
  font-size: 1.4vw;
}

.pyre {
  color: rgb(226, 119, 76);
  font-weight: bold;
}

.blockText {
  font-size: 1.8em;
  margin-bottom: 0.9em;
}

.cell {
  justify-content: center;
  width: 100%;
  flex: 1;
}

.header {
  font-weight: bold;
}

.linkset_checkbox {
  margin-left: 0.9em;
  width: 1.5em;
}

.linkset {
  display: flex;
  flex-direction: row;
  flex-flow: nowrap;
  vertical-align: middle;
  margin-top: 1.2em;
}

.iconLink {
  width: 2em;
  position: relative;
  overflow: overlay;
  top: -50%;
  transform: translateY(40%);
  margin-left: 0.4em;
  fill: chartreuse;
}

.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  margin-top: 0.3em;
}

.combatant {
  width: 20%;
  min-width: 37vh;
  margin-bottom: 0.7em;
}

.positionCards {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 2.5vh;
}

.positionCard {
  background: #d3d3d363;
  padding: 0.1em 1em 0.6em;
  box-shadow: black 7px 7px 0px 0px;
  position: relative;
  width: 25%;
  overflow: hidden;
  transition: 0.6s;
  min-height: 2.5em;
}

.victory {
  background: #31ac61;
}

.bloodSplatter {
  visibility: hidden;
  position: absolute;
  width: 110%;
  right: -30%;
  bottom: -20%;
  filter: opacity(0.3);
}
.defeat .bloodSplatter {
  visibility: visible;
  animation: bloodSplatAnim 0.1s;
}
@keyframes bloodSplatAnim {
  0% {
    transform: skewX(-10deg) translateX(20px) translateY(20px);
    opacity: 0;
  }
  100% {
    transform: skewX(0deg) translateX(0px) translateY(0px);
    opacity: 1;
  }
}

.defeat {
  background: #5a5a5a;
}
.position {
  color: black;
  font-size: 0.7em;
  font-weight: bold;
  opacity: 0.1;
  text-transform: uppercase;
  position: absolute;
  left: 6%;
  margin-top: 5%;
}
.faction {
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 10%;
  margin-top: 27%;
  font-size: 1em;
  position: relative;
  left: 5%;
}
.attackIcon {
  position: absolute;
  width: 60%;
  top: 30%;
  right: -10%;
  filter: opacity(0.2);
}
.defendIcon {
  position: absolute;
  width: 60%;
  top: 30%;
  right: -10%;
  filter: opacity(0.2);
}
.fightTitle {
  color: white;
  margin-top: 2%;
  margin-bottom: 4%;
}
.versus {
  color: white;
  font-weight: bold;
  font-size: 2.5em;
  text-shadow: 6px 6px black;
  padding: 0 0.2vw;
  margin: 0;
}
</style>
