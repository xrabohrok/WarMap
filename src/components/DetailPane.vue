<template>
    <div id=majorPane>
        <div class="row close">
            click me to close
        </div>

        <div class="subContent">
            <div class="combatant bastion">
                <FighterDetails :fighterId="'bastion fighter'"/>
            </div>

            <div class="details">
                <div class="row">
                    <div class="blockText outcome">
                        Put the outcome text here.
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

    name: 'DetailPane'
}
</script>

<style scoped>
.close{
    width:100%;
    order:0;
    font-size: 1.5;
}

.blockText{
    font-size: 1.8em;
    margin-bottom: .9em;
}

#majorPane{

    width: 100%;
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
    order: 2;
    min-width: 20vw;
    width: 40%;
}

@media all and (orientation: portrait) {
    .subContent{
        flex-flow:wrap; 
        height: 100px;
    }
    .details {
        width: 100%;
        order: 3;
    }

    .pyre{
        width: 80%;
        order: 2;
    }

    .bastion{
        order: 1;
        width: 80%;
    }

    .left{
        width: 50%;
    }
}


</style>