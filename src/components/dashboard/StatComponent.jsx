import React from "react";
import ReactMinimalPieChart from "react-minimal-pie-chart";

const StatComponent = ({ value, title }) => {
    return (
        <ReactMinimalPieChart
            animate
            animationDuration={500}
            animationEasing="ease-out"
            background="#f2f2f2"
            cx={50}
            cy={50}
            data={[
                {
                    color: "#E38627",
                    title: "One",
                    value: value,
                },
            ]}
            label
            labelPosition={0}
            labelStyle={{
                fill: "#121212",
                fontFamily: "sans-serif",
                fontSize: "15px",
            }}
            lengthAngle={360}
            lineWidth={100}
            paddingAngle={0}
            radius={50}
            rounded={false}
            startAngle={0}
            totalValue={100}
            style={{
                height: "80px",
            }}
            viewBoxSize={[100, 100]}
        />
    );
};

export default StatComponent;
