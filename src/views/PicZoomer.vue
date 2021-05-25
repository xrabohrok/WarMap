<template>
  <div class="about">
    <h1>Character auditor</h1>

    <v-multiselect-listbox :options="allFighters"
    :reduce-display-property="(option) => option.name"
    :reduce-value-property="(option) => option.id"
    v-model="selected"
     class="boxClass"/>
  <div class="button" @click="clear">Clear</div>
  <div class="button" @click="send">Change Pic Center</div>

  <div class="editorText">{{selected}}</div>

  <ProfilePic :imgUrl="'/fighterimages/397.png'" :isEditable="true" class="profPic" :startPos="curPositioning" :lazyUpdate="updatePos"/>
  
  <div class="editorText"> {{curPositioning}} </div>
  </div>

</template>

<script>

import vMultiselectListbox from 'vue-multiselect-listbox'
import 'vue-multiselect-listbox/dist/vue-multi-select-listbox.css'
import ProfilePic from '../components/elements/ProfilePic.vue'


const axios = require('axios').default
// const api = axios.create({baseURL: '/server'});

const alpahbeticalSort = function(a, b) {
    const theFinder = /the /i
    var textA = a.name.toUpperCase().replace(theFinder, '');
    var textB = b.name.toUpperCase().replace(theFinder, '');
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
}

export default {
  components: {
    vMultiselectListbox,
    ProfilePic
  },
  data(){
    return {
      selected:[],
      curFighters: [],
      curPositioning: { zoom:1, left:0, top:0}
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
    changeFighter: function(){
      var curr = this.selected[0]
      if (curr === undefined) return

      if('minview' in curr){
        this.curPositioning = curr.minview
      }
      else{
        this.curPositioning = {
            zoom:1,
            left: 0,
            top: 0,
        }
      }
    },
    send: function(){},
    updatePos: function(zoom, left, top){
      this.curPositioning['zoom'] = zoom
      this.curPositioning['left'] = left
      this.curPositioning['top'] = top

    },
  },
  mounted:function(){
      axios
      .get('/server/allFighters')
      .then(response => this.curFighters = response.data)
      .catch(r => console.log(r))
  },
  name: "PicZoomer"
}
</script>

<style scoped>

.profPic{
  height: 30vh;
  width: 30vh;
  border-style: solid;
  border-color: black;
  margin-left: auto;
  margin-right: auto;
}

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
