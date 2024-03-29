import { useLocaleConfig } from "vuepress-shared/client";

import { enMembersOption } from "./en.js";
import { zhMembersOption } from "./zh.js";

export const useMembersLocale = () =>
  useLocaleConfig({
    "/": enMembersOption,
    "/zh/": zhMembersOption
  });

export * from "./types.js";
