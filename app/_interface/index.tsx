import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { postDetail } from '../_components/common/PostCard';

export interface magazineCategoryArray {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  iconId: number;
}

export interface testProps {
  indexOfTest: number;
  access: boolean;
  answers: {
    questionId: number | null;
    choiceId: number | null;
    score: number | null;
    description: string | null;
  }[];
}

export interface magazinePostsArray {
  catId: number;
  source: string;
  createdAt: string;
  updatedAt: string;
  desc: string;
  id: number;
  image: string;
  magazineCategoryId: any;
  numViews: number;
  score: string;
  title: string;
  url: string;
  userId: number;
  readingTime: string;
  rateAverage: any;
  rateCount: number;
  isRated: boolean;
  isLiked: boolean;
  isSaved: boolean;
  writername: string;
  writerbio: string;
  writerimage: any;
  hashtag: string;
  magazineSubCategoryId: number | null;
  writerId: number;
}

export interface magazineCommentProps {
  data: any;
  refetch?: any;
  hasReply?: boolean;
}

export interface dropdownItemInterface {
  title: string;
  href?: string;
  hrefs?: {
    title: string;
    href?: string;
  }[];
  icon?: string;
}

export interface dropdownInterface {
  id: string;
  color: string;
  href: string;
  items: dropdownItemInterface[];
}

export interface customSliderInterface {
  image?: StaticImport;
  arthurImage?: StaticImport;
  arthurName?: string;
  description?: string;
  storyName?: string;
  storyImage?: StaticImport;
}

export interface filterSchemaInterface {
  type: 'normal' | 'checkbox' | 'double' | 'title' | 'select' | 'line' | 'search';
  id?: number;
  accordion: boolean;
  search: boolean;
  title?: string;
  placeholder?: string;
  items?: {
    title: string;
    query: string;
  }[];
  parentQuery?: string;
}
export interface filterShopSchemaInterface {
  type: 'normal' | 'checkbox' | 'double' | 'title' | 'select';
  id?: number;
  accordion: boolean;
  search: boolean;
  title: string;
  items: {
    title: string;
    query: string;
  }[];
}

export interface articlePostProps {
  data: magazinePostsArray;
  refetch?: any;
}

export interface popularPostProps {
  image: StaticImport;
  title: string;
}

export interface commentDetail {
  author: {
    profileImage: StaticImport;
    name: string;
  };
  time: string;
  like: number;
  dislike: number;
  comment: string;
}

export interface journalPostObject {
  title: string;
  image: StaticImport;
  author: {
    name: string;
    profileImage: StaticImport;
    bio: string;
  };
  time: string;
  studyTime: string;
  tableOfContents: {
    title: string;
  }[];
  popularPosts: popularPostProps[];
  content: string;
  rate: {
    percentage: number;
    totalRate: number;
  };
  opinion: {
    comments: commentDetail[];
  };
  relatedPosts: postDetail[];
}

export interface authorBio {
  name: string;
  bio: string;
  className?: string;
  image: string;
}

export interface commentProps {
  detail: commentDetail;
  index: number;
  totalComments: number;
}

export interface modalProps {
  isOpen: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
  className?: string;
  children: string | React.ReactNode;
}

export interface forumQuestionProps {
  description: string;
  author: {
    profileImage: StaticImport;
    name: string;
  };
  time: string;
  id: string | number;
  totalLike: number;
  opinion: {
    comments: commentDetail[];
  };
}

// store interfaces ---------

export interface storeInterface {
  navigation: navigationReduxInterface;
  filter: filterInterface;
  login: loginReduxInterface;
  loading: loadingReduxProps;
  user: userReduxProps;
  userRevoke: userRevokeProps;
  search: any;
  test: testProps;
}

export interface navigationReduxInterface {
  dropdownActiveId: string;
  joinedTopicsToggle: boolean;
}

export interface filterInterface {
  activeFilterBoxId: number[];
}

export interface loginReduxInterface {
  isOpen: boolean;
}

export interface userRevokeProps {
  isOpen: boolean;
}

export interface loadingReduxProps {
  apiLoading: boolean;
  pageLoading: boolean;
}

export interface userReduxProps {
  userData: any;
}

export interface typologyComment {
  aniagram: number;
  anagram: string;
  anagramInstinct: string;
  temperment: string;
  aniagraminstinct: number;
  createdAt: string;
  description: string;
  famouspeople_id: number;
  id: number;
  mbti: string;
  replies: typologyComment[];
  replyTo: number;
  subject: string;
  updatedAt: string;
  userId: number;
  usersName: string;
}
