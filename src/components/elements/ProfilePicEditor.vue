<template>
    <div @mousewheel="mouseWheelZoom"
        @mousedown="imageClipDragStart"
        @mouseup="imageClipDragStop"
        @mouseleave="imageClipDragStop"
        @mousemove="imageClipDragMove" 
        class="container">
        <img :src="imgUrl"  @error="altIcon"  :style="smallStyle" draggable="false" />
    </div>
</template>

<script>

const defaultImageHeight = 400
const defaultImageWidth = 300

export default {
    name:"ProfilePicEditor",
    props:{
        imgUrl: String,
        lazyUpdate: Function,
        startPos: Object
    },
    data:function(){
        return {
            positioning:{
                zoom:1,
                left: 50,
                top: 50,
                leftp: defaultImageWidth/2,
                topp: defaultImageHeight/2
            },
            dragging: false,
            dragX: 0,
            dragY: 0,
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
        mouseWheelZoom: function(e){
            if(this.dragging) return
            var sub_e = window.event || e; // old IE support
            var delta = Math.max(-1, Math.min(1, (sub_e.wheelDelta || -sub_e.detail)))
            if(delta > 0)
                this.positioning.zoom += .25
            else{
                this.positioning.zoom -= .25
            }
            if(this.lazyUpdate !== undefined){
                this.lazyUpdate(this.positioning.zoom, this.positioning.left, this.positioning.top)
            }
        },
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
        imageClipDragStart(e) {
            if (e.button === 0) {
                this.dragging = true;
                this.dragX = e.clientX;
                this.dragY = e.clientY;
            }
        },
        imageClipDragStop() {
            this.dragging = false;
            if(this.lazyUpdate !== undefined){
                this.lazyUpdate(this.positioning.zoom, this.positioning.left, this.positioning.top)
            }
        },
        imageClipDragMove(e) {
            if (!this.dragging) {
                return;
            }

            const x0 = this.dragX;
            const y0 = this.dragY;
            const x1 = e.clientX;
            const y1 = e.clientY;

            this.dragX = x1;
            this.dragY = y1;

            const dx = x1 - x0;
            const dy = y1 - y0;

            let left = 0;
            let top = 0;
            left += dx / (this.positioning.zoom / 100);
            this.positioning.leftp += left
            // left = Math.max(0, Math.min(this.imageWidth - this.clipSize, left));
            top += dy / (this.positioning.zoom / 100);
            this.positioning.topp += top
            // top = Math.max(0, Math.min(this.imageHeight - this.clipSize, top));

            this.positioning.left = this.positioning.leftp / defaultImageWidth
            this.positioning.top = this.positioning.topp / defaultImageHeight
            // this.$emit('update:clipLeft', left);
            // this.$emit('update:clipTop', top);
        },
    },
    watch:{
        startPos: function(){
            if(this.startPos !== null && this.startPos !== undefined){
                this.positioning = {
                    zoom: this.startPos.zoom,
                    left: this.startPos.left,
                    top: this.startPos.top,
                    leftp: this.startPos.left /100 * defaultImageWidth,
                    topp: this.startPos.top /100 * defaultImageHeight,
                }
            } else{
                this.positioning = {
                    zoom:1,
                    left: 50,
                    top: 50,
                    leftp: defaultImageWidth/2,
                    topp: defaultImageHeight/2
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