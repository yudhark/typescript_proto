import React, { useEffect, useState } from "react";
import { Bar, Line, Pie, Bubble } from "react-chartjs-2";
import styled from "styled-components";

interface ChartProps {
  type: "bar" | "pie" | "bubble" | "line";
  datasets: Array<any>;
  whatyouwannashow?: Array<{ id: string; ket: string }>;
}

const generate_hex_color = (length: number) => {
  let hex_array = [];
  let hex_string = "";
  for (let i = 0; i < length; i++) {
    hex_string =
      "#" +
      (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6) +
      "7b";
    hex_array.push(hex_string);
  }
  return hex_array;
};

const Chart: React.FC<ChartProps> = ({
  type: type_from_props,
  datasets: datasets_from_props,
  whatyouwannashow: label_per_items,
}) => {
  // type state handler
  useEffect(() => {
    set_type_state(type_from_props);
  }, [type_from_props]);

  const [type_state, set_type_state] = useState<
    "bar" | "pie" | "bubble" | "line"
  >("bar");

  // labels state handler
  useEffect(() => {
    set_labels_state(datasets_from_props.map((item) => item.id));
  }, [datasets_from_props]);

  const [labels_state, set_labels_state] = useState<Array<any>>(
    datasets_from_props ? datasets_from_props.map((item) => item.id) : []
  );

  // label per item handler
  useEffect(() => {
    label_per_items && set_key_state(label_per_items);
  }, [label_per_items]);
  const [key_state, set_key_state] = useState<
    Array<{ id: string; ket: string }>
  >(label_per_items ? label_per_items : []);

  // datasets state handler
  useEffect(() => {
    let current_data: Array<any> = [];
    key_state.map((item, x) =>
      current_data.push({
        label: item.ket,
        data: datasets_from_props.map((row) => row[item.id]),
        backgroundColor: generate_hex_color(key_state.length)[x],
        borderColor:
          type_state === "line"
            ? generate_hex_color(key_state.length)[x]
            : type_state === "pie"
            ? "rgba(255,255,255,0.2)"
            : false,
        fill: type_state === "line" ? true : false,
        tension: 0.4,
        borderWidth:
          type_state === "line" ? 2 : type_state === "bar" ? false : 1,
        parsing: { y: item.id },
      })
    );
    set_real_data(current_data);
  }, [datasets_from_props, key_state, type_state]);

  const [real_data, set_real_data] = useState<
    Array<{
      label: string;
      data: Array<any>;
      backgroundColor: any;
      borderColor: any;
      fill: boolean;
      tension: number;
      borderWidth: number;
      parsing: { y: string };
    }>
  >([]);
  const options = {
    maintainAspectRatio: false,
  };

  return (
    <ChartBox>
      {type_state === "bar" ? (
        <Bar
          data={{ labels: labels_state, datasets: real_data }}
          options={options}
        />
      ) : type_state === "pie" ? (
        <Pie
          data={{ labels: labels_state, datasets: real_data }}
          options={options}
        />
      ) : type_state === "bubble" ? (
        <Bubble
          data={{ labels: labels_state, datasets: real_data }}
          options={options}
        />
      ) : (
        <Line
          data={{ labels: labels_state, datasets: real_data }}
          options={options}
        />
      )}
      {/* <Line data={{labels: labels_state, datasets: [{label: "a", data: real_data}]}}/> */}
    </ChartBox>
  );
};
export default Chart;

const ChartBox = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  height: 100%;
  display: flex;
  flex-direction: row;
  gap: 5px;
`;
