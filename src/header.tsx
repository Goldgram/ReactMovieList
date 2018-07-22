import * as React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => <div className="content-container">
  <Link to="/">
    <div className="highlight-c padding-top-bottom-10 logo">
      <i className="fa fa-film padding-right-10" /> Top Movies
    </div>
  </Link>
</div>;
