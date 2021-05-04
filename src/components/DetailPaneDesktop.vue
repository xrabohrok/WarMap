<template>
    <div id=majorPaneDesktop :class="{left:renderOnLeft, right: renderOnRight, top: renderOnTop, fight: renderFight}" class="secondary">

        <FighterDetails :faction="faction" :isLeft="renderOnLeft" :isRight="renderOnRight" v-if="shouldShowFighter" />

        <GrandBattleView :faction="faction" v-if="renderGrandBattleList" />
        
        <ClashView :faction="faction" v-if="renderClashView" />

        <FightSummary :mode="mode" />

        <div class="details" v-if="renderDetails">
            <div class="row">
                <div class="blockText areaDescription">
                    <p><b>Zone:</b> {{zoneName}}</p>
                    {{zoneDesc}}
                </div>
            </div>
        </div>

    </div>

</template>

<script>
import { mapGetters } from 'vuex'
import {CURRENT_ZONE_NAME, CURRENT_ZONE_DESC, SELECTING_GETTER, CURRENT_ZONE_FIGHT, CURRENT_ROUND} from '../state/getters'
// import {DESELECT} from '../state/mutations'
import FighterDetails from './FightPane/FighterDetails.vue'
import GrandBattleView from './FightPane/GrandBattleView.vue'
import ClashView from './FightPane/ClashView.vue'
import FightSummary from './FightPane/FightSummary.vue'

const LEFT = 1, RIGHT = 2, DETAILS = 3, FIGHT = 4  //use with mode prop

export {LEFT, RIGHT, DETAILS, FIGHT}

export default {
    components:{
        FighterDetails,
        GrandBattleView,
        ClashView,
        FightSummary,
    },
    props:{
        mode: Number,
        faction: String
    },
    computed:{
        renderDetails: function(){
            return this.mode === DETAILS && this.isSelecting
        },
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
        renderFight: function(){
            return this.mode === FIGHT && this.isSelecting
        },
        renderOnTop: function(){
            return this.renderDetails || this.renderFight
        },

        ...mapGetters({
            currZone: CURRENT_ZONE_NAME,
            currZoneDesc: CURRENT_ZONE_DESC,
            selected: SELECTING_GETTER,
            zoneFight: CURRENT_ZONE_FIGHT,
            round: CURRENT_ROUND,
        })
    },

    name: 'DetailPaneDesktop'
}
</script>

<style scoped>

#majorPaneDesktop{

    width: 31%;
    height: 22vh;
    z-index: 120;
    padding-bottom: .4em;
    padding-left: .4em;
}

.fight{
    margin-top: .4em;
    margin-left: auto;
    margin-right: auto;

    font-size: 1.1em;
    overflow-y: auto;
    right: 0%;

}

.areaDescription{
    white-space: pre-line;
}

.left{
    position: absolute;
    left: 0%;
    bottom: -12vw;

}

.row{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items:flex-start;
    margin-top: .3em
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

.blockText{
    font-size: 1.8em;
    margin-bottom: .9em;
}

@media all and (orientation: portrait) {
    #majorPaneDesktop{
        visibility: hidden;
        display: none;
    }
}


</style>