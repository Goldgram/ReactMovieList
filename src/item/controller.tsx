import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { getItemUrl } from "../api";
import { GenericViewController } from "../common/generic-view-controller";
import { MovieData, MovieMatch } from "../types";
import { getItemView } from "./view";

export const ItemController = (props:RouteComponentProps<MovieMatch>) => {
  const { movieId } = props.match.params;
  return <GenericViewController<MovieData>
    url={getItemUrl(movieId)}
    viewFn={getItemView(movieId)}
  />
}
