interface Feature {
  name: string
  title: string
  desc: string
}

interface ProjectDetail {
  name: string
  description: string
  url: string
}

interface CommunityDetail {
  title: string
  time: string
}

interface CommunityItem {
  category: string
  icon: string
  details: CommunityDetail[]
}

export interface HomeOption {
  QUICK_START: string
  DESCRIPTION: string
  FEATURES: Feature[]
  STARS_OVERALL: string
  DATA_SOURCE: string
  OUR: string
  PROJECT: string
  MORE_PROJECTS: string
  VIEW_PROJECT: string
  PROJECT_DETAILS: ProjectDetail[]
  COMMUNITY: string
  COMMUNITY_ITEM: CommunityItem[]
}

interface GroupedPost {
  title: string
  url: string
  time: string
}

export type GroupedPosts = Record<string, GroupedPost[]>;

export interface CommunityLink {
  category: string
  icon: string
  details: Array<{
    title: string
    time: string
    url: string
  }>
}
