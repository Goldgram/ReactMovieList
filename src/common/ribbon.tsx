import * as React from 'react';

interface Props {
  children?: JSX.Element | JSX.Element[]
}

export const Ribbon = (props:Props) => <div className="primary-bg">
  <div className="content-container ribbon">
    { props.children }
  </div>
</div>
