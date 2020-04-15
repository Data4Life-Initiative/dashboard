import React from "react";

import "./App.css";
import { Button, DatePicker, Table } from "antd";
import "./App.css";
import { dataSource, columns } from "./dataSource";
import { LayoutComponent } from "./components/shared";
function App() {
  return (
    <LayoutComponent>
      <DatePicker></DatePicker> <Button type="primary">Button</Button>
      <Table dataSource={dataSource} columns={columns} />;
    </LayoutComponent>
  );
}

export default App;
