<template>
    <div id=majorPaneDesktop :class="{left:renderOnLeft, right: renderOnRight, top: renderOnTop, fight: renderFight}" class="secondary">

        <FighterDetails :faction="faction" :isLeft="renderOnLeft" :isRight="renderOnRight" v-if="shouldShowFighter" />

        <GrandBattleView :faction="faction" v-if="renderGrandBattleList" />
        
        <ClashView :faction="faction" v-if="renderClashView" />

        <div class="details" v-if="renderDetails">
            <div class="row">
                <div class="blockText areaDescription">
                    <p><b>Zone:</b> {{zoneName}}</p>
                    {{zoneDesc}}
                </div>
            </div>
        </div>

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
            <div class="row">
                <div class="cell linkset"> 
                    <a :href="comicLink(bastionAttacking ? 'bastion' : 'pyre')" target="_blank" rel="noopener noreferrer">{{linkLabel(getComicLink(true))}}</a>
                    <span v-show="showCubari(getComicLink(true))">
                        <a :href="cubariLink(getComicLink(true))" target="_blank" rel="noopener noreferrer">
                            <img src="../assets/pics/cubari.svg" class="iconLink">
                        </a>
                    </span>
                    <ReadMarker :fighterId="this.zoneFight.fighters[bastionAttacking ? 'bastion' : 'pyre'][0]" :round="round" class="linkset_checkbox"/>
                </div>
                <div class="cell linkset"> 
                    <a :href="comicLink(bastionAttacking ? 'pyre' : 'bastion')" target="_blank" rel="noopener noreferrer">{{linkLabel(getComicLink(false))}}</a>
                    <span v-show="showCubari(getComicLink(false))">
                        <a :href="cubariLink(getComicLink(false))" target="_blank" rel="noopener noreferrer">
                            <img src="../assets/pics/cubari.svg" class="iconLink">
                        </a>
                    </span>
                    <ReadMarker :fighterId="this.zoneFight.fighters[bastionAttacking ? 'pyre' : 'bastion'][0]" :round="round" class="linkset_checkbox" />
                </div>
            </div>
            <div class="row">
                <Spoiler :hiddenText="fightOutcome"/>
            </div>
        </div>



    </div>

</template>

<script>
import { mapGetters } from 'vuex'
import {CURRENT_ZONE_NAME, CURRENT_ZONE_DESC, SELECTING_GETTER, CURRENT_ZONE_FIGHT, CUR_FIGHTER_LINK, CURRENT_ROUND} from '../state/getters'
// import {DESELECT} from '../state/mutations'
import FighterDetails from './FightPane/FighterDetails.vue'
import Spoiler from './FightPane/Spoiler.vue'
import GrandBattleView from './FightPane/GrandBattleView.vue'
import ClashView from './FightPane/ClashView.vue'
import ReadMarker from './FightPane/ReadMarker.vue'
import {linkLabel, cubariLink, showCubari} from '../common/links'

const LEFT = 1, RIGHT = 2, DETAILS = 3, FIGHT = 4  //use with mode prop

export {LEFT, RIGHT, DETAILS, FIGHT}

export default {
    components:{
        FighterDetails,
        Spoiler,
        GrandBattleView,
        ClashView,
        ReadMarker,
    },
    props:{
        mode: Number,
        faction: String
    },
    computed:{
        isSelecting: function(){
            return this.selected !== "NA"
        },
        zoneName: function(){
            return this.currZone(this.selected)
        },
        zoneDesc: function(){
            return this.currZoneDesc(this.selected)
        },
        renderGrandBattleList: function(){
            return (this.mode === LEFT || this.mode === RIGHT) && this.zoneFight.grandBattle
        },
        renderClashView: function(){
            return (this.mode === LEFT || this.mode === RIGHT) && this.zoneFight.clash
        },
        shouldShowFighter: function(){
            return (this.mode === LEFT || this.mode === RIGHT) && !this.zoneFight.grandBattle && !this.zoneFight.clash
        },
        renderOnLeft: function(){
            return this.mode === LEFT
        },
        renderOnRight: function(){
            return this.mode === RIGHT
        },
        renderDetails: function(){
            return this.mode === DETAILS && this.isSelecting
        },
        renderFight: function(){
            return this.mode === FIGHT && this.isSelecting
        },
        renderOnTop: function(){
            return this.renderDetails || this.renderFight
        },
        bastionAttacking: function(){
            if(!this.selected == "NA") return -1
            return this.zoneFight.attacker === "bastion"
        },
        fightTitle: function(){
            var fightType = ""
            if(this.zoneFight.contest){
                fightType = "Duel at "
            }
            else if(this.zoneFight.grandBattle){
                fightType = "Grand Battle for"
            }
            else if(this.zoneFight.clash){
                fightType = "Clash at"
            }
            var name = this.zoneName

            return `${fightType} ${name}`
        },
        fightOutcome: function(){
            if(!(this.zoneFight.contest || this.zoneFight.grandBattle)) return "Not Available"
            return `Bastion: ${this.zoneFight.outcome.bastion} , Pyre: ${this.zoneFight.outcome.pyre} \n ${'note' in this.zoneFight ? this.zoneFight.note : ''}`
        },

        ...mapGetters({
            currZone: CURRENT_ZONE_NAME,
            currZoneDesc: CURRENT_ZONE_DESC,
            selected: SELECTING_GETTER,
            zoneFight: CURRENT_ZONE_FIGHT,
            comicLink: CUR_FIGHTER_LINK,
            round: CURRENT_ROUND,
        })
    },
    methods:{
        // closePane: function(){
        //     this.$store.commit(DESELECT)
        //     window.scrollTo({top: window.innerHeight *.2, behavior: 'smooth'})
        // }    
        getComicLink: function(attacker){
            var facs = (this.bastionAttacking && attacker) ? "bastion" : "pyre"
            return this.comicLink(facs)
        },
        linkLabel:linkLabel,
        showCubari: showCubari,
        cubariLink: cubariLink,
    },

    name: 'DetailPaneDesktop'
}
</script>

<style scoped>

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

.close{
    width:14%;
    order:0;
    font-size: 1.5em;
    padding: .7em;
    border-style: solid;
    border-width: .08em;
    margin-left: auto;
    margin-right: auto;
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

#majorPaneDesktop{

    width: 31%;
    height: 22vh;
    z-index: 120;
    padding-bottom: .4em;
    padding-left: .4em;
}

.areaDescription{
    white-space: pre-line;
}

.left{
    position: absolute;
    left: 0%;
    bottom: -12vw;

}

.right{
    position: absolute;
    right: 0%;
    bottom: -12vw;

}

.top{
    position: absolute;
    top: 20vh;
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

.bastion{
    color: rgb(69, 123, 221);
    font-weight: bold;
}

.pyre{
    color: rgb(226, 119, 76);
    font-weight: bold;
}

.details{
    margin-top: .4em;
    margin-left: auto;
    margin-right: auto;
    order: 2;
    min-width: 20vw;
    width: 90%;
    height: 20vh;
    font-size: .6em;
    overflow-y: auto;
    left: 0%;

}

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

@media all and (orientation: portrait) {
    #majorPaneDesktop{
        visibility: hidden;
        display: none;
    }
}


</style>