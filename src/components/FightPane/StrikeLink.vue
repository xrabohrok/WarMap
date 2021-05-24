<template>
    <div class="linkContainer" >
        <img src="../../assets/pics/strike.png" class="strikeImage"  v-show="checked"/>
        <div class="aLink" v-for="entry in decomposedLinks" v-bind:key="entry.label">
            <a :href="entry.value" target="_blank" rel="noopener noreferrer" @click="markVisited">{{entry.label}}</a>
        </div>
        <img src="../../assets/pics/restart.svg" @click="unvisit">
    </div>
</template>

<script>


import {HAS_READ_COMIC} from '../../state/getters'
import {MARK_READ, MARK_UNREAD} from '../../state/mutations'

import { mapGetters } from 'vuex'

export default {
    props: {
        fighterId: Number,
        round: Number,
        //needs to be V-bound
        labelLink: Object
    },
    data: function() {
        return {
            checked: false
        }
    },
    mounted: function(){
        this.checked = this.shouldBeChecked(this.fighterId, this.round)
    },
    methods: {
        markVisited: function(){
            this.checked = true
            this.$store.commit(MARK_READ, {fighterId:this.fighterId, round:this.round})
        },
        unvisit: function(){
            this.checked = false
            this.$store.commit(MARK_UNREAD, {fighterId:this.fighterId, round:this.round})
        }
    },
    computed:{
        decomposedLinks: function(){
            return Object.keys(this.labelLink).map(k => {return {label: k, value: this.labelLink[k]}})
        },
        ...mapGetters({
            shouldBeChecked: HAS_READ_COMIC
        })
    },
    watch: {
        fighterId: function(val){
            this.checked = this.shouldBeChecked(val, this.round)
        },
        round: function(val){
            this.checked = this.shouldBeChecked(this.fighterId, val)
        },
    },
    name:"StrikeLink"
}

</script>

<style scoped>

.strikeImage{
    position: absolute;
    width: 90%;
    height: 70%;
    left: -50%;
    transform: translateX(60%);
    opacity: 72%;
    top: 20%;

    pointer-events: none;
    -khtml-user-select: none;
    -o-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
}

.linkContainer{
    display: flex;
    flex-direction: row;
    position: relative;
}

.aLink{
    color:cyan;
    font-size: 1.1vw;
    margin-left: .3vw;
    margin-right: .3vw;
}

a:link{
    color:cyan;
    text-decoration: none;
}

a:visited{
    color:rgb(0, 117, 196);
    text-decoration: none;
}

a:hover{
    color:rgb(0, 219, 219);
    text-decoration: underline;
}

a:active{
    color:rgb(0, 193, 241);
}
</style>