<template>
    <div class="clashView">
        <div class="links">
            <a class="link" v-for="link in fighters" :key="link" :href="link">link</a>
        </div>
        <GrandBattleView :faction="faction"/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GrandBattleView from './GrandBattleView'
import {MASSBATTLE_FIGHTERS, CURRENT_ROUND, FIGHTER_GETTER} from '../../state/getters'

export default {
    props:{
        faction: String,
    },
    components:{
        GrandBattleView
    },
    computed:{
        fighters: function() {
            var links = []
            this.gbfighters(this.faction).forEach(f => {
                var curFighter = this.fighter(f)
                var index = curFighter.rounds.findIndex(fi => fi === this.round)
                var curLink = curFighter.link[index]
                if(!links.includes(curLink)) links.push(curLink)
            })
            return links
        },
        ...mapGetters({
            gbfighters: MASSBATTLE_FIGHTERS,
            round: CURRENT_ROUND,
            fighter: FIGHTER_GETTER,
        })
    },
    name:"ClashView"
}
</script>