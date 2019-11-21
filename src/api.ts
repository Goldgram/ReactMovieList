import { Sort, SORTS, ImageWidth } from "./types";

const APIKEY = "4a203abe54a397a3160c4eb42e275f70"

export const getListUrl = (
  page:number = 1,
  sortBy:Sort = SORTS[0]
) => `https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}`
  + `&sort_by=${sortBy}`
  + `&page=${page}`;

export const getItemUrl = (movieId:string = "") =>
  `https://api.themoviedb.org/3/movie/${movieId}?api_key=${APIKEY}`;

export const getImageUrl = (
  imagePath:string = "/",
  width:ImageWidth = "w200"
) => `https://image.tmdb.org/t/p/${width}${imagePath}`;

