<template>
  <div id="app">
    <!-- nav bar -->
    <div class="ui inverted menu">
      <div class="ui container">
        <a href="#" class="header item">
          <img class="logo" src="./assets/logo.png" alt="">
        </a>
        <a href="#" class="item">Contacts</a>
        <div class="right menu">
          <a href="#/login" class="header item">
            <i class="big inverted user icon"></i>
          </a>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 0px;
  }
</style>
