import React from "react";
import {Typography} from "@material-ui/core";

const StatComponent = ({value, title}) => {
    return (
        <Typography style={{
            borderRadius: "50%",
            border: "1px solid black",
            width: "100px",
            height: "100px",
            lineHeight: "100px",
            textAlign: "center",
        }}>
            {value}
        </Typography>
    );
};

export default StatComponent;
