import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Ribbon } from '../common/ribbon';
import { Layout, LAYOUTS, SORTS, OptionsType, MovieMatch
  } from '../types';
import { getOptions, findSort, getLayoutIcon, getSortText, getLayoutText
  } from './functions';

export class Options extends React.Component<RouteComponentProps<MovieMatch>> {

  onChangeSort = (e:React.ChangeEvent<HTMLSelectElement>) => {
    this.changeOption({ sort: findSort(e.target.value) });
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
        newPage && `page=${newPage}`,
        newLayout && `layout=${newLayout}`,
        newSort && `sort=${newSort}`,
      ].filter(s => s).join('&');

      history.push({ pathname: '/', search: search && `?${search}` });
    }
  };

  render() {
    const {
      page = 1, layout = LAYOUTS[0], sort = SORTS[0]
    } = getOptions(this.props);

    return <Ribbon>
      <div className="padding-top-bottom-10">
        <select onChange={this.onChangeSort}>
          { SORTS.map((s, i) =>
              <option key={i} value={s} selected={s === sort}>
                {getSortText(s)}
              </option>
          )}
        </select>
      </div>

      <div className="pagination padding-top-bottom-10">
        <div
          className={`no-select-click ${page < 2 ? 'visibility-hidden' : ''}`}
          onClick={this.onChangePage(page - 1)}
        >
          <i className="fa fa-chevron-left"/> PREV
        </div>
        <div className="padding-left-right-30 text-center">PAGE: { page }</div>
        <div
          className="no-select-click"
          onClick={this.onChangePage(page + 1)}
        >
          NEXT <i className="fa fa-chevron-right"/>
        </div>
      </div>

      <div className="layouts padding-top-bottom-10">
        { LAYOUTS.map((l, i) => {
            const hightlight = l === layout? 'highlight-c' : ''
            return <div
              key={i}
              className={`no-select-click layout-icon ${hightlight}`}
              onClick={this.onChangeLayout(l)}
              title={getLayoutText(l)}
            >
              <i className={`fa ${getLayoutIcon(l)}`} />
            </div>
          }
        )}
      </div>
    </Ribbon>
  }
}
