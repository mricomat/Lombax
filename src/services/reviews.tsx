import { post, put, get } from "src/services/fetch";
import { IReview } from "src/types/api";

export const postReview = (body: IReview, gameStatus: string, record: boolean = false) => {
  return post("/review", { ...body, gameStatus, record }, true);
};

export const updateReview = (id: string, rating: number) => {
  return put("/review", { id, rating }, true);
};

export const getUserGameReview = (userId: string, gameId: number) => {
  return get("/review/user/game", { userId, gameId }, true);
};

export const getUserReviews = (id: string, offset: number) => {
  return get("/reviews/user", { id, offset });
};
