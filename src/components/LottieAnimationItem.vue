<script setup lang="ts">
import { ref, watch } from "vue";
import { Vue3Lottie } from "vue3-lottie";

interface Props {
  /** LottieアニメーションのJSONデータ */
  animationData?: object;
  /** LottieアニメーションのJSONファイルのパス */
  path?: string;
}

const props = defineProps<Props>();
/** ループするか */
const loop = ref(false);
/** 自動再生するか */
const autoPlay = ref(false);

/** lottieをマウントしている要素 */
const lottieContainer = ref<InstanceType<typeof Vue3Lottie> | null>(null);

/** 先頭から再生開始 */
const restartAnimation = () => {
  lottieContainer.value?.stop();
  lottieContainer.value?.play();
};

/** 再生開始 */
const handlePlay = () => {
  loop.value = false;
  autoPlay.value = true;

  restartAnimation();
};

watch(loop, (newLoop) => {
  if (newLoop) {
    autoPlay.value = true;
    restartAnimation();
  }
});
</script>

<template>
  <VContainer>
    <VCard>
      <Vue3Lottie
        ref="lottieContainer"
        :animationData="props.animationData"
        :assetsPath="props.path"
        :autoPlay="autoPlay"
        :loop="loop"
      />
      <VBtn @click="handlePlay()"> 再生 </VBtn>
      <VSwitch
        :label="`ループ再生: ${loop ? 'ON' : 'OFF'}`"
        color="primary"
        v-model="loop"
      />
    </VCard>
  </VContainer>
</template>

<style scoped></style>
