<template>
  <div id="app" class="main">
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Saira&display=swap');

/*map labels*/
@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');

/*title*/
@import url('https://fonts.googleapis.com/css2?family=Suez+One&display=swap');

html{
  background-color: #3e112b;
}

body{
  margin: 0px;
}

.main{
  color: #e37e30;
  border-color: #9c031f;
  overflow: clip;
  font-size: 1.2vw;
}

@media only screen and (max-width: 840px) {
  .main {
      font-size: 4.2vw;
  }
}

.secondary{
  background-color: #631042;
  color: #f2a91d;
  border-color: #9c031f;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
