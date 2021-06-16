<template>
    <div class="details">
        <div class="row">
            <div class="blockText areaDescription">   
                <p>
                    <h2 class="zoneTitle">
                    {{zoneName}}
                    </h2>
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
    margin-bottom: .9em;
}

.zoneTitle{
    font-family: 'Permanent Marker', cursive;
}


.details {
    margin-top: .3vh;
    margin-left: auto;
    margin-right: auto;
    order: 2;
    min-width: 20vw;
    width: 98%;
    height: 100%;
    overflow-y: auto;
    left: 0%;
}
</style>