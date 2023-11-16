import { useLocaleConfig } from "vuepress-shared/client";

import { enProjectsOption } from "./en.js";
import { zhProjectsOption } from "./zh.js";

export const useProjectLocale = () =>
  useLocaleConfig({
    "/": enProjectsOption,
    "/zh/": zhProjectsOption
  });
