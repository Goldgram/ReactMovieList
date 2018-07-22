import * as React from 'react';
import 'whatwg-fetch'
import 'core-js/fn/array/find';
import { RouteComponentProps } from 'react-router-dom';
import { Layout, LAYOUTS
  // , Sort, SORTS
  , OptionsType, MovieMatch } from './types';
import { getOptions } from './list-functions';

export class Options extends React.Component<RouteComponentProps<MovieMatch>> {

  onChangeSort = (event:any) => {
    this.changeOption({ sort: event.target.value });
  }

  onChangePage = (page:number) => () => this.changeOption({ page });

  onChangeLayout = (layout:Layout) => () => this.changeOption({ layout });

  changeOption = (newOptions:Partial<OptionsType>)=> {
    const { history } = this.props;
    const { page, layout, sort } = getOptions(this.props);

    const newPage = newOptions.page || page;
    const newLayout = newOptions.layout || layout;
    const newSort = newOptions.sort || sort;

    if (history) {
      const search = `?${[
        newPage ? `page=${newPage}` : ``,
        newLayout ? `layout=${newLayout}` : ``,
        newSort ? `page=${newSort}` : ``,
      ].filter(s => s).join('&')}`;

      history.push({ pathname: '/', search });
    }
  };

  render() {
    const {
      page = 1, layout = LAYOUTS[0] // , sort = SORTS[0]
    } = getOptions(this.props);

    // addribbon class
    return <div>

      <select onChange={this.onChangeSort}>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>

      <div>
        { page > 1 && <div onClick={this.onChangePage(page - 1)}>prev</div> }
        <div>page: { page }</div>
        <div onClick={this.onChangePage(page + 1)}>next</div>
      </div>

      { LAYOUTS.map((l:Layout, index:number) =>
          <button
            key={index}
            className={layout === l ? 'selected' : ''}
            onClick={this.onChangeLayout(l)}
          >
            { l } icon
          </button>
      )}

    </div>
  }
}
