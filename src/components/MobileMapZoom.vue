<template>
    <div class="map">   
        <div class="leftBar">
            <div class="label left-text">Zoom</div>
            <VueSlider
                v-model="zoomLevel"
                :max="5"
                :min="1"
                :marks="false"
                :adsorb="false"
                :lazy="false"
                :direction="'ttb'"
            />
        </div>
        <div class="botBar">
            <div class="label">Horizontal</div>
            <VueSlider
                v-model="xPos"
                :max="50"
                :min="-50"
                :marks="false"
                :adsorb="false"
                :lazy="false"
            />
        </div>
        <div class="rightBar">
            <div class="label">Vertical</div>
            <VueSlider
                v-model="yPos"
                :max="22"
                :min="-50"
                :marks="false"
                :adsorb="false"
                :lazy="false"
                :direction="'ttb'"
            />
        </div>
        <div :style="zoomStyle">
            <MainMap/>    
        </div>

    </div>
</template>

<script>

import MainMap from './MainMap.vue'
import VueSlider from 'vue-slider-component'
// import 'vue-slider-component/theme/default.css'
import './elements/customerSlider.css'


export default {
    name:"MobileMapZoomer",
    components:{
        VueSlider,
        MainMap,
    },
    computed:{
        zoomStyle(){
            return {
                transform: `scale(${this.zoomLevel}) translate(${this.xPos}%, ${this.yPos}%)`
            }
        }
    },
    data: function(){
        return{
            zoomLevel: 2,
            xPos: 0,
            yPos: -20,
        }
    }
}
</script>

<style scoped>

    .left-text{
        transform: rotate(180deg);
    }

    .label{
        background-image: url(/img/header-bg.f7d10ea2.png);
        background-size: 100% 100%;
        width: fit-content;
        height: fit-content;
        margin: auto;
        filter: hue-rotate(332deg);
        overflow: visible;
        padding: 1%;
    }

    .leftBar{
        position: absolute;
        left: 2%;
        height: 75%;
        width: auto;
        text-orientation: mixed;
        writing-mode: vertical-lr;
        top: 12%;
        z-index: 10;
    }

    .rightBar{
        position: absolute;
        right: 2%;
        height: 75%;
        width: auto;
        text-orientation: mixed;
        writing-mode: vertical-rl;
        top: 12%;
        z-index: 10;
    }

    .botBar{
        position: absolute;
        right: 5%;
        width: 75%;
        width: 65%;
        bottom: 6%;
        z-index: 10;
        left:50%;
        transform: translate(-50%);
    }


    .map{
        position: relative;
        z-index: 0;
        font-size: .7em;
    }
</style>