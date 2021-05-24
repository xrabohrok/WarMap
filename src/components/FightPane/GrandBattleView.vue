<template>
    <div class="grandbattle">
        <grand-battle-listing v-for="id in fighters" :key="id" :fighterId="id" :round="round" :hideLink="hideLinks" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GrandBattleListing from './GrandBattleListing'
import {MASSBATTLE_FIGHTERS, CURRENT_ROUND} from '../../state/getters'

export default {
    components:{
        GrandBattleListing
    },
    props:{
        faction: String,
        hideLinks: Boolean
    },
    computed:{
        fighters: function() {
            return this.gbfighters(this.faction)
        },
        ...mapGetters({
            gbfighters: MASSBATTLE_FIGHTERS,
            round: CURRENT_ROUND,
        })
    },
    name: 'GrandBattleView'
}
</script>

<style scoped>

    .grandbattle{
        height: 100%;
        width: 100%;
        overflow-y: auto;

    }
</style>