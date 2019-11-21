import * as React from "react";
// import { LoadingIcon } from "./loading-icon";

interface PropTypes {
  src: string
  className?: string
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
  //   const { className = "", alt
  //   // , errorComp = null
  // } = this.props;
    const {
      // imageLoading
      // , imageError
      // ,
      src } = this.state;

    // const loadingClass = imageLoading ? "x-image-loading" : "";

    return <img
      // onLoad={this.onImageLoaded}
      // onError={this.onImageError}
      src={src}
      // alt={alt}
    />
    // return imageError ? errorComp
    //   : src &&
    //     <div className={`x-image-with-loading ${loadingClass} ${className}`}>
    //       {imageLoading && <LoadingIcon />}
    //       <img
    //         onLoad={this.onImageLoaded}
    //         onError={this.onImageError}
    //         src={src}
    //         alt={alt}
    //       />
    //     </div>;
  }
}