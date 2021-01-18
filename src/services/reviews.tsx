import { post, put, get } from "src/services/fetch";
import { IReview } from "src/types/api";

export const postReview = (body: IReview, record: boolean = false) => {
  return post("/review", { ...body, record }, true);
};

export const updateReview = (id: string, rating: number) => {
  return put("/review", { id, rating }, true);
};

export const getUserGameReview = (userId: string, gameId: number) => {
  return get("/review/user/game", { userId, gameId }, true);
};
