export interface Slide {
  desc: string
  img: string
}

export interface TimeLineItem {
  year: string
  items: string[]
}

export interface HonorOption {
  SLIDES: Slide[]
  TIME_LINE: TimeLineItem[]
}
