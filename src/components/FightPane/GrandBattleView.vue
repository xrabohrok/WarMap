<template>
    <div class="grandbattle">
        <grand-battle-listing v-for="id in fighterDebug" :key="id" :fighterId="id" :round="round" :faction="faction" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GrandBattleListing from './GrandBattleListing'
import {GRANDBATTLE_FIGHTERS, CURRENT_ROUND} from '../../state/getters'

export default {
    components:{
        GrandBattleListing
    },
    props:{
        faction: String,
    },
    computed:{
        fighterDebug: function() {
            return this.fighters(this.faction)
        },
        ...mapGetters({
            fighters: GRANDBATTLE_FIGHTERS,
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
    }
</style>