<template>
    <div class="linkContainer" >
        <div class="validLinks" v-show="isValidLink">
            <img src="../../assets/pics/strike.png" class="strikeImage"  v-show="checked" :style="wobbleStyle"/>
            <div class="aLink" v-for="entry in decomposedLinks" v-bind:key="entry.label">
                <a :href="entry.value" target="_blank" rel="noopener noreferrer" @click="markVisited">{{entry.label}}</a>
            </div>
            <img src="../../assets/pics/restart.svg" @click="unvisit">
        </div>
        <div class="nonSubmission" v-show="!isValidLink">
             No Submission
        </div>
    </div>
</template>

<script>


import {HAS_READ_COMIC} from '../../state/getters'
import {MARK_READ, MARK_UNREAD} from '../../state/mutations'
import {linkLabel, cubariLink, showCubari, isNotALink} from '../../common/links'


import { mapGetters } from 'vuex'

export default {
    props: {
        fighterId: Number,
        round: Number,
        inputURL: String,
    },
    data: function() {
        return {
            checked: false,
            wobbleX: 0,
            wobbleY: 0,
            wobbleR: 0,
        }
    },
    mounted: function(){
        this.checked = this.shouldBeChecked(this.fighterId, this.round)
        this.computeWobble()
    },
    methods: {
        markVisited: function(){
            this.checked = true
            this.$store.commit(MARK_READ, {fighterId:this.fighterId, round:this.round})
        },
        unvisit: function(){
            this.checked = false
            this.$store.commit(MARK_UNREAD, {fighterId:this.fighterId, round:this.round})
        },
        computeWobble: function(){
            this.wobbleX = Math.random() * 6 - 3
            this.wobbleY = Math.random() * 6 - 3
            this.wobbleR = Math.random() * 10 - 5
        },
        getDecomposedLinks: function(){
            var linkSet = {}
            var primaryLink = this.inputURL
            linkSet[linkLabel(primaryLink)] = primaryLink
            if(showCubari(primaryLink)) linkSet['Cubari'] = cubariLink(primaryLink)
            return linkSet
        },
        linkLabel:linkLabel,
        showCubari: showCubari,
        cubariLink: cubariLink,
        isNotLink: isNotALink,
    },
    computed:{
        decomposedLinks: function(){
            var labelLink = this.getDecomposedLinks()
            return Object.keys(labelLink).map(k => {return {label: k, value: labelLink[k]}})
        },
        wobbleStyle: function(){
            return {transform: `translate(${60 + this.wobbleX}%, ${this.wobbleY}%) rotate(${this.wobbleR}deg)`}
        },
        isValidLink: function(){
            return !this.isNotLink(this.inputURL)
        },
        ...mapGetters({
            shouldBeChecked: HAS_READ_COMIC
        })
    },
    watch: {
        fighterId: function(val){
            this.checked = this.shouldBeChecked(val, this.round)
            this.computeWobble()
        },
        round: function(val){
            this.checked = this.shouldBeChecked(this.fighterId, val)
            this.computeWobble()
        },
    },
    name:"StrikeLink"
}

</script>

<style scoped>

.nonSubmission{
    color:gray;
    margin-left: .3vw;
    margin-right: .3vw;
}

.strikeImage{
    position: absolute;
    width: 90%;
    height: 70%;
    left: -50%;
    transform: translateX(60%);
    opacity: .7;
    top: 20%;
    overflow: visible;

    pointer-events: none;
    -khtml-user-select: none;
    -o-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
}

.validLinks{
    display: flex;
    flex-direction: row;
    position: relative;
    width:fit-content;
    margin-left: auto;
    margin-right: auto;
}

.aLink{
    color:cyan;
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