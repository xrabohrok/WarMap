<template>
  <div
    @mousewheel="mouseWheelZoom"
    @mousedown="imageClipDragStart"
    @mouseup="imageClipDragStop"
    @mouseleave="imageClipDragStop"
    @mousemove="imageClipDragMove"
    class="container"
  >
    <img :src="imgUrl" @error="altIcon" :style="smallStyle" draggable="false" />
  </div>
</template>

<script>
const defaultImageHeight = 400
const defaultImageWidth = 300

export default {
  name: "ProfilePicEditor",
  props: {
    imgUrl: String,
    lazyUpdate: Function,
    zoom_start: {
      type: Number,
      default: 1
    },
    left_start: {
      type: Number,
      default: 50
    },
    top_start: {
      type: Number,
      default: 50
    }
  },
  data: function() {
    return {
      positioning: {
        zoom: 1,
        left: 50,
        top: 50,
        leftp: defaultImageWidth / 2,
        topp: defaultImageHeight / 2
      },
      dragging: false,
      startX: 0,
      startY: 0,
      dragX: 0,
      dragY: 0
    }
  },
  computed: {
    smallStyle: function() {
      return {
        position: "absolute",
        width: "auto",
        height: `${100 * this.positioning.zoom}%`,
        left: `${this.positioning.left * this.positioning.zoom}%`,
        top: `${this.positioning.top * this.positioning.zoom}%`
      }
    }
  },
  methods: {
    mouseWheelZoom: function(e) {
      if (this.dragging) return
      var sub_e = window.event || e // old IE support
      var delta = Math.max(-1, Math.min(1, sub_e.wheelDelta || -sub_e.detail))
      if (delta > 0) this.positioning.zoom += 0.25
      else {
        this.positioning.zoom -= 0.25
      }
      if (this.lazyUpdate !== undefined) {
        this.lazyUpdate(
          this.positioning.zoom,
          this.positioning.left,
          this.positioning.top
        )
      }
    },
    altIcon(event) {
      if (this.faction === "pyre") {
        event.target.src = require("../../assets/pics/pyre-standin.png")
        return
      }
      if (this.faction === "bastion") {
        event.target.src = require("../../assets/pics/bastion-standin.png")
        return
      }
      event.target.src = "fighterimages/error.png"
    },
    imageClipDragStart(e) {
      if (e.button === 0 && !this.dragging) {
        this.dragging = true
      }
    },
    imageClipDragStop() {
      this.dragging = false
      if (this.lazyUpdate !== undefined) {
        this.lazyUpdate(
          this.positioning.zoom,
          this.positioning.left,
          this.positioning.top
        )
      }
    },
    imageClipDragMove(e) {
      if (!this.dragging) {
        return
      }

      this.positioning.top += e.movementY * (this.positioning.zoom / 10)
      this.positioning.left += e.movementX * (this.positioning.zoom / 10)
    }
  },
  watch: {
    zoom_start: function(newVal, oldVal) {
      if (newVal != oldVal) {
        this.positioning.zoom = newVal
      }
    },
    left_start: function(newVal, oldVal) {
      if (newVal != oldVal) {
        this.positioning.left = newVal
        this.positioning.leftp = (newVal / 100) * defaultImageWidth
      }
    },
    top_start: function(newVal, oldVal) {
      if (newVal != oldVal) {
        this.positioning.top = newVal
        this.positioning.topp = (newVal / 100) * defaultImageHeight
      }
    }
  }
}
</script>

<style scoped>
.container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

img {
  transform: translate(-50%, -50%);
}
</style>
