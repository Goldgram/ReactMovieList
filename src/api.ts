import { Sort, ImageWidth } from "./types";

const APIKEY = '' // API key not saved for obvious reasons

export const getListUrl = (
  page:number = 1,
  sortBy:Sort = 'popularity.desc'
) =>
  `https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}`
  + `&sort_by=${sortBy}`
  + `&page=${page}`;

export const getItemUrl = (movieId:string = '') =>
  `https://api.themoviedb.org/3/movie/${movieId}?api_key=${APIKEY}`;

export const getImageUrl = (imagePath:string, width:ImageWidth) =>
  `https://image.tmdb.org/t/p/${width}${imagePath}`;

