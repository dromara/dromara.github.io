import { useLocaleConfig } from "vuepress-shared/client";

import { enHonorOption } from "./en.js";
import { zhHonorOption } from "./zh.js";

export const useHonorLocale = () =>
  useLocaleConfig({
    "/": enHonorOption,
    "/zh/": zhHonorOption
  });

export * from "./types.js";
