// import { useLocaleConfig } from "@vuepress/helper/client";
import { useLocaleConfig } from "@vuepress/helper/client";

import { enFooterOption } from "./en.js";
import { zhFooterOption } from "./zh.js";

export const useFooterLocale = () =>
  useLocaleConfig({
    "/": enFooterOption,
    "/zh/": zhFooterOption
  });

export * from "./types.js";
