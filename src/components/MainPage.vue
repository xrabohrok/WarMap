<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="control_bar">
      <ToggleButton :value="false" :labels="{checked:'Simple', unchecked:'Detail'}" 
        @change="setSimpleMode($event)" :width="120" :height="40" :font-size="20"/>
    </div>
    <MainMap/>
    <transition name="slideup">
      <DetailPane v-show="isSelected"/>
    </transition>
  </div>
</template>

<script>
import MainMap from './MainMap.vue'
import DetailPane from './DetailPane'
import {ToggleButton} from 'vue-js-toggle-button'

import {SET_SIMPLE_MODE} from '../state/mutations'
import {SELECTING_GETTER} from '../state/getters'
import { mapGetters } from 'vuex'


export default {
  name: 'MainPage',
  props: {
    msg: String
  },
  components: {
    MainMap,
    ToggleButton,
    DetailPane
  },
  computed:{
    isSelected: function(){
      return this.selcting !== "NA"
    },
    ...mapGetters(
      {
        selcting: SELECTING_GETTER
      }
    )
  },
  methods:{
    setSimpleMode: function({value}){
      this.$store.commit(SET_SIMPLE_MODE, value)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.control_bar{
  padding-top:.3em;
  padding-bottom: .5em;
}

h1{
  font-family: 'Saira', sans-serif;
  font-size: 6em;
  margin-bottom: .3em;
}
a {
  color: #42b983;
}

.slideup-enter-active, .slideup-leave-active {
  transition: all .9s;
}
.slideup-enter{
  opacity: 0;
  transform: translatey(-100%);
  /* top: 500%; */
  /* height: 0; */


}
.slideup-leave-to{
  opacity: 0;
  transform: translatey(-100%);
  /* height: 0; */

}

</style>
