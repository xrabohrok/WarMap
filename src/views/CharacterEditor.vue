<template>
  <div class="about">
    <h1>Character auditor</h1>


    <v-multiselect-listbox :options="allFighters"
    :reduce-display-property="(option) => option.name"
    :reduce-value-property="(option) => option.id"
    v-model="selected"
     class="boxClass"/>
  <div class="button" @click="clear">Clear</div>
  <div class="button" @click="save">Merge Chars</div>

  <div>{{selected}}</div>
  <div>{{output}}</div>
  </div>

</template>

<script>

import vMultiselectListbox from 'vue-multiselect-listbox'
import 'vue-multiselect-listbox/dist/vue-multi-select-listbox.css';


const axios = require('axios').default
// const api = axios.create({baseURL: '/server'});

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
      curFighters: [],
      output: "",
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
    async save(){
      //from https://stackoverflow.com/questions/48611671/vue-js-write-json-object-to-local-file

      // return api.getUri('test').then(resp => console.log(resp))

      axios
      .post('/server/mergeFighters', {target:this.selected[0], doomed:this.selected.slice(1)})
      .then(response => {
        console.log(response.data)
        axios
          .get('/server/allFighters')
          .then(response => this.curFighters = response.data)
          .catch(r => console.log(r))
        })
      .catch(r => console.log(r))

    }
  },
  mounted:function(){
      axios
      .get('/server/allFighters')
      .then(response => this.curFighters = response.data)
      .catch(r => console.log(r))
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
