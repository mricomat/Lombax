import config from "src/utils/config";

export const getImageUrl = (imageId?: string, size?: string) => {
  return config.imageUrl + `/${size}/${imageId}.jpg`;
};

export const getCoverUrl = (imageId?: string) => {
  return config.avatarUrl + `/${imageId}`;
};
