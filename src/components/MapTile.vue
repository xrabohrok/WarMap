<template>
    <div class="mapTile" :style="tileWidth"
        @mouseover="mousedOver()"
        @mouseleave="mousedOut()">
        <img src="../assets/mapTiles/map-tile.png">
        <transition name="fade">
            <div class="label" v-if="isHovered">
                {{title}}
            </div>
        </transition>
    </div>
</template>

<script>

export default {
    name: 'MapTile',
    data(){
        return{
            isHovered: false
        }
    },
    computed:{
        tileWidth: function(){
            return{
                "width": `${(100/14)}%`
            }
        }

    },
    props: {
        title: String
    },
    methods: {
        mousedOver: function(){
            this.isHovered = true;
        },
        mousedOut: function(){
            this.isHovered = false;
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
    /* height: 3em; */
    transition: transform 400ms;
}

.mapTile:hover{
    transform: translateY(-.4em);
}

img{
    width: 100%;
    height: auto;
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