import { defineClientConfig } from "@vuepress/client";

import GiteeRepo from "./components/GiteeRepo.vue";

import VueViewer from "v-viewer";
import "viewerjs/dist/viewer.css";

export default defineClientConfig({
  enhance ({ app ,router }) {
    app.component("GiteeRepo", GiteeRepo);
    app.use(VueViewer);
    router.beforeEach((to, from, next) => {
      if (this.window.location.hostname === 'localhost' || this.window.location.hostname === '127.0.0.1') {
        next();
        return;
      }
      const locale = navigator.language || navigator.userLanguage;
      if (locale.startsWith("zh")) {
        const url = "https://dromara.org.cn" + to.path;
        window.location.href = url;
      } else {
        next();
      }
    });
  }
});
