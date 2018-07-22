import * as React from 'react';
import 'whatwg-fetch'
import { Link } from 'react-router-dom';
import { getListUrl } from './api';
import { GenericViewController } from './generic-view-controller';
import { MovieListData, Layout, SortType } from './types';

const LAYOUTS:Layout[] = ['list', 'images', 'titles'];
const SORTTYPES:SortType[] = ['popularity.desc', 'popularity.asc'];

interface State {
  page: number
  layout: Layout
  sort: SortType
}

const defaultState:State = {
  page: 1,
  layout: LAYOUTS[0],
  sort: SORTTYPES[0]
}

export class ListController extends React.Component<{}, State> {
  constructor(props:any, context:any) {
    super(props, context);
    this.state = defaultState;
  }

  getLayoutButton = (layout:Layout, index:number) =>
    <button
      key={index}
      className={this.state.layout === layout ? 'selected' : ''}
      onClick={this.onChangeLayout(layout)}
    >
      { layout } icon
    </button>


  onChangeLayout = (layout:Layout) => () => this.setState({ layout });

  onChangePage = (page:number) => () => this.setState({ page });

  render() {
    const { page, sort } = this.state;

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

