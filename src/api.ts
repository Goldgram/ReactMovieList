const APIKEY = '' // API key not saved for obvious reasons

export const getListUrl = (page:number = 1) =>
  `https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}`
  + `&sort_by=popularity.desc`
  + `&page=${page}`;

export const getItemUrl = (movieId:string = '') =>
  `https://api.themoviedb.org/3/movie/${movieId}?api_key=${APIKEY}`;