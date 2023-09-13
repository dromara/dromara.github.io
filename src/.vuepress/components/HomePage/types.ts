type ProjectDetail = {
  name: string;
  description: string;
  url: string;
};

type CommunityDetail = {
  title: string;
  time: string;
};

type CommunityItem = {
  category: string;
  icon: string;
  details: CommunityDetail[];
};

export type HomeOption = {
  QUICK_START: string;
  DESCRIPTION: string;
  OPEN: string;
  OPEN_DESCRIPTION: string;
  VISION: string;
  VISION_DESCRIPTION: string;
  SLOGAN: string;
  SLOGAN_DESCRIPTION: string;
  STARS_OVERALL: string;
  DATA_SOURCE: string;
  OUR: string;
  PROJECT: string;
  MORE_PROJECTS: string;
  PROJECT_DETAILS: ProjectDetail[];
  COMMUNITY: string;
  COMMUNITY_ITEM: CommunityItem[];
};

interface GroupedPage {
  title: string;
  url: string;
  time: string;
}

export type GroupedPages = {
  [key: string]: GroupedPage[];
};

export interface CommunityLink {
  category: string;
  icon: string;
  details: {
    title: string;
    time: string;
    url: string;
  }[];
}
