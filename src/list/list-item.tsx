import * as React from 'react';
import { getImageUrl } from '../api';
import { Layout, MovieListResult } from '../types';

interface ListItemProps {
  item: MovieListResult
  layout: Layout
}

export const ListItem = (props:ListItemProps) => {
  const { item, layout } = props;
  const {
    title, release_date, vote_average = '-', backdrop_path, poster_path
  } = item;

  if (layout === 'posters') {
    return <img
      className="list-item"
      src={getImageUrl(poster_path, 'w200')}
      title={title}
      alt={`${title} poster`}
    />
  }

  return <div className="flex-between primary-bg list-item">
    { backdrop_path &&
      <img
        src={getImageUrl(backdrop_path, 'w200')}
        alt={`${title} image`}
      />
    }
    <div className="list-item-content">
      <div className="wide-font padding-bottom-10">
        { title || '-' }
      </div>
      <div className="padding-bottom-10">
        Release Date: { release_date || '----/--/--'}
      </div>
      <div>
        Vote Average: { vote_average } / 10
      </div>
    </div>
    <div className="more-tag">
      <i className="fa fa-info-circle"/> MORE INFO
    </div>
  </div>;
}

