import React, { useState } from "react";
import SideBar from "./components/SideBar";
import Graphic from "./Container/Graphic";
import Home from "./Container/Home";
// import Home from "./Container/Home";
import { BodyPanel, Column, Container, HeaderPanel } from "./utils/main.styled";

function App() {
  const topbarheight = 44;
  const [url, set_url] = useState<string>("home");
  const sidebar_handler = (url: string) => {
    set_url(url);
  };
  return (
    <Container>
      <HeaderPanel height={topbarheight} bgcolor="#fff"></HeaderPanel>
      <BodyPanel topbarheight={topbarheight}>
        <Column
          pt={15}
          pb={10}
          pl={10}
          pr={10}
          fixing_height
          display="flex"
          flexdir="row"
          gap={17}
        >
          <SideBar bgcolor="white" enablefixedmenu menufunc={sidebar_handler} />
          {url === "chart" ? <Graphic /> : <Home />}
        </Column>
      </BodyPanel>
    </Container>
  );
}

export default App;
