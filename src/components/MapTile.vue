<template>
    <div class="mapTile" :style="tileWidth"
        @mouseenter="mousedOver()"
        @mouseup="selectingClick()"
        >
        <transition name="stab">
            <img src="../assets/pics/chooser-knife.png"
                v-if="isSelected" class="selector"
            >
        </transition>
        <transition name="fall">
            <img :src="mapTilePath" v-if="!simple_mode"
                v-bind:class="{pyreOwned: pyreOwned, unOwned: unowned}" :style="fallTimeStyle">
        </transition>
        <transition name="fall">
            <img src="../assets/pics/simple_tile/simple_tile.png" v-if="simple_mode"
                v-bind:class="{pyreOwned: pyreOwned, unOwned: unowned}" class="simple" :style="fallTimeStyle">
        </transition>
        <transition name="fade">
            <div class="label" v-if="isHovered">
                {{title}}
            </div>
        </transition>
    </div>
</template>

<script>

import {mapGetters} from 'vuex'
import {NEW_HOVERED, NEW_SELECTED} from '../state/mutations'
import {HOVERING_GETTER, TILE_OWNER, SELECTING_GETTER, SIMPLE_MODE} from '../state/getters'

export default {
    name: 'MapTile',
    data(){
        return{
            publicPath: process.env.BASE_URL
        }
    },
    computed:{
        tileWidth: function(){
            return{
                "width": `${(100/14)}%`,
                // "height": `${(100/28)}%`
            }
        },
        isHovered: function(){
            return this.hoveredTile === this.title
        },
        bastionOwned: function(){
            return this.tileOwner(this.title) === "BASTION"
        },
        pyreOwned: function(){
            return this.tileOwner(this.title) === "PYRE"
        },
        unowned: function(){
            let owner = this.tileOwner(this.title);
            return !(owner === "PYRE" || owner === "BASTION")
        },
        mapTilePath: function(){
            // return `${this.title}.png`
            return `tileimages/${this.title}.png`
        },
        isSelected: function(){
            return this.selected == this.title;
        },
        fallTimeStyle: function(){
            return {
                '--fall-time': `${(Math.random() + .1) *1.1}s`
            }
        },
        ...mapGetters({
            hoveredTile: HOVERING_GETTER,
            tileOwner: TILE_OWNER,
            selected: SELECTING_GETTER,
            simple_mode: SIMPLE_MODE,
        })

    },
    props: {
        title: String
    },
    methods: {
        mousedOver(){
            this.$store.commit(NEW_HOVERED, this.title)
        },
        selectingClick(){
            this.$store.commit(NEW_SELECTED, this.title)
        }
    }
}

</script>

<style scoped>

.selector{
    height: 9em;
    width: auto;
    z-index: 97;
    left: 50%;
    transform: translate(-50%, -80%);
}

.mapTile{
    color: black;
    padding: 0;
    text-align: center;
    position: relative;
    height: 80%;
    transition: transform 400ms;
    overflow: visible;


}

.mapTile:hover{
    transform: translateY(-.4em);
}

img{
    width: 100%;
    height: auto;
    pointer-events: none;
    transform: translateY(-40%);
    position:absolute;
    left: 0%;
    top: 0%;
}

/* .bastionOwned{
} */

.pyreOwned{
    filter: hue-rotate(129deg);
}

.unOwned{
    filter: grayscale();
}

.simple.unOwned{
    filter: grayscale() brightness(1.8)
}

.label{
    position: absolute;
    top: -80%;
    left: 50%;
    transform: translate(-50%, -20%);
    font-size: .9em;
    width: 70%;
    z-index: 99;
    /* opacity: 1; */

    background-color: whitesmoke;
    border: solid black;
    border-width: .02em;
    padding: .2em .65em .2em .65em;
    border-radius: .8em;

}

.stab-enter-active, .stab-leave-active {
  transition: all .3s ease-in;
}
.stab-enter /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translate(-50%, -300%);
  /* top: 500%; */

}
.stab-leave-to{
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: all .5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translate(-50%, -200%);
  top: -200%;
  background-color: purple;
  color: white;
}

.fall-enter-active, .fall-leave-active {
  transition: all var(--fall-time) ease-out;
  position:absolute;
}
.fall-enter /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translatey(-20vh);
  /* top: 500%; */

}
.fall-leave-to{
  opacity: 0;
  transform: translatey(20vh);
}

</style>