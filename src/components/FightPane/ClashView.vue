<template>
    <div class="clashView">
        <div class="links">
            <div class=linkrow  v-for="link in fighters" :key="link">
                <a class="link" :href="link">{{linkLabel(link)}}</a>
                <a class="link" v-if="showCubari(link)" :href="cubariLink(link)">
                    <img src="../../assets/pics/cubari.svg" class="iconLink"/>
                </a>
            </div>
        </div>
        <GrandBattleView :faction="faction" class="fighterList"/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GrandBattleView from './GrandBattleView'
import {MASSBATTLE_FIGHTERS, CURRENT_ROUND, FIGHTER_GETTER} from '../../state/getters'
import {linkLabel, cubariLink, showCubari} from '../../common/links'


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
    methods:{
        linkLabel: linkLabel,
        cubariLink: cubariLink,
        showCubari: showCubari,
    },
    name:"ClashView"
}
</script>

<style scoped>

.link {
    color: yellow;
    font-size: 2.7em;
    vertical-align: middle;
}

a:visited{
    color: rgb(185, 185, 19);
}

a:hover{
    color: rgb(126, 98, 23)
}

.fighterList{
    overflow-y: auto;
    height: 17vh;
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