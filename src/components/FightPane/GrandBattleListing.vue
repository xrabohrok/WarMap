<template>
<div class="onefighter">
    <div class="imghere">
        <img :src="fighterIcon" @error="altIcon"  class="fighterIcon"/>
    </div>
    <div class="fightername">
        {{fighterName}}
    </div>
    <div class="fightername" v-show="!hideLink">
        <StrikeLink class="linkStyle" :fighterId="fighterId" :round="round" :labelLink="getDecomposedLinks()"/>
    </div>
    
</div>
    
</template>

<script>
import {mapGetters} from 'vuex'
import {FIGHTER_GETTER} from '../../state/getters'
import {linkLabel, cubariLink, showCubari} from '../../common/links'


import StrikeLink from './StrikeLink.vue'


export default {
    props:{
        fighterId: Number,
        round: Number,
        hideLink: Boolean,
    },
    components:{
        StrikeLink
    },
    computed:{
        fighterComic: function(){
            var fighterEntry =this.fighter(this.fighterId)
            var roundIndex = fighterEntry.rounds.findIndex(r => r === this.round)
            return roundIndex >= 0 ? fighterEntry.link[roundIndex] : "na"
        },
        fighterIcon: function(){
            return `fighterimages/${this.fighterId}.png`
        },
        fighterBackupIcon: function(){
            if (this.faction === 'pyre') return require('../../assets/pics/pyre-standin.png') 
            return require('../../assets/pics/bastion-standin.png') 
        },
        fighterName: function(){
            return this.fighter(this.fighterId).name
        },
        faction: function(){
            var fighterEntry =this.fighter(this.fighterId)
            var roundIndex = fighterEntry.rounds.findIndex(r => r === this.round)
            return roundIndex >= 0 ? fighterEntry.faction[roundIndex] : "na"
        },
        ...mapGetters({
            fighter: FIGHTER_GETTER,
        })
    },
    methods:{
        altIcon(event){
            event.target.src = this.fighterBackupIcon
        },
        getDecomposedLinks: function(){
            var linkSet = {}
            var primaryLink = this.fighterComic
            linkSet[linkLabel(primaryLink)] = primaryLink
            if(showCubari(primaryLink)) linkSet['Cubari'] = cubariLink(primaryLink)
            return linkSet
        },
        linkLabel:linkLabel,
        showCubari: showCubari,
        cubariLink: cubariLink,
    },
    name: "GrandBattleListing"
}
</script>

<style scoped>
.onefighter{
    display: flex;
    flex-direction: row;
    height: 5em;
    padding: .3em;
    width: 95%;
    border-bottom: brown solid;
}

.fightername{
    margin-top: auto;
    margin-bottom: auto;
    width: 50%;
    padding: .2em;
    text-align: center;
    font-size: 1.7em;
}

img::before{
    content:'';
    display: block;
    height: .6em;
    width: .6em;
}

.fighterIcon{
    width: 4.7em;
    height: 4.7em;
    margin: .1em;
}

.linkStyle{
    font-size: 1.5vw;
}

</style>