import * as React from 'react';
import 'whatwg-fetch'
import 'core-js/fn/array/find';
import { Link, RouteComponentProps } from 'react-router-dom';
import { getListUrl } from './api';
import { GenericViewController } from './generic-view-controller';
import { MovieListData, Layout, Sort, MovieMatch } from './types';

const LAYOUTS:Layout[] = ['list', 'images', 'titles'];
const SORTS:Sort[] = ['popularity.desc', 'popularity.asc'];

interface Options {
  page: number
  layout: Layout
  sort: Sort
}

const defaultOptions:Options = {
  page: 1,
  layout: LAYOUTS[0],
  sort: SORTS[0]
}

export const splitSearchString = (search:string):{[key:string]:string} =>
  search.substring(1).split('&').reduce((acc, s) => {
    const [key, value] = s.split('=');
    return key && value
      ? Object.assign(
          {[decodeURIComponent(key)]: decodeURIComponent(value)},
          acc
        )
      : acc;
  }, {});


export class ListController
  extends React.Component<RouteComponentProps<MovieMatch>> {

  getOptions = ():Options => {
    const { location } = this.props;
    if (!location || !location.search) {
      return defaultOptions;
    }

    const all = splitSearchString(location.search);
    const page =  parseInt(all.page, 10) || defaultOptions.page;
    const layout = LAYOUTS.find(l => l === all.layout) || defaultOptions.layout;
    const sort = SORTS.find(l => l === all.sort) || defaultOptions.sort;

    return { page, layout, sort }
  }

  getLayoutButton = (l:Layout, index:number) => {
    const { layout } = this.getOptions() || defaultOptions;
    return <button
      key={index}
      className={layout === l ? 'selected' : ''}
      onClick={this.onChangeLayout(l)}
    >
      { l } icon
    </button>
  }

  onChangeLayout = (layout:Layout) => () => this.changeOption({ layout });

  onChangePage = (page:number) => () => this.changeOption({ page });

  changeOption = (newOptions:Partial<Options>)=> {
    const { history } = this.props;
    const { page, layout, sort } = this.getOptions();
    if (history) {
      history.push({
        pathname: '/',
        search: `?page=${newOptions.page || page}`
          + `&layout=${newOptions.layout || layout}`
          + `&sort=${newOptions.sort || sort}`
      });
    }
  };

  render() {
    const { page, sort } = this.getOptions();

    return <React.Fragment>
      { LAYOUTS.map(this.getLayoutButton) }

      { page > 1 && <div onClick={this.onChangePage(page - 1)}>prev</div> }
      <div>page: { page }</div>
      <div onClick={this.onChangePage(page + 1)}>next</div>

      <GenericViewController<MovieListData>
        url={getListUrl(page, sort)}
        viewFn={getListView}
      />

    </React.Fragment>
  }
}

const getListView = (data:MovieListData) => {
  const { results = [] } = data;
  return <div>
    { results.map((result, i) => {
        const { title = '', id = '' } = result;
        return <Link to={`/${id}`} key={i}>
          <div >{ title }</div>
        </Link>;
      })
    }
  </div>
}

