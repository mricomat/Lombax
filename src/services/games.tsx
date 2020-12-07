import moment from "moment";

import { post } from "src/services/fetch";

const gameFields = `id, rating, name, total_rating, cover.image_id, keywords.name, summary, 
first_release_date,release_dates.date, screenshots.image_id, artworks.image_id, involved_companies.company.name, involved_companies.publisher,involved_companies.supporting, involved_companies.porting,
involved_companies.company.slug, involved_companies.developer, genres.name, genres.slug, themes.name, themes.slug, platforms.name, platforms.slug, platforms.abbreviation,
similar_games.cover.image_id, videos.name, videos.video_id`;

export const getMainGame = async () => {
  const today = moment();
  const timeAgo = moment().add("weeks", -3);
  return await post(
    "/games",
    `fields ${gameFields}; where release_dates.date > ${timeAgo.unix()} & release_dates.date < ${today.unix()} & themes != (42) & total_rating > 1 & cover.image_id != null; sort total_rating desc; limit 15;`
  );
};

export const getTopRated = async () => {
  const today = moment();
  const timeAgo = moment().add("months", -12);
  return await post(
    "/games",
    `fields ${gameFields}; where release_dates.date > ${timeAgo.unix()} & release_dates.date < ${today.unix()} & themes != (42) & total_rating > 70 & cover.image_id != null; sort total_rating desc; limit 15;`
  );
};

export const getGameById = async (id: number) => {
  return await post("/games", `fields ${gameFields}; where id=${id};`);
};
