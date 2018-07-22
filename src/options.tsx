import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Layout, LAYOUTS, Sort, SORTS, OptionsType, MovieMatch } from './types';
import { getOptions, findSort, getLayoutIcon, getSortText
  } from './list-functions';

export class Options extends React.Component<RouteComponentProps<MovieMatch>> {

  onChangeSort = (event:React.ChangeEvent<HTMLSelectElement>) => {
    this.changeOption({ sort: findSort(event.target.value) });
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
      const search = [
        newPage ? `page=${newPage}` : ``,
        newLayout ? `layout=${newLayout}` : ``,
        newSort ? `sort=${newSort}` : ``,
      ].filter(s => s).join('&');

      history.push({ pathname: '/', search: search && `?${search}` });
    }
  };

  render() {
    const {
      page = 1, layout = LAYOUTS[0], sort = SORTS[0]
    } = getOptions(this.props);

    return <div> {/* ribbon class */}
      <select onChange={this.onChangeSort}>
        { SORTS.map((s:Sort, index:number) =>
          <option key={index} value={s} selected={s === sort}>
            {getSortText(s)}
          </option>
        )}
      </select>

      <div>
        { page > 1 && <div onClick={this.onChangePage(page - 1)}>prev</div> }
        <div>page: { page }</div>
        <div onClick={this.onChangePage(page + 1)}>next</div>
      </div>

      { LAYOUTS.map((l:Layout, index:number) =>
          <button
            key={index}
            className={l === layout? 'selected' : ''}
            onClick={this.onChangeLayout(l)}
          >
            { getLayoutIcon(l) }
          </button>
      )}

    </div>
  }
}
