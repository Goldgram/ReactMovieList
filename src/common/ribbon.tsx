import * as React from "react";

interface Props {
  children?: React.ReactNode
}

export const Ribbon = (props:Props) => <div className="primary-bg">
  <div className="content-container ribbon">
    { props.children }
  </div>
</div>
