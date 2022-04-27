<template>
  <div id="app">
    <HomePage />
  </div>
</template>

<script>
import HomePage from "./components/HomePage.vue";

export default {
  name: "App",
  components: {
    HomePage
  }
};
</script>

<style>
html * {
  font-size: 1em !important;
  font-family: Arial !important;
}
</style>
