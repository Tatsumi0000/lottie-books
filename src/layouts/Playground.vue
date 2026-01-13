<script setup lang="ts">
import LottieAnimationItem from "@/components/LottieAnimationItem.vue";
import { ref, watch } from "vue";
import { mdiAlertCircle, mdiClose, mdiFileCode } from "@mdi/js";

const isShowError = ref(false);
const errorMessage = ref("");

const triggerError = (message: string) => {
  errorMessage.value = message;
  isShowError.value = true;
};

interface FileInfo {
  name: string;
  animationData: object;
}

const fileInfo = ref<FileInfo>();
const fileDefineModel = defineModel<File | File[] | undefined>();

const rejectedEvent = () => {
  triggerError(
    "ファイルタイプが不正です。JSONファイルをアップロードして下さい。",
  );
};

const onAlertClosed = () => {
  isShowError.value = false;
  errorMessage.value = "";
};

const clearAll = () => {
  fileInfo.value = undefined;
  fileDefineModel.value = undefined;
  onAlertClosed();
};

watch(fileDefineModel, async (newFile) => {
  try {
    if (newFile instanceof File) {
      isShowError.value = false;
      const text = await newFile.text();
      fileInfo.value = {
        name: newFile.name,
        animationData: JSON.parse(text),
      };
    }
  } catch (error) {
    fileDefineModel.value = undefined;
    if (error instanceof SyntaxError) {
      triggerError("JSONの構文エラーが発生しました。");
    } else {
      triggerError("読み込みまたは解析に失敗しました。");
    }
  }
});
</script>

<template>
  <VContainer class="py-10">
    <VSheet max-width="800" class="mx-auto bg-transparent">
      <VAlert
        v-model="isShowError"
        type="error"
        variant="tonal"
        closable
        :icon="mdiAlertCircle"
        class="mb-6"
        @click:close="onAlertClosed()"
      >
        {{ errorMessage }}
      </VAlert>

      <VFadeTransition hide-on-leave>
        <div v-if="!fileInfo" key="upload-area">
          <VFileUpload
            v-model="fileDefineModel"
            filterByType=".json"
            label="Lottie JSONファイルをここにドロップ"
            @rejected="rejectedEvent"
            variant="dashed"
            border="md"
            class="rounded-xl pa-8"
            height="300"
          />
        </div>

        <div v-else key="preview-area">
          <VCard variant="flat" border class="pa-6 rounded-xl shadow-sm">
            <div class="d-flex align-center justify-space-between mb-6">
              <div class="d-flex align-center overflow-hidden">
                <VAvatar color="primary" variant="tonal" class="mr-3">
                  <VIcon :icon="mdiFileCode" />
                </VAvatar>
                <div class="text-truncate">
                  <p class="text-caption text-medium-emphasis mb-0">
                    Selected File
                  </p>
                  <h3 class="text-h6 font-weight-bold text-truncate">
                    {{ fileInfo.name }}
                  </h3>
                </div>
              </div>
              <VBtn
                :icon="mdiClose"
                variant="tonal"
                color="grey"
                @click="clearAll"
              />
            </div>

            <VDivider class="mb-6" />

            <div
              class="bg-grey-lighten-4 rounded-lg pa-4 d-flex justify-center align-center"
            >
              <LottieAnimationItem
                :title="fileInfo.name"
                :animationData="fileInfo.animationData"
                class="w-100"
              />
            </div>
          </VCard>
        </div>
      </VFadeTransition>
    </VSheet>
  </VContainer>
</template>

<style scoped>
/* Lottie表示エリアのサイズを最適化 */
:deep(.v-file-upload__content) {
  gap: 12px;
}
</style>
