import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { getListUrl } from '../api';
import { GenericViewController } from '../common/generic-view-controller';
import { MovieListData, MovieMatch, SORTS, LAYOUTS } from '../types';
import { getOptions } from './functions';
import { Options } from './options';
import { getListView } from './view';

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
