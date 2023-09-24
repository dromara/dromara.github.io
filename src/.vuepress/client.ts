import { defineClientConfig } from "@vuepress/client";
import { onMounted } from "vue";

export default defineClientConfig({
  setup() {
    onMounted(() => {
      const repo = document.querySelector(".vp-repo");
      if (repo == null) {
        return;
      }
      repo.innerHTML =
        `<a class="vp-repo-link" href="https://gitee.com/dromara" target="_blank" rel="noopener noreferrer" aria-label="GitHub" one-link-mark="yes"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" t="1695538305440" class="icon" viewBox="0 0 1024 1024" version="1.1" p-id="1444" style="width: 1.25rem; height: 1.25rem; vertical-align: middle;"><path d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z" fill="#C71D23" p-id="1445"></path></svg></a>` +
        repo.innerHTML;
    });
  }
});
