<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
</script>

<template>
  <VApp>
    <TheHeader />
    <VMain>
      <RouterView />
    </VMain>
    <TheFooter />
  </VApp>
</template>

<style scoped></style>
