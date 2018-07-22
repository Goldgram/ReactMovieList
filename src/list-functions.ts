import 'core-js/fn/array/find';
import { RouteComponentProps } from 'react-router-dom';
import { MovieMatch, OptionsType, LAYOUTS, SORTS, Layout, Sort } from './types';

const splitSearchString = (search:string):{[key:string]:string} =>
  search.substring(1).split('&').reduce((acc, s) => {
    const [key, value] = s.split('=');
    return key && value
      ? Object.assign(
          {[decodeURIComponent(key)]: decodeURIComponent(value)},
          acc
        )
      : acc;
  }, {});

export const findLayout = (layout:string) => LAYOUTS.find(l => l === layout);
export const findSort = (sort:string) => SORTS.find(s => s === sort);

export const getOptions = (
  props:RouteComponentProps<MovieMatch>
):OptionsType => {
  const { location } = props;
  const all = splitSearchString(location.search);
  return {
    page: all.page ? parseInt(all.page, 10) : undefined,
    layout: findLayout(all.layout),
    sort: findSort(all.sort)
  }
}

export const getLayoutIcon = (layout:Layout) => {
  switch(layout) {
    case 'list': return 'fa-th-list';
    case 'posters': return 'fa-file-image-o';
    case 'text-only': return 'fa-align-justify';
    default: return '';
  }
}

export const getLayoutText = (layout:Layout) => {
  switch(layout) {
    case 'list': return 'List';
    case 'posters': return 'Posters';
    case 'text-only': return 'Text Only';
    default: return '';
  }
}

export const getSortText = (sort:Sort) => {
  switch(sort) {
    case 'popularity.desc': return 'Popularity (Descending)';
    case 'popularity.asc': return 'Popularity (Ascending)'
    case 'release_date.desc': return 'Release Date (Descending)'
    case 'release_date.asc': return 'Release Date (Ascending)'
    case 'vote_average.desc': return 'Vote Average (Descending)'
    case 'vote_average.asc': return 'Vote Average (Ascending)'
    default: return '';
  }
}