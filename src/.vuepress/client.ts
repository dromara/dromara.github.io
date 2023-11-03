import { defineClientConfig } from "@vuepress/client";

import GiteeRepo from "./components/GiteeRepo.vue";

export default defineClientConfig({
  enhance({ app }) {
    app.component("GiteeRepo", GiteeRepo);
  }
});
