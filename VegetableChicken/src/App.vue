<template>
  <div id="app">
<!--    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
	<MyExpress></MyExpress>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import MyExpress from './components/MyExpress.vue'
import Register from './components/Register.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
	MyExpress,
	Register
  }
}
</script>

<style>
#app {
/*  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
