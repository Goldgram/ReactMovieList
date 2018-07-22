import * as React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { getItemUrl, getImageUrl } from './api';
import { GenericViewController } from './generic-view-controller';
import { MovieData, MovieMatch } from './types';

export const ItemController = (props:RouteComponentProps<MovieMatch>) => {
  const { movieId } = props.match.params;

  return <GenericViewController<MovieData>
    url={getItemUrl(movieId)}
    viewFn={getItemView(movieId)}
  />
}

export const getItemView = (movieId:string = '') => (data:MovieData) => {
  const { title, release_date, vote_average = '-', overview, poster_path,
    production_companies = []
  } = data;

  return <div>
    <div className="primary-bg">
      <div className="content-container flex padding-top-bottom-10">
        <Link to="/">
          <i className="fa fa-chevron-left"/> BACK
        </Link>
        <div>{ movieId }</div>
      </div>
    </div>

    <div>Title: { title || 'No title found' }</div>

    { poster_path && <img
      src={getImageUrl(poster_path, 'w400')}
      alt={`${title} poster`}
    /> }

    <div>Release Date: { release_date || 'No release date found' }</div>

    <div>Vote Average: { vote_average }/10</div>

    <div>Overview: { overview || 'No overview found' }</div>

    <div>
      Production Companies:
      { production_companies.length
        ? production_companies.map((company, i) => {
          const { name, logo_path } = company;
            return <div key={i} className="content-bg">
              { logo_path && <img
                src={getImageUrl(logo_path,'w200')}
                title={name}
                alt={`${name} logo`}
              /> }
            </div>;
          })
        : 'No production companies found'
      }
    </div>
  </div>;
}
