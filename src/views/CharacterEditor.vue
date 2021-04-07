<template>
  <div class="about">
    <h1>Character auditor</h1>


    <v-multiselect-listbox :options="allFighters"
    :reduce-display-property="(option) => option.name"
    :reduce-value-property="(option) => option.id"
    v-model="selected"
     class="boxClass"/>
  <div class="button" @click="clear">Clear</div>
  <div class="button" @click="save">Download Chars</div>

  <div>{{selected}}</div>
  </div>

</template>

<script>

import vMultiselectListbox from 'vue-multiselect-listbox'
import 'vue-multiselect-listbox/dist/vue-multi-select-listbox.css';
import fighters from '../assets/data/allfighters.json'

const alpahbeticalSort = function(a, b) {
    var textA = a.name.toUpperCase();
    var textB = b.name.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
}

export default {
  components: {
    vMultiselectListbox
  },
  data(){
    return {
      selected:[],
      curFighters: fighters
    }
  },
  computed:{
    allFighters: function(){
      return Object.keys(this.curFighters).map(k => this.curFighters[k]).sort(alpahbeticalSort)
    }
  },
  methods:{
    clear: function(){
      console.log("cleared!")
      console.log(this.selected)
      this.selected = []
    },
    save: function() {
      //from https://stackoverflow.com/questions/48611671/vue-js-write-json-object-to-local-file
      const data = JSON.stringify(this.curFighters, null, 2)
      const blob = new Blob([data], {type: 'text/plain'})
      const e = document.createEvent('MouseEvents'),
      a = document.createElement('a');
      a.download = "allfighters.json";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
    }
  },
  name: "CharacterEditor"
}
</script>

<style scoped>

.boxClass{
  color:black;
  background-color: white;
}

.button{
  background-color: brown;
  color: whitesmoke;
  margin-top:.2em;
  margin-left: auto;
  margin-right: auto;
  padding-top: .4em;
  padding-bottom: .4em;
  padding-left: .7em;
  padding-right: .7em;
  width: 5vw;
}

.button:active{
  background-color: rgb(194, 25, 25);
  color: rgb(185, 185, 185);
}

</style>
