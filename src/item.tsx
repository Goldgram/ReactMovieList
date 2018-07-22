import * as React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { getItemUrl, getImageUrl } from './api';
import { GenericViewController } from './generic-view-controller';
import { MovieData, MovieMatch, ProductionCompany } from './types';
import { Ribbon } from './ribbon';

export const ItemController = (props:RouteComponentProps<MovieMatch>) => {
  const { movieId } = props.match.params;

  return <GenericViewController<MovieData>
    url={getItemUrl(movieId)}
    viewFn={getItemView(movieId)}
  />
}

export const getItemView = (movieId:string = '') => (data:MovieData) => {
  const { title, release_date, vote_average = '-', overview, poster_path
    , production_companies = [], budget, runtime = '-', vote_count = '-'
  } = data;

  return <React.Fragment>
    <Ribbon>
      <Link to="/">
        <i className="fa fa-chevron-left"/> BACK
      </Link>
      <div>{ movieId }</div>
    </Ribbon>

    <div className="content-container padding-top-bottom-20 flex-start">
      { poster_path && <img
        src={getImageUrl(poster_path, 'w400')}
        alt={`${title} poster`}
      /> }

      <div className="padding-left-20 item-content">
        <div className="wide-font">{ title || '-' }</div>
        <div><b>Release Date:</b> { release_date || '----/--/--' }</div>
        <div>Runtime: { runtime } min</div>
        <div>Vote Average: { vote_average } / 10</div>
        <div>Total Votes: { vote_count }</div>
        <div>Budget: { budget ? `$${budget}` : '-' }</div>
        <div>Overview:<br/>{ overview || '-' }</div>
        { production_companies && <div>
          Production Companies:
          <Companies companies={production_companies}/>
        </div> }
      </div>
    </div>
  </React.Fragment>;
}

interface CompaniesProps {
  companies: ProductionCompany[]
}

const Companies = ({ companies = [] }:CompaniesProps) => {
  return <div className="clearBothAfter">
    { companies.length
      ? companies.map((company, i) => {
        const { name, logo_path } = company;
          return <div key={i} className="content-bg primary-c company-logo">
            <img
              src={getImageUrl(logo_path,'w200')}
              title={name}
              alt={name}
            />
          </div>;
        })
      : '-'
    }
  </div>;
}

