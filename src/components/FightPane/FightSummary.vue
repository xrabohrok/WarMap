<template>
    <div class="fightSummary">
        <div class="fight" v-if="renderFight">
            <div class="row"><h2>{{fightTitle}}</h2></div>
            <div class="row header">
                <div class="cell">Attacker</div>
                <div class="cell">Defender</div>
            </div>
            <div class="row">
                <div class="title cell" :class="{bastion: bastionAttacking, pyre: !bastionAttacking}">
                    {{bastionAttacking ? "bastion" : "pyre"}}
                </div>
                <div class="title cell" :class="{bastion: !bastionAttacking, pyre: bastionAttacking}">
                    {{bastionAttacking ?  "pyre" : "bastion"}}
                </div>
            </div>
            <div class="row duelLinks" v-show="isDuel" >
                <StrikeLink class="cell" :fighterId="this.zoneFight.fighters[bastionAttacking ? 'bastion' : 'pyre'][0]" :round="round" :inputURL="getComicLink(true)"/>
                <StrikeLink class="cell" :fighterId="this.zoneFight.fighters[bastionAttacking ? 'pyre' : 'bastion'][0]" :round="round" :inputURL="getComicLink(false)"/>
            </div>
            <div class="row">
                <Spoiler :hiddenText="fightOutcome"/>
            </div>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'
import {linkLabel, cubariLink, showCubari} from '../../common/links'
import Spoiler from './Spoiler.vue'
import StrikeLink from '../elements/StrikeLink.vue'
import { SELECTING_GETTER, CURRENT_ZONE_FIGHT, CUR_FIGHTER_LINK, CURRENT_ROUND, CURRENT_ZONE_NAME} from '../../state/getters'

import {FIGHT} from '../DetailPaneDesktop'

export default {
    props:{
        mode:Number
    },
    components:{
        Spoiler,
        StrikeLink
    },
    computed:{
        renderFight: function(){
            return this.mode === FIGHT && this.isSelecting
        },
        bastionAttacking: function(){
            if(!this.selected == "NA") return -1
            return this.zoneFight.attacker === "bastion"
        },
        isSelecting: function(){
            return this.selected !== "NA"
        },
        isDuel: function(){
            return this.zoneFight.contest
        },
        zoneName: function(){
            return this.currZone(this.selected)
        },
        fightTitle: function(){
            var fightType = ""
            if(this.zoneFight.contest && this.zoneFight.grandBattle){
                return `Duel at ${this.zoneName}, but the Grand Battle at ${this.zoneFight.gbZone} reversed the outcome`
            }
            else if(this.zoneFight.contest){
                fightType = "Duel at "
            }
            else if(this.zoneFight.grandBattle){
                return `Grand Battle at ${this.zoneFight.gbZone} took this area at ${this.zoneName}`
            }
            else if(this.zoneFight.clash){
                fightType = "Clash at"
            }
            var name = this.zoneName

            return `${fightType} ${name}`
        },
        fightOutcome: function(){
            if(!(this.zoneFight.contest || this.zoneFight.grandBattle)) return "Not Available"
            return `Bastion: ${this.zoneFight.outcome.bastion} , Pyre: ${this.zoneFight.outcome.pyre} \r\n ${'note' in this.zoneFight ? this.zoneFight.note : ''}`
        },
        ...mapGetters({
            currZone: CURRENT_ZONE_NAME,    
            selected: SELECTING_GETTER,
            zoneFight: CURRENT_ZONE_FIGHT,
            comicLink: CUR_FIGHTER_LINK,
            round: CURRENT_ROUND,
        })
    },
    methods:{
   
        getComicLink: function(attacker){
            var facs = (this.bastionAttacking && attacker) || (!this.bastionAttacking && !attacker) ? "bastion" : "pyre"
            return this.comicLink(facs)
        },
        linkLabel:linkLabel,
        showCubari: showCubari,
        cubariLink: cubariLink,

    },
    name:"FightSummary"
}
</script>

<style scoped>

.fight{
    margin-top: .4em;
    margin-left: auto;
    margin-right: auto;
    order: 2;
    min-width: 20vw;
    width: 80%;
    height: 20vh;
    font-size: 1.1em;
    overflow-y: auto;
    right: 0%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}
.bastion{
    color: rgb(69, 123, 221);
    font-weight: bold;
}

.duelLinks{
    font-size: 1.4vw;
}

.pyre{
    color: rgb(226, 119, 76);
    font-weight: bold;
}

.blockText{
    font-size: 1.8em;
    margin-bottom: .9em;
}

.cell{
    justify-content: center;
    width: 100%;
    flex: 1
}

.header{
    font-weight: bold;
}

.linkset_checkbox{
    margin-left: .9em;
    width: 1.5em;
}

.linkset{
    display: flex;
    flex-direction: row;
    flex-flow: nowrap;
    vertical-align: middle;
    margin-top: 1.2em;
}

.iconLink{
    width: 2em;
    position: relative;
    overflow: overlay;
    top: -50%;
    transform: translateY(40%);
    margin-left: .4em;
    fill:chartreuse;
}

.row{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items:flex-start;
    margin-top: .3em
}

.combatant{
    width:20%;
    min-width: 37vh;
    margin-bottom: .7em;

}

</style>