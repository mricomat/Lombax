import { post, put, get } from "src/services/fetch";
import IGame from "src/types/api";

export const getGameInfo = (userId: string, gameId: number) => {
  return get("/game", { userId, gameId }, true);
};

export const getGameFeels = (id: string, offset: number) => {
  return get("/games/user", { id, offset });
};

export const postGameFeel = (userId: string, game: IGame, like?: boolean, gameStatus?: string) => {
  return post("/gameFeel", { userId, game, gameStatus, like }, true);
};
