import AbandonedImg from "src/assets/images/abandoned.png";
import BeatenImg from "src/assets/images/beaten.png";
import CompletedImg from "src/assets/images/completed.png";
import PlayingImg from "src/assets/images/playing2.png";
import WantPlayImg from "src/assets/images/wantplay.png";

export const genresThemesInfo = [
  { id: 4, type: "genres", name: "Fighting", image_id: "co1lga", colorLeft: "#232323", colorRight: "#6C6C6C" },
  { id: 5, type: "genres", name: "Shooter", image_id: "co1re6", colorLeft: "#F59B23", colorRight: "#7B4E12" },
  { id: 7, type: "genres", name: "Music", image_id: "co1mdo", colorLeft: "#1D40B5", colorRight: "#122566" },
  { id: 8, type: "genres", name: "Platform", image_id: "ar4rw", colorLeft: "#BF1218", colorRight: "#60090C" },
  { id: 9, type: "genres", name: "Puzzle", image_id: "co1ofs", colorLeft: "#E84281", colorRight: "#710A32" },
  {
    id: 31,
    type: "genres",
    name: "Adventure",
    image_id: "htsbgb75k1zmn5gxjuqc",
    colorLeft: "#5296B9",
    colorRight: "#394044",
  },
  { id: 32, type: "genres", name: "Indie", image_id: "co1h9f", colorLeft: "#25A590", colorRight: "#213C37" },
  { id: 33, type: "genres", name: "Arcade", image_id: "kdiivvsrspavceeqadld", colorLeft: "", colorRight: "" },
  {
    id: 11,
    type: "genres",
    name: "Real Time Strategy",
    image_id: "rchvtoqmrqxldczm19gy",
    colorLeft: "",
    colorRight: "",
  },
  { id: 12, type: "genres", name: "RPG", image_id: "ar5sr", colorLeft: "", colorRight: "" },
  { id: 10, type: "genres", name: "Racing", image_id: "ar5sr", colorLeft: "", colorRight: "" },
  { id: 13, type: "genres", name: "Simulator", image_id: "co1tab", colorLeft: "", colorRight: "" },
  { id: 14, type: "genres", name: "Sport", image_id: "co1p7i", colorLeft: "", colorRight: "" },
  { id: 15, type: "genres", name: "Strategy", image_id: "co1rdy", colorLeft: "", colorRight: "" },
  { id: 16, type: "genres", name: "Turn Based Strategy", image_id: "co1n8t", colorLeft: "", colorRight: "" },
  { id: 24, type: "genres", name: "Tactical", image_id: "co1ox4", colorLeft: "", colorRight: "" },
  {
    id: 25,
    type: "genres",
    name: "Hack and Slash...",
    image_id: "nemib0kgnbo6i0rmlavm",
    colorLeft: "",
    colorRight: "",
  },
  { id: 30, type: "genres", name: "Pinball", image_id: "gzguu5dntz8vcykdgvvl", colorLeft: "", colorRight: "" },
  { id: 26, type: "genres", name: "Quiz/Trivial", image_id: "ffftbhy30aos1iq6hkdk", colorLeft: "", colorRight: "" },
  { id: 34, type: "genres", name: "Visual Nobel", image_id: "co1rdz", colorLeft: "", colorRight: "" },
  { id: 14, type: "themes", name: "Fantasy", image_id: "co1lga", colorLeft: "", colorRight: "" },
  { id: 2, type: "genres", name: "Point-and-click", image_id: "co1lga", colorLeft: "", colorRight: "" },
  { id: 1, type: "themes", name: "Action", image_id: "co1lga", colorLeft: "", colorRight: "" },
  { id: 19, type: "themes", name: "Horror", image_id: "co1lga", colorLeft: "", colorRight: "" },
  { id: 21, type: "themes", name: "Survival", image_id: "co1lga", colorLeft: "", colorRight: "" },
  { id: 20, type: "themes", name: "Thriller", image_id: "co1lga", colorLeft: "", colorRight: "" },
  { id: 18, type: "themes", name: "Science Fiction", image_id: "co1lga", colorLeft: "", colorRight: "" },
  { id: 28, type: "themes", name: "Business", image_id: "co1lga", colorLeft: "", colorRight: "" },
  { id: 23, type: "themes", name: "Stealth", image_id: "co1lga", colorLeft: "", colorRight: "" },
  { id: 31, type: "themes", name: "Drama", image_id: "co1lga", colorLeft: "", colorRight: "" },
  { id: 22, type: "themes", name: "Historical", image_id: "co1lga", colorLeft: "", colorRight: "" },
  { id: 43, type: "themes", name: "Mystery", image_id: "co1lga" },
  { id: 32, type: "themes", name: "Non Fiction", image_id: "co1lga", colorLeft: "", colorRight: "" },
  { id: 33, type: "themes", name: "SandBox", image_id: "co1lga", colorLeft: "", colorRight: "" },
  { id: 34, type: "themes", name: "Educational", image_id: "co1lga", colorLeft: "", colorRight: "" },
  { id: 35, type: "themes", name: "Kids", image_id: "co1lga", colorLeft: "", colorRight: "" },
  { id: 38, type: "themes", name: "Open World", image_id: "co1lga", colorLeft: "", colorRight: "" },
  { id: 39, type: "themes", name: "Warfare", image_id: "co1lga", colorLeft: "", colorRight: "" },
  { id: 40, type: "themes", name: "Party", image_id: "co1lga", colorLeft: "", colorRight: "" },
  {
    id: 41,
    type: "themes",
    name: "Explore, Expand, Exploit, and Exterminate",
    image_id: "co1lga",
    colorLeft: "",
    colorRight: "",
  },
  // { id: 42, type: "themes", name: "Erotic", image_id: "co1lga", colorLeft: "", colorRight: "" },
];

export const genresThemesSorted = JSON.parse(JSON.stringify(genresThemesInfo)).sort((a, b) =>
  a.name > b.name ? 1 : b.name > a.name ? -1 : 0
);

export const defaultSortItem = { id: "0", type: "all", name: "All genres" };

export const gameStatusColors = {
  WANT_TO_PLAY: "#59BCDB",
  PLAYING: "#1BC09D",
  BEATEN: "#8363FF",
  COMPLETED: "#CC0BA7",
  ABANDONED: "#B91314",
};

export const getStatusLabel = {
  WANT_TO_PLAY: "Want to play",
  PLAYING: "Started playing",
  BEATEN: "Game beaten",
  COMPLETED: "Game completed",
  ABANDONED: "Abandoned",
};

export const getGameStatusSource = {
  WANT_TO_PLAY: WantPlayImg,
  PLAYING: PlayingImg,
  BEATEN: BeatenImg,
  COMPLETED: CompletedImg,
  ABANDONED: AbandonedImg,
};
