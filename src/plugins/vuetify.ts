import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
// @ts-ignore "vuetify/styles.css"にしないとエラーにならないけど拡張子をつけるとビルドエラーになるので除外
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { VFileUpload } from "vuetify/labs/VFileUpload";

export default createVuetify({
  components: {
    components,
    VFileUpload,
  },
  directives,
  theme: {
    defaultTheme: "dark",
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});
