import React from "react";
import { Button } from "antd";
import { LayoutComponent } from "../../components/shared";

export class NewsComponent extends React.PureComponent {
  render() {
    return (
      <LayoutComponent>
        <div>
          <Button onClick={this.props.getNews}>Press to see news</Button>
        </div>
      </LayoutComponent>
    );
  }
}
