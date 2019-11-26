import * as React from "react";
import { getImageUrl } from "../api";
import { Layout, MovieListResult } from "../types";
import { ImageWithLoading } from "src/common/image-with-loading";

interface ListItemProps {
  item: MovieListResult
  layout: Layout
}

export const ListItem = (props:ListItemProps) => {
  const { item, layout } = props;
  const {
    title, release_date, vote_average = "-", backdrop_path, poster_path
  } = item;

  const errorComp = <div className="list-item">
    <div className="fallback-poster flex-center text-center">{title}</div>
  </div>

  if (layout === "posters") {
    return poster_path
      ? <ImageWithLoading
          className="list-item"
          src={getImageUrl(poster_path, "w200")}
          alt={`${title} poster`}
          errorComp={errorComp}
        />
      : errorComp;
  }

  return <div className="flex-between primary-bg list-item">
    { backdrop_path &&
      <ImageWithLoading
        src={getImageUrl(backdrop_path, "w200")}
        alt={`${title} image`}
      />
    }
    <div className="list-item-content">
      <div className="wide-font padding-bottom-10">
        { title || "-" }
      </div>
      <div className="padding-bottom-10">
        Release Date: { release_date || "----/--/--"}
      </div>
      <div>
        Vote Average: { vote_average } / 10
      </div>
    </div>
    <div className="more-tag">
      <i className="fa fa-info-circle"/> MORE INFO
    </div>
  </div>;
}

