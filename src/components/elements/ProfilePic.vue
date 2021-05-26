<template>
    <div class="container">
        <img :src="imgUrl"  @error="altIcon"  :style="smallStyle" draggable="false" />
    </div>
</template>

<script>

export default {
    name:"ProfilePic",
    props:{
        imgUrl: String,
        startPos: {
            zoom: 1,
            left: 50,
            top: 50,
        },
        faction: String
    },
    data:function(){
        return {
        }
    },
    computed:{
        smallStyle: function(){

            if(this.startPos === null || this.startPos === undefined){
                return {
                    position: 'absolute',
                    width: 'auto',
                    height: `100%`,
                    left: `50%`,
                    top: `50%`
                }
            }

            return {
                position: 'absolute',
                width: 'auto',
                height: `${100 * this.startPos.zoom}%`,
                left: `${this.startPos.left * this.startPos.zoom}%`,
                top: `${this.startPos.top * this.startPos.zoom}%`
            }
        }
    },
    methods:{
        altIcon(event){
            if (this.faction === 'pyre') 
            {
                event.target.src = require('../../assets/pics/pyre-standin.png')
                return
            }
            if (this.faction === 'bastion') 
            {
                event.target.src = require('../../assets/pics/bastion-standin.png')
                return
            }
            event.target.src = 'fighterimages/error.png'
        },
        updateView(){
            this.startPos = {
                zoom: this.startPos.zoom,
                left: this.startPos.left,
                top: this.startPos.top,
            }
        }
    }
}
</script>

<style scoped>
.container{
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
}

img{
    transform: translate(-50%, -50%);
}
</style>