export type MembersOption = {
  MEMBERS: string;
  DESCRIPTION: string;
  FOUNDER: Member;
  TOC_MEMBER_TITLE: string;
  COMMITTEE_TITLE: string;
  COMMITTER_TITLE: string;
  MEMBERS_ITEM: MembersGroup[];
};

type MembersGroup = {
  header: string;
  members: Member[];
};

export type Member = {
  role: string;
  photo: string;
  name: string;
  desc: string;
};
