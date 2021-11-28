import React from "react";
import styled from "styled-components";

interface SideBarProps {
  data?: Array<any>;
  bgcolor?: string;
  enablefixedmenu?: boolean;
  menufunc?: (url: string) => void;
  themefunc?: () => void;
}

const SideBar: React.FC<SideBarProps> = ({
  data,
  bgcolor,
  enablefixedmenu,
  menufunc,
}) => {
  const dimensi = 38;
  return (
    <Wrapper bgcolor={bgcolor ? bgcolor : "white"} lebar={dimensi}>
      <InnerWrapper>
        {enablefixedmenu && (
          <>
            <Row>
              <MenuButton
                onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                  menufunc && menufunc("home")
                }
              >
                H
              </MenuButton>
            </Row>
            <Row>
              <MenuButton
                onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                  menufunc && menufunc("chart")
                }
              >
                G
              </MenuButton>
            </Row>
          </>
        )}
      </InnerWrapper>
    </Wrapper>
  );
};
export default SideBar;

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
  lebar?: number;
  bgcolor?: string;
  alignitems?: string;
  flexend?: boolean;
  centerized?: boolean;
}
const Wrapper = styled.div<{ lebar?: number; bgcolor?: string }>`
  ${(props) => props.lebar && "width: " + props.lebar + "px;"}
  ${(props) => props.bgcolor && "background: " + props.bgcolor + ";"}
  box-shadow: 2px 2px 5px 1px #3232323b;
  border-radius: 4px;
  display: flex;
  transition: width 0.3s ease-in-out;
`;

const InnerWrapper = styled.div`
  width: calc(100% - 8px);
  margin: 4px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  transition: width 0.3s ease-in-out;
  box-sizing: border-box;
`;

const Row = styled.div<CompProps>`
  ${(props) => props.display && "display: " + props.display + ";"}
  ${(props) => props.flexdir && "flex-direction: " + props.flexdir + ";"}
  ${(props) => props.flex && "flex: 1;"}
  ${(props) => props.gap && "gap: " + props.gap + "px;"}
  ${(props) =>
    props.centerized && "justify-content: center;align-items: center;"}
`;

const MenuButton = styled.button`
  background: white;
  border: none;
  outline: none;
  &:hover {
    cursor: pointer;
  }
`;
