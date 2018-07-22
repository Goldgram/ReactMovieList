// common

interface MovieBase {
  adult:             boolean
  backdrop_path:     string
  id:                number
  original_language: string
  original_title:    string
  overview:          string
  popularity:        number
  poster_path:       string
  release_date:      string
  title:             string
  video:             boolean
  vote_average:      number
  vote_count:        number
}

export interface MovieMatch {
  movieId: string
}

export type ImageWidth = 'w200' | 'w400';

// list

export type Layout = 'list' | 'posters' | 'textOnly';
export const LAYOUTS:Layout[] = ['list', 'posters', 'textOnly'];

export type Sort = 'popularity.desc' | 'popularity.asc'
  | 'release_date.desc' | 'release_date.asc'
  | 'vote_average.desc' | 'vote_average.asc';
export const SORTS:Sort[] = [
  'popularity.desc', 'popularity.asc'
  , 'release_date.desc', 'release_date.asc'
  , 'vote_average.desc', 'vote_average.asc'
];

export interface OptionsType {
  page: number | undefined
  layout: Layout | undefined
  sort: Sort | undefined
}

export interface MovieListResult extends MovieBase {
  genre_ids: number[]
}

export interface MovieListData {
  page:          number
  results:       MovieListResult[]
  total_pages:   number
  total_results: number
}

// item

export interface MovieData extends MovieBase {
  belongs_to_collection: Collection
  budget: number
  genres: Genre[]
  homepage: string
  imdb_id: string
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  revenue: number
  runtime: number
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
}

interface Collection {
  backdrop_path: string
  id:            number
  name:          string
  poster_path:   string
}

interface Genre {
  id:   number
  name: string
}

interface ProductionCompany {
  id:             number
  logo_path:      string
  name:           string
  origin_country: string
}

interface ProductionCountry {
  iso_3166_1: string
  name:       string
}

interface SpokenLanguage {
  iso_639_1: string
  name:      string
}
