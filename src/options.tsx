import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Layout, LAYOUTS, Sort, SORTS, OptionsType, MovieMatch } from './types';
import { getOptions, findSort, getLayoutIcon, getSortText, getLayoutText
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

    return <div className="primary-bg">
      <div className="content-container flex padding-top-bottom-10">

        <select onChange={this.onChangeSort}>
          { SORTS.map((s:Sort, index:number) =>
            <option key={index} value={s} selected={s === sort}>
              {getSortText(s)}
            </option>
          )}
        </select>

        <div className="flex">
          <div
            className={`no-select-click ${page < 2 ? 'visibility-hidden' : ''}`}
            onClick={this.onChangePage(page - 1)}
          >
            <i className="fa fa-chevron-left"/> PREV
          </div>
          <div className="page-text">
            PAGE: { page }
          </div>
          <div
            className="no-select-click"
            onClick={this.onChangePage(page + 1)}
          >
            NEXT <i className="fa fa-chevron-right"/>
          </div>
        </div>

        <div className="flex">
          { LAYOUTS.map((l:Layout, index:number) => {
              const hightlight = l === layout? 'highlight-c' : ''
              const c = `no-select-click layout-icon ${hightlight}`;
              return <div
                key={index}
                className={c}
                onClick={this.onChangeLayout(l)}
                title={getLayoutText(l)}
              >
                <i className={`fa ${getLayoutIcon(l)}`} />
              </div>
            }
          )}
        </div>

      </div>
    </div>
  }
}
