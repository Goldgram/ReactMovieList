import * as React from 'react';
import 'whatwg-fetch'
import 'core-js/fn/array/find';
import { Link, RouteComponentProps } from 'react-router-dom';
import { getListUrl } from './api';
import { GenericViewController } from './generic-view-controller';
import { MovieListData, MovieMatch, SORTS, Layout, LAYOUTS } from './types';
import { getOptions } from './list-functions';
import { Options } from './options';

export const ListController = (props:RouteComponentProps<MovieMatch>) => {
  const { page = 1, layout = LAYOUTS[0], sort = SORTS[0] } = getOptions(props);

  return <React.Fragment>
    <Options {...props}/>
    <GenericViewController<MovieListData>
      url={getListUrl(page, sort)}
      viewFn={getListView(layout)}
    />
  </React.Fragment>
}

const getListView = (layout:Layout) => (data:MovieListData) => {
  const { results = [] } = data;
  return <div>
    { layout }
    { results.map((result, i) => {
        const { title = '', id = '' } = result;
        return <Link to={`/${id}`} key={i}>
          <div >{ title }</div>
        </Link>;
      })
    }
  </div>
}

