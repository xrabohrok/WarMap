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
        startPos: Object,
        faction: String
    },
    data:function(){
        return {
            positioning:{
                zoom:1,
                left: 50,
                top: 50,
            }
        }
    },
    computed:{
        smallStyle: function(){
            return {
                position: 'absolute',
                width: 'auto',
                height: `${100 * this.positioning.zoom}%`,
                left: `${this.positioning.left * this.positioning.zoom}%`,
                top: `${this.positioning.top * this.positioning.zoom}%`
            }
        }
    },
    methods:{
        altIcon(event){
            if (this.faction === 'pyre') return require('../../assets/pics/pyre-standin.png') 
            if (this.faction === 'bastion') return require('../../assets/pics/bastion-standin.png') 
            event.target.src = 'fighterimages/error.png'
        },
        updateView(){
            this.positioning = {
                zoom: this.startPos.zoom,
                left: this.startPos.left,
                top: this.startPos.top,
            }
        }
    },
    watch:{
        startPos: function(){
            if(this.startPos !== null && this.startPos !== undefined){
                this.positioning = {
                    zoom: this.startPos.zoom,
                    left: this.startPos.left,
                    top: this.startPos.top,
                }
            } else{
                this.positioning = {
                    zoom:1,
                    left: 50,
                    top: 50,
                }
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