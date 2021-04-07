<template>
    <div class="mapTile" :style="tileWidth"
        @mouseenter="mousedOver()"
        @mouseup="selectingClick()"
        >
        <transition name="stab">
            <img src="../assets/pics/chooser-knife.png"
                v-if="isSelected" class="selector" draggable="false"
            >
        </transition>
        <div class="zone_title" v-if="shouldShowZone">
            {{zoneTitle}}
        </div>
        <transition name="ghost">
            <img src='../assets/pics/conflicted-marker.png' id="conflicted" class="battleIndicator" v-if="tileContested" draggable="false"/>
        </transition>
        <transition name="ghost">
            <img src='../assets/pics/gb-conflicted-marker.png' id="conflicted" class="battleIndicator" v-if="tileGrandBattle" draggable="false"/>
        </transition>
        <transition name="fall">
            <img :src="mapTilePath" v-if="!simple_mode"
                v-bind:class="{pyreOwned: pyreOwned, unOwned: unowned}" :style="fallTimeStyle" draggable="false">
        </transition>
        <transition name="fall">
            <img src="../assets/pics/simple_tile/simple_tile.png" v-if="simple_mode"
                v-bind:class="{pyreOwned: pyreOwned, unOwned: unowned}" class="simple" :style="fallTimeStyle" draggable="false">
        </transition>
        <transition name="fade">
            <div class="label" v-if="isHovered">
                {{title}}
            </div>
        </transition>
        <img src="../assets/pics/simple_tile/top-left.png"  v-show="nwBorder" />
        <img src="../assets/pics/simple_tile/top-right.png" v-show="neBorder" />
        <img src="../assets/pics/simple_tile/bot-left.png"  v-show="swBorder" />
        <img src="../assets/pics/simple_tile/bot-right.png" v-show="seBorder" />
    </div>
</template>

<script>

import {mapGetters} from 'vuex'
import {NEW_HOVERED, NEW_SELECTED} from '../state/mutations'
import {HOVERING_GETTER, TILE_OWNER, SELECTING_GETTER, SIMPLE_MODE, 
    CURRENT_ZONE_CONTESTED, CURRENT_ZONE_GRANDBATTLE, CUR_ZONE_ID, SHOW_ZONE_LABEL, CURRENT_ZONE_NAME} from '../state/getters'

const letters = [' ','a','b','c','d','e','f','g','h','i','j','k','l','m','n']

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
            return this.tileOwner(this.title) === "bastion"
        },
        pyreOwned: function(){
            return this.tileOwner(this.title) === "pyre"
        },
        unowned: function(){
            let owner = this.tileOwner(this.title);
            return !(owner === "pyre" || owner === "bastion")
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
        tileContested: function(){
            return this.isContested(this.title) && !this.isGrandBattle(this.title)
        },
        tileGrandBattle: function(){
            return this.isGrandBattle(this.title)
        },
        zoneTitle: function(){
            return this.currZoneTitle(this.title)
        },
        shouldShowZone: function(){
            return this.showZoneTitle(this.title)
        },
        neBorder: function(){
            if(!this.simple_mode) return false
            var num = parseInt(this.title.slice(1))
            var letter = this.title[0]
            if(num + 1 > 14) return true
            var other = `${letter}${num+1}`
            if(other === 'a14' || other === 'n1') return true
            return this.curZoneId(this.title) !== this.curZoneId(other)
        },
        swBorder: function(){
            if(!this.simple_mode) return false
            var num = parseInt( this.title.slice(1))
            var letter = this.title[0]
            if(num - 1 < 1) return true
            var other = `${letter}${num-1}`
            if(other === 'a14' || other === 'n1') return true
            return this.curZoneId(this.title) !== this.curZoneId(other)
        },
        nwBorder: function(){
            if(!this.simple_mode) return false
            var num = parseInt(this.title.slice(1))
            var letter = this.title[0]
            var iletter = letters.findIndex(l => l === letter)
            if(iletter - 1 < 1) return true
            var other = `${letters[iletter -1 ]}${num}`
            if(other === 'a14' || other === 'n1') return true
            return this.curZoneId(this.title) !== this.curZoneId(other)
        },
        seBorder: function(){
            if(!this.simple_mode) return false
            var num = parseInt(this.title.slice(1))
            var letter = this.title[0]
            var iletter = letters.findIndex(l => l === letter)
            if(iletter + 1 > 14 ) return true
            var other = `${letters[iletter +1 ]}${num}`
            if(other === 'a14' || other === 'n1') return true
            return this.curZoneId(this.title) !== this.curZoneId(other)
        },
        ...mapGetters({
            hoveredTile: HOVERING_GETTER,
            tileOwner: TILE_OWNER,
            selected: SELECTING_GETTER,
            simple_mode: SIMPLE_MODE,
            isContested: CURRENT_ZONE_CONTESTED,
            isGrandBattle: CURRENT_ZONE_GRANDBATTLE,
            curZoneId: CUR_ZONE_ID,
            showZoneTitle: SHOW_ZONE_LABEL,
            currZoneTitle: CURRENT_ZONE_NAME,
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
            //need to let the dom claim the space before scrolling
            // setTimeout(function(){
            //     window.scrollTo({top: window.innerHeight *.8, behavior: 'smooth'}) 
            // },200)
        }
    }
}

</script>

<style scoped>

.zone_title{
    color: rgb(80, 58, 70);
    font-weight: bolder;
    z-index: 200;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120%;
    font-size: 1.3em;
}

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

.battleIndicator{
    width: 4.4em;
    margin-left: auto;
    margin-right: auto;
    left: 50%;
    transform: translate(-40%,-50%);
    z-index: 98;
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
    z-index: 90;

    -khtml-user-select: none;
    -o-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
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

    -khtml-user-select: none;
    -o-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;

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

.ghost-enter-active, .ghost-leave-active {
  transition: opacity .3s ease-out, width .9s ease-in-out;

}
.ghost-enter /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  width: 0;

  /* top: 500%; */

}
.ghost-leave-to{
  opacity: 0;
  width: 0;

}

</style>