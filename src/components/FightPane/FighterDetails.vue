<template>
    <div class="toplevel" :class="{leftward: leftward, rightward: rightward}" v-if="isSelected">
        <div class="deets">
            <div class="detail_row"> <h3> {{this.faction}} </h3> </div>
            <div class="detail_row"><b>Artist:</b> Artist Name</div>
            <div class="detail_row"><b>Artist Contact:</b> 
                <div class="sub_row"> <a href="www.twitter.com"> twitter </a></div>
                <div class="sub_row"> <a href="www.discord.com"> discord </a></div>
                <div class="sub_row"> <a href="www.imdb.com"> something else </a></div>
            </div>
            <div class="detail_row"><b>Backstory:</b> Fighter Name</div>
        </div>
        <div class="main_deets">
            <img :class="{right: rightward}"  :src="fighterIcon" @error="altIcon"  class="fighterIcon"/>
            <div class="detail_row"> <h2> {{this.fighterName}} </h2></div>
        </div>
    </div>

</template>

<script>
import { mapGetters } from 'vuex'
import {CURRENT_ZONE_FIGHT, SELECTING_GETTER, FIGHTER_GETTER, CURRENT_ZONE_CONTESTED} from '../../state/getters'


export default {
    props:{
        isLeft:Boolean,
        isRight:Boolean,
        faction:String
    },
    data: function(){
        return {

        }
    },
    methods:{
        altIcon(event){
            event.target.src = this.fighterBackupIcon
        }
    },
    computed:{
        leftward: function(){
            return this.isLeft
        },
        rightward: function(){
            return this.isRight
        },
        fighter: function(){
            if(!this.isSelected) return -1
            var zonefighters = this.zoneFight.fighters[this.faction]
            if(zonefighters.length === 0) return null
            return this.fighterGet( zonefighters[0] )
        },
        fighterName: function(){
            if(this.fighter === -1) return "unselected"
            return this.fighter.name
        },
        attackerDefender: function(){
            if(!this.isSelected) return ""
            return this.zoneFight.attacker == this.faction ? "Attacker" : "Defender"
        },
        isSelected: function(){
            return this.selected !== "na" && this.contested(this.selected)
        },
        fighterIcon: function(){
            return `fighterimages/${this.fighter.id}.png`
        },
        fighterBackupIcon: function(){
            if (this.faction === 'pyre') return require('../../assets/pics/pyre-standin.png') 
            return require('../../assets/pics/bastion-standin.png') 
        },
        ...mapGetters({
            zoneFight: CURRENT_ZONE_FIGHT,
            selected: SELECTING_GETTER,
            fighterGet: FIGHTER_GETTER,
            contested : CURRENT_ZONE_CONTESTED
        })
    },
    name: "FighterDetails"
}
</script>

<style scoped>

.fighterIcon {
    width: 12vh;
    height: 12vh;
    margin-right: 1em;
    margin-left: 1em;
}

.toplevel{
    display: flex;
    flex-direction: column;
    font-size: 1.2em;
    height: 100%;
}

.deets{
    width: 70%;
}

.main_deets{
    margin-bottom: 1.4em;
    margin-top: 1.2em;
}

h2{
    font-family: 'Saira', sans-serif;
    font-size: 1.7em;
    margin-top: .1em;
    margin-bottom: .1em;
}

img{
    width: 54%;
    height: auto;
    border-color: #9c031f;
    border-radius: .2em;
    border-style: solid;
}

img.right{
    transform: scaleX(-1);
}

.leftward{
    flex-direction: row;
}

.leftward > .deets{
    margin-left: 1.2em;
}

.rightward{
    flex-direction: row-reverse;
}

.rightward > .deets{
    margin-right: 1.2em;
}


@media all and (orientation: portrait) {
    .toplevel{
        height: auto;
    }
}

</style>