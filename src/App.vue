<template>
  <div id="app">
    <HatechEditor />
  </div>
</template>

<script>
import HatechEditor from './components/hatech/hatech-editor'
export default {
  name: 'App',
  components: {
    HatechEditor
  }
}
</script>

<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
}
</style>
