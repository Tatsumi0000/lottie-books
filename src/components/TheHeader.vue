<script setup lang="ts">
import { VAppBar } from "vuetify/components";
import ThemeSwitch from "./ThemeSwitch.vue";
</script>

<template>
  <VAppBar title="Lottie Books">
    <template v-slot:append>
      <ThemeSwitch class="pr-5" />
    </template>
  </VAppBar>
</template>

<style scoped></style>
