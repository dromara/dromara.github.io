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
  PROJECT: string;
  MORE_PROJECTS: string;
  PROJECT_DETAILS: ProjectDetail[];
  COMMUNITY: string;
  COMMUNITY_ITEM: CommunityItem[];
};
