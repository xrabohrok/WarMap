<template>
    <div class="toplevel" :class="{leftward: leftward, rightward: rightward}" v-if="isSelected">
        <div class="deets">
            <div class="detail_row"> <h3> {{this.faction.toUpperCase()}} </h3> </div>
            <div class="allArtists" v-for="artist in Object.values(this.fighter.artists)" :key="artist.name">
                <div class="detail_row"><b>{{artist.role}}:</b> {{artist.name}}</div>
                <div class="detail_row" v-show="Object.keys(artist.contacts).length > 0"><b>Contacts:</b></div>
                <div class="detail_row" v-for="contact in Object.keys(artist.contacts)" :key="contact">               
                    <div class="sub_row"> <a :href="buildLink(contact, artist.contacts[contact])" target="_blank" rel="noopener noreferrer"> {{contact}} </a></div>
                </div>
            </div>
            <div class="detail_row backstory"><b>Backstory:</b> {{backstory(fighter.id)}}</div>
        </div>
        <div class="main_deets">
            <ProfilePic :class="{right: rightward}"  :imgUrl="fighterIcon" :faction="faction" :startPos="fighter.profilePic" class="fighterIcon"/>
            <div class="detail_row fighterName"> <h2> {{this.fighterName}} </h2></div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {CURRENT_ZONE_FIGHT, SELECTING_GETTER, FIGHTER_GETTER, CURRENT_ZONE_CONTESTED, FIGHTER_BACKSTORY} from '../../state/getters'
import {buildTwitterLink, buildInstagramLink} from '../../common/links'
import ProfilePic from '../elements/ProfilePic.vue'

export default {
    props:{
        isLeft:Boolean,
        isRight:Boolean,
        faction:String
    },
    components:{
        ProfilePic
    },
    data: function(){
        return {

        }
    },
    methods:{
        altIcon(event){
            event.target.src = this.fighterBackupIcon
        },
        buildLink(key, value){
            if(key.toLowerCase() === "twitter") return buildTwitterLink(value)
            if(key.toLowerCase() === "instagram") return buildInstagramLink(value)
            return value
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
            contested : CURRENT_ZONE_CONTESTED,
            backstory: FIGHTER_BACKSTORY,
        })
    },
    name: "FighterDetails"
}
</script>

<style scoped>

.fighterIcon {
    width: 12vh;
    height: 12vh;
    margin-right: auto;
    margin-left: auto;
    border-style: solid;
    border-width: .3em;
    border-radius: .3em;
    padding: 0;
}

.toplevel{
    display: flex;
    flex-direction: column;
    font-size: 1.2em;
    height: 100%;

}

.backstory{
    white-space: pre-wrap;
    text-align: left;
    margin-top: .7vh;
    padding-left: .4vw;
    padding-bottom: .4vh;
    margin-bottom: .3vh;
}

.fighterName{
    width:90%;
    margin: 0 auto 0 auto ;
}

.deets{
    width: 70%;
    overflow-y: auto;
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
    padding: 0;
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