import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "../components/charts/Chart";
import Grid from "../components/layouts/Grid";
import GridHeader from "../components/layouts/GridHeader";
import { Row } from "../utils/main.styled";

interface GraphicProps {}

const Graphic: React.FC<GraphicProps> = () => {
  useEffect(() => {
    axios
      .get("http://localhost:3030/data/chart")
      .then((respon) => set_datasets(respon.data.data));
  }, []);
  const [datasets, set_datasets] = useState<Array<any>>([]);
  const [model, set_model] = useState<"bar" | "pie" | "bubble" | "line">("bar");
  console.log(datasets);
  return (
    <>
      <Grid title="Tabel" headercolor="white"></Grid>
      <Row
        flex
        display="flex"
        flexdir="column"
        gap={15}
        fixing_width
        fixing_height
        ml={2}
      >
        <GridHeader title="Chart" bgcolor="white">
          {datasets && (
            <Chart
              type={model}
              datasets={datasets}
              whatyouwannashow={[
                { id: "sold", ket: "SOLD" },
                { id: "broken", ket: "BROKEN" },
                { id: "return", ket: "RETURN" },
              ]}
            />
          )}
          <Row display="flex" flexdir="row" gap={10}>
            <button onClick={() => set_model("bar")}>BAR</button>
            <button onClick={() => set_model("line")}>LINE</button>
            <button onClick={() => set_model("pie")}>PIE</button>
            <button onClick={() => set_model("bubble")}>BUBBLE</button>
          </Row>
        </GridHeader>
      </Row>
    </>
  );
};
export default Graphic;
