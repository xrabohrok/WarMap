<template>
    <div class="details">
        <div class="row">
            <div class="blockText areaDescription">
                <p><b>Zone:</b> {{zoneName}}</p>
                {{zoneDesc}}
            </div>
        </div>
    </div>
</template>


<script>
import { mapGetters } from 'vuex'
import {CURRENT_ZONE_NAME, CURRENT_ZONE_DESC, SELECTING_GETTER} from '../../state/getters'


export default {
    computed:{
        zoneName: function(){
            return this.currZone(this.selected)
        },
        zoneDesc: function(){
            return this.currZoneDesc(this.selected)
        },
        ...mapGetters({
            currZone: CURRENT_ZONE_NAME,
            currZoneDesc: CURRENT_ZONE_DESC,
            selected: SELECTING_GETTER,
        })
    },
    name:"TileDetails"
}
</script>

<style scoped>

.areaDescription{
    white-space: pre-line;
}

.blockText{
    font-size: 1.3em;
    margin-bottom: .9em;
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
    font-size: 1.1em;


}
</style>