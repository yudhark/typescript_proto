import styled from "styled-components";

interface CustomProps {
  width?: number;
  height?: number;
  bgcolor?: string;
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  fixing_height?: boolean;
  fixing_width?: boolean;
  display?: string;
  flexdir?: "row" | "column";
  bgimage?: string;
  centerized?: boolean;
  gap?: number;
  flex?: boolean;
  position?: "statc" | "relative" | "fixed" | "absolute" | "sticky";
}

const calculatedimension = (
  mg1?: number,
  mg2?: number,
  pd1?: number,
  pd2?: number
): number => {
  let result: number = 0;
  if (mg1) result += mg1;
  if (mg2) result += mg2;
  if (pd1) result += pd1;
  if (pd2) result += pd2;
  return result;
};

const DefaultDiv = styled.div<CustomProps>`
  ${(props) => props.width && "width: " + props.width + "px;"}
  ${(props) => props.height && "height: " + props.height + "px;"}
  ${(props) =>
    props.fixing_height &&
    "height: calc(100% - " +
      calculatedimension(props.mt, props.mb, props.pt, props.pb) +
      "px);"}
  ${(props) =>
    props.fixing_width &&
    "width: calc(100% - " +
      calculatedimension(props.ml, props.mr, props.pl, props.pr) +
      "px);"}
  ${(props) => props.display && "display: " + props.display + ";"}
  ${(props) => props.mt && "margin-top: " + props.mt + "px;"}
  ${(props) => props.mb && "margin-bottom: " + props.mb + "px;"}
  ${(props) => props.ml && "margin-left: " + props.ml + "px;"}
  ${(props) => props.mr && "margin-right: " + props.mr + "px;"}
  ${(props) => props.pt && "padding-top: " + props.pt + "px;"}
  ${(props) => props.pb && "padding-bottom: " + props.pb + "px;"}
  ${(props) => props.pl && "padding-left: " + props.pl + "px;"}
  ${(props) => props.pr && "padding-right: " + props.pr + "px;"}
  ${(props) => props.flexdir && "flex-direction: " + props.flexdir + ";"}
  ${(props) => props.bgcolor && "background: " + props.bgcolor + ";"}
  ${(props) => props.gap && "gap: " + props.gap + "px;"}
  ${(props) => props.flex && "flex: 1;"}
  ${(props) =>
    props.centerized && "justify-content: center; align-items: center;"}
`;

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #d4e0e7;
`;

export const HeaderPanel = styled.div<{ height?: number; bgcolor?: string }>`
  ${(props) => props.height && "height: " + props.height + "px;"}
  ${(props) => props.bgcolor && "background-color: " + props.bgcolor + ";"}
  width: 100%;
  display: flex;
  flex-direction: row;
  box-shadow: 2px 2px 4px 1px #3232323b;
`;
export const BodyPanel = styled.div<{ topbarheight?: number }>`
  ${(props) =>
    props.topbarheight &&
    "height: calc(100vh - " + props.topbarheight + "px);"};
  width: 100%;
`;

export const Row = styled(DefaultDiv)``;
export const Column = styled(DefaultDiv)``;
