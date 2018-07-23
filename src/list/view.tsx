import * as React from 'react';
import { Link } from 'react-router-dom';
import { MovieListData, Layout } from '../types';
import { ListItem } from './list-item';

export const getListView = (layout:Layout) => (data:MovieListData) => {
  const { results = [] } = data;
  return <div className={`content-container clearBothAfter layout-${layout}`}>
    { results.map((result, i) =>
        <Link to={`/${result.id || ''}`} key={i}>
          <ListItem item={result} layout={layout} />
        </Link>
    )}
  </div>
}
