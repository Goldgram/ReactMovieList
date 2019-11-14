import * as React from 'react';

interface PropsTypes<T> {
  url: string
  viewFn: (t:T) => JSX.Element
}

interface State<T> {
  loading: boolean
  error: boolean
  data: T | undefined
}

const LOADING = <>
  <div className="loading-bg"/>
  <div className="text-center loading-icon">
    <i className="fa fa-cog fa-spin fa-3x" />
  </div>
</>;

const ERROR = <div className="padding-top-bottom-10 text-center">
  Oops! Something went wrong! Please try again later
</div>;

const NORESULTS = <div className="padding-top-bottom-10 text-center">
  No Results
</div>;

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
        .then(this.handleFetchError)
        .then((r:Response) => r && r.json())
        .then((data:T) => this.setState({ loading: false, data }))
        .catch(this.setError);
    }
  }

  handleFetchError(r:Response) {
    if (!r.ok) {
      this.setError();
    }
    return r;
  }

  setError = () => {
    this.setState({ loading: false, error: true });
  }

  render() {
    const { viewFn } = this.props;
    const { loading, error, data } = this.state;

    return <div className="pos-rel">
      { loading && LOADING }
      { error ? ERROR
        : data ? viewFn(data)
          : loading ? undefined
            : NORESULTS
      }
    </div>;
  }
}

