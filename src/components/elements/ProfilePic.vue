<template>
  <div class="container">
    <img :src="imgUrl" @error="altIcon" :style="smallStyle" draggable="false" />
  </div>
</template>

<script>
export default {
  name: "ProfilePic",
  props: {
    imgUrl: String,
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
    },
    faction: String
  },
  data: function() {
    return {
      zoom: 1,
      left: 50,
      top: 50
    }
  },
  computed: {
    smallStyle: function() {
      return {
        position: "absolute",
        width: "auto",
        height: `${100 * this.zoom}%`,
        left: `${this.left * this.zoom}%`,
        top: `${this.top * this.zoom}%`
      }
    }
  },
  created: function() {
    this.zoom = this.zoom_start
    this.left = this.left_start
    this.top = this.top_start
  },
  watch: {
    zoom_start: function(newVal, oldVal) {
      if (newVal != oldVal) this.zoom = newVal
    },
    left_start: function(newVal, oldVal) {
      if (newVal != oldVal) this.left = newVal
    },
    top_start: function(newVal, oldVal) {
      if (newVal != oldVal) this.top = newVal
    }
  },
  methods: {
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
    updateView() {
      this.pos = {
        zoom: this.zoom,
        left: this.left,
        top: this.top
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
