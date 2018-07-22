import * as React from 'react';
import 'whatwg-fetch'
import loadingIcon from './resources/loading-icon.gif';

interface PropsTypes<T> {
  url: string
  viewFn: (t:T) => JSX.Element
}

interface State<T> {
  loading: boolean
  error: boolean
  data: T | undefined
}

export class GenericViewController<T>
  extends React.Component<PropsTypes<T>, State<T>> {

  constructor(props:PropsTypes<T>, context:any) {
    super(props, context);
    this.state = {
      loading: false,
      error: false,
      data: undefined
    };
  }

  componentDidMount() {
    this.getData(this.props.url);
  }

  componentWillReceiveProps(newProps:PropsTypes<T>) {
    if (this.props.url !== newProps.url) {
      this.getData(newProps.url);
    }
  }

  getData = (url:string) => {
    if (url) {
      this.setState({ loading: true, error: false });
      fetch(url)
        .catch(this.catchError)
        .then((r:Response) => r && r.json())
        .then((data:T) => {
          this.setState({ loading: false, error: false, data });
        });
    }
  }

  catchError = () => this.setState({ loading: false, error: true });

  render() {
    const { viewFn } = this.props;
    const { loading, error, data } = this.state;

    return loading
      ? <img src={loadingIcon} alt="loading" />
      : error
        ? <div>Oops! Something went wrong! Please try again later</div>
        : data
          ? viewFn(data)
          : <div>No Result</div>;
  }
}

