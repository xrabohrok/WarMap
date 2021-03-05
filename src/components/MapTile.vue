<template>
    <div class="mapTile" :style="tileWidth"
        @mouseenter="mousedOver()"
        >
        <img :src="mapTilePath"
            v-bind:class="{pyreOwned: pyreOwned, unOwned: unowned}">
        <transition name="fade">
            <div class="label" v-if="isHovered">
                {{title}}
            </div>
        </transition>
    </div>
</template>

<script>

import {mapGetters} from 'vuex'
import {NEW_HOVERED} from '../state/mutations'
import {HOVERING_GETTER, TILE_OWNER} from '../state/getters'

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
        ...mapGetters({
            hoveredTile: HOVERING_GETTER,
            tileOwner: TILE_OWNER
        })

    },
    props: {
        title: String
    },
    methods: {
        mousedOver(){
            this.$store.commit(NEW_HOVERED, this.title)
        }
    }
}

</script>

<style scoped>

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
    transform: translateY(-50%);
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

.label{
    position: absolute;
    top: -80%;
    left: 50%;
    transform: translate(-50%, -20%);
    font-size: .9em;
    width: 70%;
    /* z-index: 99; */
    /* opacity: 1; */

    background-color: whitesmoke;
    border: solid black;
    border-width: .02em;
    padding: .2em .65em .2em .65em;
    border-radius: .8em;

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

</style>