import React from "react";
import styled from "styled-components";

interface GridProps {
  title?: string;
  headercolor?: string;
}

const Grid: React.FC<GridProps> = ({
  title,
  headercolor,
  children,
}) => {
  return (
    <Wrapper>
      <InnerWrapper>
        {title && (
          <Row bgcolor={headercolor ? headercolor : "orange"}>
            <TitleBox>{title}</TitleBox>
          </Row>
        )}
        <Row autoscroll flex display="flex" flexdir="column">
          {children}
        </Row>
      </InnerWrapper>
    </Wrapper>
  );
};
export default Grid;

const Wrapper = styled.div`
  width: 240px;
  background: white;
  display: relative;
  border-radius: 4px;
  box-shadow: 1px 1px 3px 1px #3232323b;
`;
const InnerWrapper = styled.div`
  margin: 5px;
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Row = styled.div<{
  flex?: boolean;
  autoscroll?: boolean;
  bgcolor?: string;
  display?: string;
  flexdir?: "column" | "row";
}>`
  ${(props) => props.autoscroll && "overflow-y: auto;"}
  ${(props) => props.flex && "flex: 1;"}
  ${(props) => props.bgcolor && "background: " + props.bgcolor + ";"}
  ${(props) => props.display && "display: " + props.display + ";"}
  ${(props) => props.flexdir && "flex-direction: " + props.flexdir + ";"}
`;
const TitleBox = styled.h5`
  width: 100%;
  text-align: center;
  padding-top: 4px;
`;
