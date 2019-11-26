import * as React from "react";
import { LoadingIcon } from "./loading-icon";

interface PropTypes {
  src: string
  alt?: string
  errorComp?: JSX.Element
}

interface StateType {
  imageLoading: boolean;
  imageError: boolean;
  src: string;
}

export class ImageWithLoading extends React.Component<PropTypes, StateType> {
  static displayName = "ImageWithLoading";

  static getDerivedStateFromProps(nextProps: PropTypes, prevState: StateType) {
    const { src } = nextProps;
    const prevSrc =  prevState && prevState.src;
    if (prevSrc !== src) {
      return {
        imageLoading: true,
        mageError: false,
        src
      };
    }
    return null;
  }

  onImageLoaded = () => {
    this.setState({ imageLoading: false, imageError: false });
  };

  onImageError = () => {
    this.setState({ imageLoading: false, imageError: true });
  };

  render() {
    const { alt, errorComp = null } = this.props;
    const { imageLoading, imageError, src } = this.state;

    const loadingClass = imageLoading ? "is-loading" : "";

    return imageError ? errorComp
      : src &&
        <div className={`image-with-loading pos-rel ${loadingClass}`}>
          <img
            onLoad={this.onImageLoaded}
            onError={this.onImageError}
            src={src}
            alt={alt}
          />
          {imageLoading && <LoadingIcon />}
        </div>;
  }
}