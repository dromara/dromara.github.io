export interface ActivityOption {
  DESC: string;
}

export interface GroupedPage {
  cover: string;
  tag?: string[];
  title: string;
  url: string;
  author: string;
  date: string;
}

export type GroupedPages = Record<string, GroupedPage[]>;
