import React from "react";
import styled from "styled-components";

interface GridHeaderProps {
  title?: string;
  enablebutton?: boolean;
  enablefilter?: boolean;
  filterNode?: React.ReactChild;
  buttonlist?: Array<"print" | "del" | "edit" | "new" | "import">;
  buttonhandler?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  bgcolor?: string;
  noflex?: boolean;
  mode?: "main" | "detail";
}

const GridHeader: React.FC<GridHeaderProps> = ({
  title,
  children,
  enablebutton,
  buttonlist,
  buttonhandler,
  bgcolor,
  enablefilter,
  filterNode,
  noflex,
  mode,
}) => {
  return (
    <Wrapper bgcolor={bgcolor} noflex={noflex} mode={mode}>
      <Row display="flex" flexdir="row" gap={10}>
        <Column display="flex" flexdir="row" flex float="left">
          {title ? <h5>{title}</h5> : <h5>Title Here</h5>}
        </Column>
        {enablefilter && (
          <Column display="flex" flexdir="row">
            {filterNode}
          </Column>
        )}
        {enablebutton && (
          <Column
            display="flex"
            flexdir="row"
            float="right"
            flexend
            gap={5}
            pr={5}
          >
            {buttonlist?.includes("print") && (
              <MenuList>
                <MenuLink
                  value="print"
                  onClick={buttonhandler}
                  title="print"
                  mode="success"
                >
                  Print
                </MenuLink>
              </MenuList>
            )}
            {buttonlist?.includes("import") && (
              <MenuList>
                <MenuLink
                  value="import"
                  onClick={buttonhandler}
                  title="import"
                  mode="success"
                >
                  Import
                </MenuLink>
              </MenuList>
            )}
            {buttonlist?.includes("new") && (
              <MenuList>
                <MenuLink
                  value="new"
                  onClick={buttonhandler}
                  title="new"
                  mode="success"
                >
                  New
                </MenuLink>
              </MenuList>
            )}
            {buttonlist?.includes("edit") && (
              <MenuList>
                <MenuLink
                  value="edit"
                  onClick={buttonhandler}
                  title="edit"
                  mode="success"
                >
                  Edit
                </MenuLink>
              </MenuList>
            )}
            {buttonlist?.includes("del") && (
              <MenuList>
                <MenuLink
                  value="del"
                  onClick={buttonhandler}
                  title="delete"
                  mode="success"
                >
                  Del
                </MenuLink>
              </MenuList>
            )}
          </Column>
        )}
      </Row>
      <Row autoscroll flex display="flex" flexdir="column">
        {children}
      </Row>
    </Wrapper>
  );
};
export default GridHeader;

interface CompProps {
  autoscroll?: boolean;
  display?: string;
  flex?: boolean;
  gap?: number;
  flexdir?: "row" | "column";
  float?: "left" | "right" | "none" | "inherit";
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;
  minheight?: number;
  bgcolor?: string;
  alignitems?: string;
  flexend?: boolean;
}

const Wrapper = styled.div<{
  bgcolor?: string;
  minheight?: number;
  noflex?: boolean;
  mode?: string;
}>`
  ${(props) => (props.mode === "main" ? null : "overflow: hidden;")}
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
  ${(props) => !props.noflex && "height: 100%;"}
  border-radius: 4px;
  padding: 5px;
  box-shadow: 1px 1px 3px 1px #3232323b;
  ${(props) => props.bgcolor && "background: " + props.bgcolor + ";"}
  ${(props) => props.minheight && "min-height: " + props.minheight + "px;"}
`;

const DefaultDiv = styled.div<CompProps>`
  ${(props) => props.autoscroll && "overflow-y: auto;"}
  ${(props) => props.float && "float: " + props.float + ";"}
  ${(props) => props.flex && "flex: 1;"}
  ${(props) => props.display && "display: " + props.display + ";"}
  ${(props) => props.flexdir && "flex-direction: " + props.flexdir + ";"}
  ${(props) => props.gap && "gap: " + props.gap + "px;"}
  ${(props) => props.flexend && "justify-content: flex-end;"}
  ${(props) => props.mt && "margin-top: " + props.mt + "px;"}
  ${(props) => props.mb && "margin-bottom: " + props.mb + "px;"}
  ${(props) => props.ml && "margin-left: " + props.ml + "px;"}
  ${(props) => props.mr && "margin-right: " + props.mr + "px;"}
  ${(props) => props.pt && "padding-top: " + props.pt + "px;"}
  ${(props) => props.pb && "padding-bottom: " + props.pb + "px;"}
  ${(props) => props.pl && "padding-left: " + props.pl + "px;"}
  ${(props) => props.pr && "padding-right: " + props.pr + "px;"}
  ${(props) => props.bgcolor && "background: " + props.bgcolor + ";"}
  ${(props) => props.autoscroll && "overflow-y: auto;"}
`;
const Row = styled(DefaultDiv)``;
const Column = styled(DefaultDiv)``;
// const Devider = styled.span`
//   border-top: 1px solid #3232323b;
// `;

const MenuList = styled.li`
  list-style: none;
`;

const MenuLink = styled.button<{
  mode?: "success" | "warning" | "default" | "primary";
}>`
  background: none;
  ${(props) =>
    props.mode === "success"
      ? "background: #128C7E;color: white;"
      : "background: none;color: #323232;"}
  border: 1px solid #3232323b;
  font-family: "Fira Sans", sans-serif;
  outline: none;
  padding: 2px 6px;
  font-size: 0.7rem;
  font-weight: 400;
  &:hover {
    cursor: pointer;
    ${(props) =>
      props.mode === "success" ? "background: #075E54;" : "background: none;"}
  }
`;
