import * as React from 'react';
import { Link } from 'react-router-dom';

// interface HeaderProps {
//   movieId: string
// }

export class Header extends React.Component {
  public render() {
    // const { movieId = '' } = this.props;
    return <div>
      <Link to="/">Top Movies</Link>
      {/* { movieId ? ` / ${movieId}`: ''} */}
    </div>;
  }
}
