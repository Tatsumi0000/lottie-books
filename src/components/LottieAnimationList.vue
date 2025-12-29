<script setup lang="ts">
import LottieAnimationItem from "./LottieAnimationItem.vue";
import SampleAnimation from "./../assets/sampleLottie.json";
</script>

<template>
  <VContainer>
    <VRow>
      <VCol cols="6" lg="3" v-for="n in 10" :key="n">
        <LottieAnimationItem
          :title="`${n.toString()} - 番目`"
          :animationData="SampleAnimation"
        />
      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped></style>
