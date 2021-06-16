<template>
    <div class="clashView">
        <div class="links">
            <div class=linkrow  v-for="link in fighters" :key="link">
                <StrikeLink class="link" :fighterId="gbfighters(faction)[0]" :round="round" :inputURL="fighters[0]" />
            </div>
        </div>
        <GrandBattleView :faction="faction" class="fighterList" :hideLinks="true"/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GrandBattleView from './GrandBattleView'
import {MASSBATTLE_FIGHTERS, CURRENT_ROUND, FIGHTER_GETTER} from '../../state/getters'

import StrikeLink from '../elements/StrikeLink.vue'


export default {
    props:{
        faction: String,
    },
    components:{
        GrandBattleView,
        StrikeLink
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

<style scoped>

.link {
    color: yellow;
    vertical-align: middle;
}

.links {
    margin-left: auto;
    margin-right: auto;
}

a.linkrow:visited{
    color: rgb(185, 185, 19);
}

a.linkrow:hover{
    color: rgb(126, 98, 23)
}

.fighterList{
    overflow-y: auto;
    height: 17vh;
}

@media only screen and (max-width: 840px) {
    .fighterList{
        height: auto;
        overflow-y: auto;
    }
}

.iconLink{
    width: 1.8em;
    position: relative;
    overflow: overlay;
    top: -50%;
    margin-left: .4em;
    fill:chartreuse;
}
</style>