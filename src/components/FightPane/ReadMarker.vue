<template>
  <div id="checkbox" @click="toggleChecked">
    <img src="../../assets/pics/checkbox.svg" v-if="!checked" />
    <img src="../../assets/pics/checked_circle.svg" v-if="checked" />
  </div>
</template>

<script>
import { HAS_READ_COMIC } from "../../state/getters"
import { MARK_READ, MARK_UNREAD } from "../../state/mutations"

import { mapGetters } from "vuex"

export default {
  props: {
    fighterId: Number,
    round: Number
  },
  data: function() {
    return {
      checked: false
    }
  },
  mounted: function() {
    this.checked = this.shouldBeChecked(this.fighterId, this.round)
  },
  methods: {
    toggleChecked: function() {
      this.checked = !this.checked
      if (this.checked)
        this.$store.commit(MARK_READ, {
          fighterId: this.fighterId,
          round: this.round
        })
      if (!this.checked)
        this.$store.commit(MARK_UNREAD, {
          fighterId: this.fighterId,
          round: this.round
        })
    }
  },
  computed: {
    ...mapGetters({
      shouldBeChecked: HAS_READ_COMIC
    })
  },
  watch: {
    fighterId: function(val) {
      this.checked = this.shouldBeChecked(val, this.round)
    },
    round: function(val) {
      this.checked = this.shouldBeChecked(this.fighterId, val)
    }
  },
  name: "ReadMarker"
}
</script>

<style scoped>
.checkbox {
  width: 1.2em;
  height: 1.2em;
  margin: 0.6em;
  color: grey;
}
</style>
