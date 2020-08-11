<template>
  <div id="app" class="app">
    <div class="header">
      <Navbar></Navbar>
    </div>
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<style>
  html,body{
    margin: 0;
    padding: 0;
  }
  .app{
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .header{
    height: auto;
  }
  .main{
    flex: 1;
  }
</style>