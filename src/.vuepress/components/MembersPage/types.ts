export type MembersOption = {
  MEMBERS: string;
  DESCRIPTION: string;
  FOUNDER: Member;
  TOC_MEMBER_TITLE: string;
  COMMITTEE_TITLE: string;
  COMMITTER_TITLE: string;
  TOC_MEMBERS: Array<Member>;
  COMMITTEES: Array<Member>;
  COMMITTERS: Array<Member>;
};

export type Member = {
  role: string;
  photo: string;
  name: string;
  desc: string;
};
