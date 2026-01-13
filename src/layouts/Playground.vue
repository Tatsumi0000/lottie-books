<script setup lang="ts">
import LottieAnimationItem from "@/components/LottieAnimationItem.vue";
import { ref, watch } from "vue";
import { mdiClose, mdiFileCode } from "@mdi/js";

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
  <v-container class="py-10">
    <v-sheet max-width="800" class="mx-auto bg-transparent">
      <v-alert
        v-model="isShowError"
        type="error"
        variant="tonal"
        closable
        class="mb-6"
        @click:close="onAlertClosed()"
      >
        {{ errorMessage }}
      </v-alert>

      <v-fade-transition hide-on-leave>
        <div v-if="!fileInfo" key="upload-area">
          <v-file-upload
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
          <v-card variant="flat" border class="pa-6 rounded-xl shadow-sm">
            <div class="d-flex align-center justify-space-between mb-6">
              <div class="d-flex align-center overflow-hidden">
                <v-avatar color="primary" variant="tonal" class="mr-3">
                  <v-icon :icon="mdiFileCode" />
                </v-avatar>
                <div class="text-truncate">
                  <p class="text-caption text-medium-emphasis mb-0">
                    Selected File
                  </p>
                  <h3 class="text-h6 font-weight-bold text-truncate">
                    {{ fileInfo.name }}
                  </h3>
                </div>
              </div>
              <v-btn
                :icon="mdiClose"
                variant="tonal"
                color="grey"
                @click="clearAll"
              />
            </div>

            <v-divider class="mb-6" />

            <div
              class="bg-grey-lighten-4 rounded-lg pa-4 d-flex justify-center align-center"
            >
              <LottieAnimationItem
                :title="fileInfo.name"
                :animationData="fileInfo.animationData"
                class="w-100"
              />
            </div>
          </v-card>
        </div>
      </v-fade-transition>
    </v-sheet>
  </v-container>
</template>

<style scoped>
/* Lottie表示エリアのサイズを最適化 */
:deep(.v-file-upload__content) {
  gap: 12px;
}
</style>
