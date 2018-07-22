import * as React from 'react';
import 'whatwg-fetch'
import { Link } from 'react-router-dom';
import { getListUrl } from './api';
import { GenericViewController } from './generic-view-controller';
import { MovieListData } from './types';

type ListStyle = 'list' | 'images' | 'titles';
const LISTSTYLES:ListStyle[] = ['list', 'images', 'titles'];

interface State {
  page: number
  listStyle: ListStyle
}

const defaultState:State = {
  page: 1,
  listStyle: LISTSTYLES[0]
}

export class ListController extends React.Component<{}, State> {
  constructor(props:any, context:any) {
    super(props, context);
    this.state = defaultState;
  }

  getListStyleButton = (listStyle:ListStyle, index:number) =>
    <button
      key={index}
      className={this.state.listStyle === listStyle ? 'selected' : ''}
      onClick={this.toggleListStyle(listStyle)}
    >
      { listStyle } icon
    </button>


  toggleListStyle = (listStyle:ListStyle) => () => this.setState({ listStyle });

  onChangePage = (page:number) => () => this.setState({ page });

  render() {
    const { page } = this.state;

    return <React.Fragment>
      { LISTSTYLES.map(this.getListStyleButton) }

      { page > 1 && <div onClick={this.onChangePage(page - 1)}>prev</div> }
      <div>page: { page }</div>
      <div onClick={this.onChangePage(page + 1)}>next</div>

      <GenericViewController<MovieListData>
        url={getListUrl(page)}
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

