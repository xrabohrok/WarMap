<template>
  <div class="about">
    <h1>Character auditor</h1>


    <v-multiselect-listbox :options="allFighters"
    :reduce-display-property="(option) => option.name"
    :reduce-value-property="(option) => option.id"
    v-model="selected"
    @change="getBackground"
     class="boxClass"/>
  <div class="button" @click="clear">Clear</div>
  <div class="button" @click="save">Merge Chars</div>

  <div class="editorText">{{selected}}</div>
  <div class="editorText">{{output}}</div>

  <div><textarea class="backgrounds" v-model="curBackground"> </textarea></div>
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
      curBackground:"",
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
      axios
      .post('/server/mergeFighters', {target:this.selected[0], doomed:this.selected.slice(1)})
      .then(()=>{
        // console.log("merge done")
        // console.log(response.data)
        axios
          .get('/server/allFighters')
          .then(response2 => {
            this.curFighters = response2.data
            this.selected = []
            })
          .catch(r2 => console.log(r2))
        })
      .catch(r => console.log(r))

    },
    async getBackground(){
      if(this.selected[0] === undefined) 
      {
        this.curBackground = ""
        return
      }
      axios.get(
        `/server/backstory/${this.selected[0]}`
      ).then(response => this.curBackground = response.data)
      .catch(r=>{
        if(r.response.status === 404) {
          console.log("no bg for " + this.selected[0]) 
          this.curBackground = ""
          return
        }
        console.log(r)
      })
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

.editorText{
  font-size: 5vw;
  color:rgb(247, 233, 179)
}

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

.backgrounds{
  height: 30vh;
  width: 30vw;
}

.button:active{
  background-color: rgb(194, 25, 25);
  color: rgb(185, 185, 185);
}

</style>
