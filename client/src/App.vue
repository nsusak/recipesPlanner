<template>
  <router-view />
</template>
<script>
import { defineComponent } from "vue";
import store from "./store/index.js";

export default defineComponent({
  name: "App",
  store,
});
</script>
