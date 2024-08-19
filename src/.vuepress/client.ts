import { defineClientConfig } from "@vuepress/client";

import GiteeRepo from "./components/GiteeRepo.vue";

import VueViewer from "v-viewer";
import "viewerjs/dist/viewer.css";

export default defineClientConfig({
  enhance ({ app }) {
    app.component("GiteeRepo", GiteeRepo);
    app.use(VueViewer);
  }
});
