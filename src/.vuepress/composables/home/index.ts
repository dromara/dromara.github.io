import { useLocaleConfig } from "@vuepress/helper/client";

import { enHomeOption } from "./en.js";
import { zhHomeOption } from "./zh.js";

export const useHomeLocale = () =>
  useLocaleConfig({
    "/": enHomeOption,
    "/zh/": zhHomeOption
  });

export * from "./types.js";
