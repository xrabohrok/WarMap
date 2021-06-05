<template>
    <div class="mapTile" :style="tileWidth"
        @mouseenter="mousedOver()"
        @mouseleave="mousedOut()"
        @mouseout="mousedOut()"
        @mouseup="selectingClick()"
        >

        <div class="zone_title" v-if="shouldShowZone">
            {{zoneTitle}}
        </div>
        <div class="terrainGroup" :class="{terrainGroupHovered:isHovered}">
            <transition name="stab">
                <img src="../assets/pics/chooser-knife.png"
                    v-if="isSelected" class="selector" draggable="false"
                >
            </transition>
            <transition name="ghost">
                <img src='../assets/pics/grand-battle-overlay.png' id="battlezone" class="gboverlay" v-if="markAsGrandBattle" draggable="false"/>
            </transition>
            <transition name="ghost">
                <img src='../assets/pics/pyre-attack.png' id="conflictedpyre" class="battleIndicator" v-if="pyreAttacking" draggable="false"/>
            </transition>
            <transition name="ghost">
                <img src='../assets/pics/bastion-attack.png' id="conflictedbastion" class="battleIndicator" v-if="bastionAttacking" draggable="false"/>
            </transition>
            <transition name="ghost">
                <img src='../assets/pics/clash-pyre.png' id="clashbastion" class="battleIndicator" v-if="bastionAttackingClash" draggable="false"/>
            </transition>
            <transition name="ghost">
                <img src='../assets/pics/clash-bastion.png' id="clashpyre" class="battleIndicator" v-if="pyreAttackingClash" draggable="false"/>
            </transition>
            <transition name="ghost">
                <img src='../assets/pics/gb-conflicted-marker.png' id="conflictedgrand" class="battleIndicator" v-if="tileGrandBattle" draggable="false"/>
            </transition>
            <transition name="ghost">
                <img :src="itemPicture" id="items" class="fieldItem" v-if="shouldShowItems" draggable="false"/>
            </transition>
            <transition name="fall">
                <img :src="mapTilePath" v-if="graphicsFilter"
                    v-bind:class="{pyreOwned: pyreOwned, unOwned: unowned}" class="terrainTile" :style="fallTimeStyle" draggable="false">
            </transition>
            <transition name="fall">
                <img src="../assets/pics/simple_tile/simple_tile.png" v-if="!graphicsFilter"
                    v-bind:class="{pyreOwned: pyreOwned, unOwned: unowned}" class="simple" :style="fallTimeStyle" draggable="false">
            </transition>
        </div>
        <!-- <transition name="fade">
            <div class="label" v-if="isHovered">
                {{title}}
            </div>
        </transition> -->
        <img src="../assets/pics/simple_tile/top-left.png"  class="mapborder" v-show="nwBorder" />
        <img src="../assets/pics/simple_tile/top-right.png" class="mapborder" v-show="neBorder" />
        <img src="../assets/pics/simple_tile/bot-left.png"  class="mapborder" v-show="swBorder" />
        <img src="../assets/pics/simple_tile/bot-right.png" class="mapborder" v-show="seBorder" />
    </div>
</template>

<script>

import {mapGetters} from 'vuex'
import {NEW_SELECTED} from '../state/mutations'
import {TILE_OWNER, SELECTING_GETTER,
    CURRENT_ZONE_CONTESTED, CURRENT_ZONE_GRANDBATTLE, CUR_ZONE_ID, SHOW_ZONE_LABEL, CURRENT_ZONE_NAME, CUR_ZONE_ATTACKER, ROUND_GRANDBATTLES,
     TILE_IS_CLASH, CURRENT_ZONE_ITEMS, OPT_SHOW_GRAPHICS, OPT_SHOW_ITEMS, OPT_SHOW_LABELS} from '../state/getters'

const letters = [' ','a','b','c','d','e','f','g','h','i','j','k','l','m','n']

