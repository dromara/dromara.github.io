export interface Member {
  role: string;
  photo: string;
  name: string;
  desc: string;
}

interface MembersGroup {
  header: string;
  members: Member[];
}

export interface MembersOption {
  MEMBERS: string;
  DESCRIPTION: string;
  FOUNDER: Member;
  TOC_MEMBER_TITLE: string;
  COMMITTEE_TITLE: string;
  COMMITTER_TITLE: string;
  MEMBERS_ITEM: MembersGroup[];
}
