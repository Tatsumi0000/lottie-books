import { computed } from "vue";
import { useTheme } from "vuetify";

interface LottieAsset {
  /** importするパス */
  url: string;
  /** lottieのファイル名 */
  fileName: string;
  /** ファイルの中身 */
  content: object;
}

const darkLottieAssets = (): Record<string, any> => {
  return import.meta.glob<string>(`@/assets/dark/*.json`, {
    eager: true,
  });
};

const lightLottieAssets = (): Record<string, any> => {
  return import.meta.glob<string>(`@/assets/light/*.json`, {
    eager: true,
  });
};
export const useLottieAssets = () => {
  const { global: theme } = useTheme();

  // 現在のテーマに応じたアセット配列を生成
  const currentAssets = computed<LottieAsset[]>(() => {
    const targetMap = theme.name.value === "dark"
      ? darkLottieAssets()
      : lightLottieAssets();

    return Object.entries(targetMap).map(([path, module]) => ({
      url: typeof module.default === "string" ? module.default : "",
      fileName: path.split("/").pop() || "",
      content: module.default,
    }));
  });

  return {
    currentAssets,
  };
};