export default {
    name: 'MapTile',
    data(){
        return{
            publicPath: process.env.BASE_URL,
            hovering: false,
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
            return this.hovering
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
            return this.showZoneTitle(this.title) && this.zoneFilter
        },
        shouldShowItems: function(){
            return this.items(this.title).length > 0 && this.itemFilter
        },
        itemPicture: function(){
            return `items/${this.items(this.title)[0]}.png`
        },
        pyreAttacking: function(){
            return this.tileContested && this.zoneAttacker(this.title) === "pyre"
        },
        bastionAttacking: function(){
            return this.tileContested && this.zoneAttacker(this.title) === "bastion"
        },
        pyreAttackingClash: function(){
            return this.isClash(this.title) && this.zoneAttacker(this.title) === "pyre"
        },
        bastionAttackingClash: function(){
            return this.isClash(this.title) && this.zoneAttacker(this.title) === "bastion"
        },
        markAsGrandBattle: function(){
            return this.grandBattles.includes(this.curZoneId(this.title))
        },
        neBorder: function(){
            if(this.graphicsFilter) return false
            var num = parseInt(this.title.slice(1))
            var letter = this.title[0]
            if(num + 1 > 14) return true
            var other = `${letter}${num+1}`
            if(other === 'a14' || other === 'n1') return true
            return this.curZoneId(this.title) !== this.curZoneId(other)
        },
        swBorder: function(){
            if(this.graphicsFilter) return false
            var num = parseInt( this.title.slice(1))
            var letter = this.title[0]
            if(num - 1 < 1) return true
            var other = `${letter}${num-1}`
            if(other === 'a14' || other === 'n1') return true
            return this.curZoneId(this.title) !== this.curZoneId(other)
        },
        nwBorder: function(){
            if(this.graphicsFilter) return false
            var num = parseInt(this.title.slice(1))
            var letter = this.title[0]
            var iletter = letters.findIndex(l => l === letter)
            if(iletter - 1 < 1) return true
            var other = `${letters[iletter -1 ]}${num}`
            if(other === 'a14' || other === 'n1') return true
            return this.curZoneId(this.title) !== this.curZoneId(other)
        },
        seBorder: function(){
            if(this.graphicsFilter) return false
            var num = parseInt(this.title.slice(1))
            var letter = this.title[0]
            var iletter = letters.findIndex(l => l === letter)
            if(iletter + 1 > 14 ) return true
            var other = `${letters[iletter +1 ]}${num}`
            if(other === 'a14' || other === 'n1') return true
            return this.curZoneId(this.title) !== this.curZoneId(other)
        },
        ...mapGetters({
            tileOwner: TILE_OWNER,
            selected: SELECTING_GETTER,
            isContested: CURRENT_ZONE_CONTESTED,
            isGrandBattle: CURRENT_ZONE_GRANDBATTLE,
            isClash: TILE_IS_CLASH,
            curZoneId: CUR_ZONE_ID,
            showZoneTitle: SHOW_ZONE_LABEL,
            currZoneTitle: CURRENT_ZONE_NAME,
            zoneAttacker: CUR_ZONE_ATTACKER,
            grandBattles: ROUND_GRANDBATTLES,
            items: CURRENT_ZONE_ITEMS,

            graphicsFilter: OPT_SHOW_GRAPHICS,
            itemFilter: OPT_SHOW_ITEMS,
            zoneFilter: OPT_SHOW_LABELS,
        })

    },
    props: {
        title: String
    },
    methods: {
        mousedOver(){
            this.hovering = true
        },
        mousedOut(){
            this.hovering = false
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

/*elements*/


.gboverlay{
    width: 100%;
    left:-50%;
    top:50%;
    transform: translate(50%, -60%);
    z-index: 94;
    position: absolute;
    pointer-events: none;

    -khtml-user-select: none;
    -o-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
}

.zone_title{
    color: rgb(80, 58, 70);
    font-weight: bolder;
    z-index: 200;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120%;
    font-size: .9vw;

    font-family: 'Permanent Marker', cursive;

    background-image: url('../assets/pics/header-bg.png');
    background-size: 100% 100%;

    pointer-events: none;
    -khtml-user-select: none;
    -o-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
}

.selector{
    height: 9em;
    width: auto;
    z-index: 97;
    left: 50%;
    transform: translate(-50%, -80%);
    top: 0%;
    position: absolute;
    pointer-events: none;

    -khtml-user-select: none;
    -o-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
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

.simple{
    transform: translateY(-10%);
    width: 100%;
    height: auto;
    pointer-events: none;
    position:absolute;
    left: 0%;
    top: 0%;
    z-index: 90;
}

.battleIndicator{
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    left: 50%;
    transform: translate(-40%,-50%);
    z-index: 98;
    top:0%;
    position: absolute;

    -khtml-user-select: none;
    -o-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    pointer-events: none;
}

.terrainGroup{
    display: inline-block;
    transition: all .3s ease-in;
    position: relative;
    left: 0%;
    top: 0%;
    width: 100%;
    height: 100%;

}

.terrainTile{

    transform: translateY(-40%);
    width: 100%;
    pointer-events: none;
    position:absolute;
    left: 0;
    top: 0;
    z-index: 90;
    user-select: none;
}

.label{
    position: absolute;
    top: -80%;
    left: 50%;
    transform: translate(-50%, -20%);
    font-size: .9em;
    width: 70%;
    z-index: 99;

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

.fieldItem{
    -khtml-user-select: none;
    -o-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;

    position: absolute;
    left:50%;
    top:-70%;
    transform: translate(-50%, -20%);
    width: 90%;
    height: auto;

    z-index: 140;

}

.mapborder{
    width: 100%;
    height: auto;
    pointer-events: none;
    transform: translateY(-15%);
    position:absolute;
    left: 0%;
    top: 0%;
    z-index: 90;

    pointer-events: none;
    -khtml-user-select: none;
    -o-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
}

/*modifiers*/

img{
    -khtml-user-select: none;
    -o-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
}

.bastionOwned{
    filter:hue-rotate(0deg);
}

.pyreOwned{
    filter: hue-rotate(129deg);
}

.unOwned{
    filter: grayscale();
}

.simple.unOwned{
    filter: grayscale() brightness(1.8);
}

/*animations*/

div.terrainGroupHovered{
    transform: translateY(-50%);
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

.ghost-enter {
  opacity: 0;
  width: 0;
}

.ghost-leave-to{
  opacity: 0;
  width: 0;

}

</style>
