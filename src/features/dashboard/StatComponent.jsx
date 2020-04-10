import React from "react";
import { Typography } from "@material-ui/core";

const StatComponent = ({ value, title }) => {
  return (
    <Typography>
      {title}: {value}
    </Typography>
  );
};

export default StatComponent;
