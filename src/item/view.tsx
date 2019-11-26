import * as React from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../api";
import { MovieData, } from "../types";
import { Ribbon } from "../common/ribbon";
import { Companies } from "./companies";
import { ImageWithLoading } from "../common/image-with-loading";

export const getItemView = (movieId:string = "") => (data:MovieData) => {
  const { title, release_date, vote_average = "-", overview, poster_path
    , production_companies = [], budget, runtime = "-", vote_count = "-"
  } = data;

  return <React.Fragment>
    <Ribbon>
      <Link to="/" className="padding-top-bottom-10">
        <i className="fa fa-chevron-left"/> BACK
      </Link>
      <div className="item-movie-id text-right">{ movieId }</div>
    </Ribbon>

    <div className="content-container item">
      { poster_path &&
        <div className="item-image">
          <ImageWithLoading
            src={getImageUrl(poster_path, "w400")}
            alt={`${title} poster`}
          />
        </div>
      }

      <div className="item-content">
        <div className="wide-font">{ title || "-" }</div>
        <div>Release Date: { release_date || "----/--/--" }</div>
        <div>Runtime: { runtime } min</div>
        <div>Vote Average: { vote_average } / 10</div>
        <div>Total Votes: { vote_count }</div>
        <div>Budget: { budget ? `$${budget}` : "-" }</div>
        <div>Overview:<br/>{ overview || "-" }</div>
        { production_companies &&
          <div>
            Production Companies:
            <Companies companies={production_companies}/>
          </div>
        }
      </div>
    </div>
  </React.Fragment>;
}
