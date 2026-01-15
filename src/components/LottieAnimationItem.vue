<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { Vue3Lottie } from "vue3-lottie";
import { mdiPlay } from "@mdi/js";
import { useRoute } from "vue-router";
import { useTheme } from "vuetify";
import { router } from "@/plugins/router";
interface BaseProps {
  /** ファイル名 */
  title: string;
}

/** animationData を使う場合の型 */
interface DataProps extends BaseProps {
  /** LottieアニメーションのJSONデータ */
  animationData: object;
  path?: never; // pathは入力させない
}

/** path を使う場合の型 */
interface PathProps extends BaseProps {
  animationData?: never; // animationDataは入力させない
  /** LottieアニメーションのJSONファイルのパス */
  path: string;
}

type Props = DataProps | PathProps;
const route = useRoute();
const isTopPage = computed(() => route.path === "/");

const { global: theme } = useTheme();

const props = defineProps<Props>();
const transitionLink = computed(() => {
  return `preview/${theme.name.value}/${props.title}`;
});

/** ループするか */
const loop = ref(false);
/** 自動再生するか */
const autoPlay = ref(false);
autoPlay.value = route.path === "/" ? false : true;

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
  <VCard
    class="mx-auto overflow-hidden custom-card"
    elevation="2"
    rounded="xl"
    :to="isTopPage ? transitionLink : undefined"
    :style='{ cursor: isTopPage ? "pointer" : "default" }'
    :ripple="isTopPage"
  >
    <div
      class="lottie-wrapper d-flex align-center justify-center bg-grey-lighten-4"
    >
      <Vue3Lottie
        ref="lottieContainer"
        :animationData="props.animationData"
        :assetsPath="props.path"
        :autoPlay="autoPlay"
        :loop="loop"
      />
    </div>
    <VCardTitle class="text-h6 font-weight-bold pt-4 px-4 text-truncate">
      {{ props.title }}
    </VCardTitle>
    <VCardActions clmdiPlayass="px-4 pb-4">
      <div class="d-flex align-center justify-space-between w-100" @click.stop>
        <VBtn
          color="primary"
          variant="elevated"
          :prepend-icon="mdiPlay"
          rounded="lg"
          @click="handlePlay"
        >
          再生
        </VBtn>

        <div class="d-flex align-center" @click.stop>
          <span
            class="text-body-2 font-weight-bold text-grey-darken-2 mr-2 d-none d-sm-inline"
          >
            LOOP
          </span>
          <VSwitch
            v-model="loop"
            color="success"
            hide-details
            density="compact"
            inset
          />
        </div>
      </div>
    </VCardActions>
  </VCard>
</template>

<style scoped>
.custom-card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

/* ホバー時に少し浮き上がる演出 */
.custom-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1) !important;
}

.lottie-wrapper {
  aspect-ratio: 16 / 9;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
</style>
