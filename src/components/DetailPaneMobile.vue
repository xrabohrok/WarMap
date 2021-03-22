<template>
    <div id=majorPaneMobile>
        <div class="row close"
            @click="closePane">
            click me to close
        </div>

        <div class="subContent">
            <div class="combatant bastion">
                <FighterDetails :fighterId="'bastion fighter'"/>
            </div>

            <div class="details">
                <div class="row">
                    <div class="blockText outcome">
                        Put the outcome text here. Mobile.
                    </div>
                </div>
                <div class="row" v-if="isSelecting">
                    <div class="blockText areaDescription">
                        <p><b>Zone:</b> {{zoneName}}</p>
                        {{zoneDesc}}
                    </div>
                </div>
            </div>    
            <div class="combatant pyre">
                <FighterDetails :fighterId="'pyre fighter'"/>
            </div>
        </div>
            
    </div>

</template>

<script>
import { mapGetters } from 'vuex'
import {CURRENT_ZONE_NAME, CURRENT_ZONE_DESC, SELECTING_GETTER} from '../state/getters'
import {DESELECT} from '../state/mutations'
import FighterDetails from './FightPane/FighterDetails.vue'

export default {
    components:{
        FighterDetails
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
        ...mapGetters({
            currZone: CURRENT_ZONE_NAME,
            currZoneDesc: CURRENT_ZONE_DESC,
            selected: SELECTING_GETTER
        })
    },
    methods:{
        closePane: function(){
            this.$store.commit(DESELECT)
            window.scrollTo({top: window.innerHeight *.2, behavior: 'smooth'})
        }      
    },

    name: 'DetailPaneMobile'
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

#majorPaneMobile{

    width: 100%;
    height: auto;
}

.areaDescription{
    white-space: pre-line;
}

.subContent{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    width:100%;
}

.row{
    display: flex;
    flex-direction: row;
    flex-flow: wrap;
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
    width: 80%;
}

.pyre{
    order: 2;
}

.details{
    margin-top: .4em;
    order: 3;
    min-width: 20vw;
    width: 100%;
}

.left{
    width: 50%;
}

@media all and (orientation: landscape) {
    #majorPaneMobile{
        visibility: hidden;
        display: none;
    }
}


</style>