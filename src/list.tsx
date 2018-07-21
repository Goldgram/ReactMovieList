import * as React from 'react';
import 'whatwg-fetch'
import { Link } from 'react-router-dom';
import { getListUrl } from './api';
import { GenericViewController } from './generic-view-controller';
import { MovieListData } from './types';

export const ListController = () => {
  return <GenericViewController<MovieListData>
    url={getListUrl()}
    viewFn={getListView}
  />
}

export const getListView = (data:MovieListData) => {
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

