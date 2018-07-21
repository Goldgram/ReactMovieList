import * as React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import 'whatwg-fetch'
import { getItemUrl } from './api';
import { GenericViewController } from './generic-view-controller';
import { MovieData, MovieMatch } from './types';

export const ItemController = (props:RouteComponentProps<MovieMatch>) => {
  const { movieId } = props.match.params;

  return <GenericViewController<MovieData>
    url={getItemUrl(movieId)}
    viewFn={getItemView}
  />
}

export const getItemView = (data:MovieData) => {
  const { title } = data;
  return <div>
    <Link to="/">Back</Link>
    <div>{ title }</div>
  </div>;
}

