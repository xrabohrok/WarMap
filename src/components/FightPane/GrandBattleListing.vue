<template>
<div class="onefighter">
    <div class="imghere"></div>
    <div class="fightername">
        {{fighterName}}
    </div>
    
</div>
    
</template>

<script>
import {mapGetters} from 'vuex'
import {FIGHTER_GETTER} from '../../state/getters'

export default {
    props:{
        fighterId: Number,
        round: Number
    },
    computed:{
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
    name: "GrandBattleListing"
}
</script>

<style scoped>
.onefighter{
    display: flex;
    flex-direction: row;
    height: 1em;
    padding: .5em;
    width: 100%;
}

img::before{
    content:'';
    display: block;
    height: .6em;
    width: .6em;

}

</style>