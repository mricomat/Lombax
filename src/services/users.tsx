import { post, get } from "src/services/fetch";

export const getUsers = (search: string) => {
  return get("/users", { search });
};

export const getUser = (id: string) => {
  return get("/user", { id });
};

export const follow = (id: string, followId: string) => {
  return post("/follow", { id, followId });
};

export const unFollow = (id: string, followId: string) => {
  return post("/unfollow", { id, followId });
};

export const getFollows = (id: string, offset: number) => {
  return get("/following", { id, offset });
};

export const getFollowers = (id: string, offset: number) => {
  return get("/followers", { id, offset });
};
