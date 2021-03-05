<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <MainMap></MainMap>
  </div>
</template>

<script>
import MainMap from './MainMap.vue'

export default {
  name: 'MainPage',
  props: {
    msg: String
  },
  components: {
    MainMap
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1{
  font-family: 'Saira', sans-serif;
  font-size: 6em;
  margin-bottom: 1em;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
