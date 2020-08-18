<template>
  <div id="app" class="app">
    <div class="header">
      <Navbar></Navbar>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
  html,body{
    margin: 0;
    padding: 0;
    font-family: Georgia, serif;
  }
  .el-button{
    font-family: Georgia, serif;
    font-weight: bold;
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
  ::-webkit-scrollbar {
    width: 6px;
    height: 8px;
    background-color: #f5f5f5;
  }
  ::-webkit-scrollbar-thumb {
      border-radius:5px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .0);
      background-color: rgba(0, 0, 0, .1)
  }
</style>