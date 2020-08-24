<template>
  <div id="app">
    <div id="nav">
      <img alt="Vue logo" src="./assets/logo.png" width="90">
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 1rem 0 0;
@media screen and (max-width: 450px){
   padding: 0;
   img {
     width: 60px;
   }
}
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
