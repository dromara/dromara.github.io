import { useLocaleConfig } from "@vuepress/helper/client";

import { enProjectsOption } from "./en.js";
import { zhProjectsOption } from "./zh.js";

export const useProjectLocale = () =>
  useLocaleConfig({
    "/": enProjectsOption,
    "/zh/": zhProjectsOption
  });
