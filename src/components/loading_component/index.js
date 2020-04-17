import React from "react";
import { Spin } from "antd";

export class LoadingComponent extends React.PureComponent {
  render() {
    return this.props.loading ? (
      <div>
        <Spin />
      </div>
    ) : null;
  }
}
