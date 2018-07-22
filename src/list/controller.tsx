import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { getListUrl, getImageUrl } from '../api';
import { GenericViewController } from '../common/generic-view-controller';
import { MovieListData, MovieMatch, SORTS, Layout, LAYOUTS, MovieListResult
  } from '../types';
import { getOptions } from './functions';
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
  return <div className="content-container padding-top-bottom-10">
    { results.map((result, i) =>
        <Link to={`/${result.id || ''}`} key={i}>
          <ListItem item={result} layout={layout} />
        </Link>
    )}
  </div>
}

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
      className="layout-posters"
      src={getImageUrl(poster_path, 'w200')}
      title={title}
      alt={`${title} poster`}
    />
  }

  return <div className="flex-between primary-bg layout-list">
    { backdrop_path && <img
      src={getImageUrl(backdrop_path, 'w200')}
      alt={`${title} image`}
    /> }
    <div className="list-item-content">
      <div className="wide-font padding-bottom-10">{ title || '-' }</div>
      <div className="padding-bottom-10">
        Release Date: <span>{ release_date || '----/--/--'}</span>
      </div>
      <div>Vote Average: <span>{ vote_average } / 10</span></div>
    </div>
    <div className="padding-right-20">
      <i className="fa fa-info-circle"/> MORE
    </div>
  </div>;
}

