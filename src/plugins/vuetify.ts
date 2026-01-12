import "@mdi/font/css/materialdesignicons.css";
// @ts-ignore "vuetify/styles.css"にしないとエラーにならないけど拡張子をつけるとビルドエラーになるので除外
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "dark",
  },
  icons: {
    defaultSet: "mdi",
  },
});
