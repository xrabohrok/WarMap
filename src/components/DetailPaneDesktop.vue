<template>
    <div id=majorPaneDesktop :class="{left:renderOnLeft, right: renderOnRight, top: renderOnTop, fight: renderFight}" class="secondary">

        <FighterDetails :fighterId="'bastion fighter'" :isLeft="renderOnLeft" :isRight="renderOnRight" v-if="shouldShowFighter" />

        <div class="details" v-if="renderDetails">

            <div class="row">
                <div class="blockText areaDescription">
                    <p><b>Zone:</b> {{zoneName}}</p>
                    {{zoneDesc}}
                </div>
            </div>
        </div>

        <div class="fight" v-if="renderFight">
            <div class="row">Fight</div>
            <div class="row">
                <div class="bastion title">
                    Attacker: name
                </div>
                <div class="pyre title">
                    Defender: name
                </div>
            </div>
            <div class="row">
                <div>comic link A</div>
                <div>comic link B</div>
            </div>
            <div class="row">
                <div class="outcome">
                    Put the outcome text here. Desktop.
                </div>
            </div>
        </div>

    </div>

</template>

<script>
import { mapGetters } from 'vuex'
import {CURRENT_ZONE_NAME, CURRENT_ZONE_DESC, SELECTING_GETTER} from '../state/getters'
// import {DESELECT} from '../state/mutations'
import FighterDetails from './FightPane/FighterDetails.vue'
const LEFT = 1, RIGHT = 2, DETAILS = 3, FIGHT = 4  //use with mode prop

export {LEFT, RIGHT, DETAILS, FIGHT}

export default {
    components:{
        FighterDetails
    },
    props:{
        mode: Number  
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
        shouldShowFighter: function(){
            return this.mode === LEFT || this.mode === RIGHT
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
        ...mapGetters({
            currZone: CURRENT_ZONE_NAME,
            currZoneDesc: CURRENT_ZONE_DESC,
            selected: SELECTING_GETTER
        })
    },
    methods:{
        // closePane: function(){
        //     this.$store.commit(DESELECT)
        //     window.scrollTo({top: window.innerHeight *.2, behavior: 'smooth'})
        // }      
    },

    name: 'DetailPaneDesktop'
}
</script>

<style scoped>
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

#majorPaneDesktop{

    width: 31%;
    height: 20vh;
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
    bottom: -5vh;

}

.right{
    position: absolute;
    right: 0%;
    bottom: -5vh;

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
}

.combatant{
    width:20%;
    min-width: 37vh;
    margin-bottom: .7em;

}

.bastion{
    order: 1;
}

.pyre{
    order: 3;
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
    width: 60%;
    height: 20vh;
    font-size: 1.1em;
    overflow-y: auto;
    right: 0%;
}

@media all and (orientation: portrait) {
    #majorPaneDesktop{
        visibility: hidden;
        display: none;
    }
}


</style>