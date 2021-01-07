import moment from "moment";

import { post } from "src/services/fetch";

const gameFields = `id, rating, name, total_rating, cover.image_id, keywords.name, summary, 
first_release_date,release_dates.date, screenshots.image_id, artworks.image_id, involved_companies.company.name, involved_companies.publisher,involved_companies.supporting, involved_companies.porting,
involved_companies.company.slug, involved_companies.developer, genres.name, genres.slug, themes.name, themes.slug, platforms.name, platforms.slug, platforms.abbreviation,
similar_games.cover.image_id, videos.name, videos.video_id, genres, themes, follows`;

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

export const getSoonGames = async () => {
  const today = moment();
  //const timeAgo = moment().add("months", 8);
  return await post(
    "/games",
    `fields ${gameFields}; where first_release_date > ${today.unix()} & themes != (42) & follows > 10 & cover.image_id != null;  limit 15;`
  );
};

export const getsevenDaysGames = async () => {
  const today = moment();
  const timeAgo = moment().add("days", 7);
  return await post(
    "/games",
    `fields ${gameFields}; where first_release_date > ${today.unix()} & first_release_date <= ${timeAgo.unix()}  & themes != (42) & cover.image_id != null;  limit 15;`
  );
};

export const searchGames = async search => {
  const offset = search.offset || 0;
  console.log(offset);
  let where = await buildWhere(search);
  const today = moment();
  if (where !== ``) {
    where = where.replace(`;`, ``);
    where = where + `& release_dates.date < ${today.unix()};`;
  }
  return await post("/games", `fields ${gameFields}; ${where} sort total_rating desc; limit 10; offset ${offset};`);
};

export const searchHighGames = async search => {
  let where = await buildWhere(search);
  const today = moment();
  const timeAgo = moment().add("years", -5);
  if (where !== ``) {
    where = where.replace(`;`, ``);
    where =
      where + ` & total_rating > 80 & release_dates.date > ${timeAgo.unix()} & release_dates.date < ${today.unix()};`;
  }
  return await post("/games", `fields ${gameFields}; ${where} sort total_rating desc; limit 10;`);
};

const buildWhere = async search => {
  let genres: any[] = [];
  let themes: any[] = [];
  let platforms: any[] = [];

  await search.selections.map(sel => {
    switch (sel.type) {
      case "genres":
        genres = [...genres, sel.id];
        break;
      case "themes":
        themes = [...themes, sel.id];
        break;
      default:
        platforms = [...platforms, sel.id];
        break;
    }
  });

  let where = ``;
  let isEmpty = true;

  if (genres.length > 0) {
    isEmpty ? (where = `where `) : (where = where + ` & `);
    where = where + `genres = (${genres})`;
    isEmpty = false;
  }

  if (themes.length > 0) {
    isEmpty ? (where = `where `) : (where = where + ` & `);
    where = where + `themes = (${themes})`;
    isEmpty = false;
  }

  if (platforms.length > 0) {
    isEmpty ? (where = `where `) : (where = where + ` & `);
    where = where + `platforms = (${platforms})`;
    isEmpty = false;
  }

  if (search.name && search.name.length > 0) {
    isEmpty ? (where = `where `) : (where = where + ` & `);
    where = where + ` name = "${search.name}"*`;
  }

  if (where !== ``) {
    where = where + `;`;
  }

  return where;
};
