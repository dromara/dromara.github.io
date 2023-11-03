export interface ActivityOption {
  DESC: string;
}

export interface GroupedSectionPage {
  cover: string;
  tag?: string[];
  title: string;
  url: string;
  author: string;
  date: string;
}

export type GroupedSectionPages = Record<string, GroupedSectionPage[]>;
