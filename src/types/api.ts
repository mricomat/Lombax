export interface IUser {
  id: string;
  name: string;
  email: string;
  username: string;
  token: string;
  description: string;
  coverId: string;
  backgroundId: string;
  interests: IGenre[];
  favorites: IGame[];
  followers: IUser[];
  following: IUser[];
  reviews: IReview[];
  gamesFeels: IGameFeel[];
  diary: IDiary[];
}

export interface IKeyword {
  id: number;
  name: string;
}

export default interface IGame {
  id: number;
  alternativeNames?: IAlternativeName[];
  artworks?: ICover[];
  bundles?: string[];
  category?: number;
  collection?: string[];
  cover?: ICover;
  dlcs?: string[];
  expansions?: string[];
  firstReleaseDate?: number;
  follows?: number;
  franchises?: string[];
  gameEngines?: string[];
  gameModes?: string[];
  genres?: IDataItem[];
  themes?: IDataItem[];
  hypes?: number;
  involved_companies: IInvolvedCompanies[];
  keywords?: IDataItem[];
  name?: string;
  parentGame?: string;
  platforms?: IPlatForm[];
  playerPerspectives?: string[];
  popularity?: number;
  pulseCount?: number;
  summary?: string;
  ratingCount?: number;
  screenshots: ICover[];
  similar_games?: string[];
  slug?: string;
  standaloneExpansions?: string[];
  total_rating?: number;
  versionParent?: string;
  versionTitle?: string;
  videos?: IVideo[];
  release_dates?: any;
}

interface IAlternativeName {
  name: string;
  comment: string;
}

export interface ICover {
  id: string;
  image_id?: string;
  animated?: boolean;
  height?: number;
  width?: number;
  url?: string;
}

interface IVideo {
  id: string;
  name: string;
  video_id: string;
}

export interface IDataItem {
  id: string;
  name: string;
  slug: string;
}

interface IPlatForm extends IDataItem {
  abbreviation: string;
  alternativeName: string;
  category: number;
  generation: number;
  summary: string;
}

interface IInvolvedCompanies {
  company: ICompany;
  developer: boolean;
  porting: boolean;
  publisher: boolean;
  supporting: boolean;
}

interface ICompany {
  id: string;
  country: number;
  description: string;
  developedGames: string[];
  publishedGames: string[];
  logo: ICompanyLogo;
  name: string;
  parent: string;
  slug: string;
  startDate: number;
  url: string;
}

interface ICompanyLogo {
  id: string;
  height: number;
  width: number;
}

export interface ILogInParams {
  email: string;
  password: string;
}

export enum GenreType {
  Genre = "GENRE",
  Theme = "THEME",
}

export interface IGenre {
  id: string;
  type: GenreType;
  name: string;
}

export interface IReview {
  userId: string;
  game: IGame;
  summary?: string;
  rating?: number;
  dateFinished?: string;
  timeToBeat?: string;
}

export interface IGameFeel {
  user: IUser;
  game: IGame;
  played?: boolean;
  like?: boolean;
}

export interface IDiary {
  _id: string;
  game: IGame;
  user: IUser;
  review: IReview;
  gameFeel: IGameFeel;
  type: DiaryType;
  action: DiaryAction;
}

export enum DiaryType {
  Review = "REVIEW",
  GameFeel = "GAME_FEEl",
  //
  //
}

export enum DiaryAction {
  Add = "ADD",
  Edit = "EDIT",
  Remove = "REMOVE",
}
