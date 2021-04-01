<template>
    <div class="spoiler" @click="whenClicked">
        <div class="spoilerTitle" v-if="!wasRevealed">Click To Reveal Results</div>
        <div class="spoilerText" v-show="wasRevealed">{{this.hiddenText}} </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {CUR_SPOILER_REVEALED} from '../../state/getters.js'
import {REVEAL_SPOILER} from '../../state/mutations.js'

export default {
    name:"Spoiler",
    props:{
        hiddenText:String
    },
    data(){
        return {
            // isRevealed: false
        } 
    },
    methods:{
        whenClicked(){
            this.$store.commit(REVEAL_SPOILER)
        }
    },
    computed:{
        ...mapGetters({
            wasRevealed: CUR_SPOILER_REVEALED
        })
    }
}
</script>

<style scoped>
.spoiler{
    margin-left: auto;
    margin-right:auto;
    margin-top: .6em;
    color: white;
    margin-bottom: .7em;
    background-color: rgb(119, 9, 70);
    width: 90%;
    padding-top: .4em;
    padding-bottom: .5em;

}

</style>