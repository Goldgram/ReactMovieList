import { RouteComponentProps } from 'react-router-dom';
import { MovieMatch, OptionsType, LAYOUTS, SORTS } from './types';

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

export const getOptions = (
  props:RouteComponentProps<MovieMatch>
):OptionsType => {
  const { location } = props;
  const all = splitSearchString(location.search);
  return {
    page: all.page ? parseInt(all.page, 10) : undefined,
    layout: LAYOUTS.find(l => l === all.layout),
    sort: SORTS.find(l => l === all.sort)
  }
}
