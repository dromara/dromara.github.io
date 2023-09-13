type ActivityCard = {
  name: string;
  cover: string;
  tags: string[];
  desc: string;
  author_name: string;
  github_name: string;
  time: string;
};

export type ActivityOption = {
  DESC: string;
  CARDS: ActivityCard[];
};

export interface GroupedPage {
  cover: string;
  tag: string[];
  title: string;
  url: string;
  author: string;
  date: string;
}

export type GroupedPages = {
  [key: string]: GroupedPage[];
};
