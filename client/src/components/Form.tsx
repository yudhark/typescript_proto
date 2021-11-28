import React from "react";
import styled from "styled-components";

interface FormProps {
  showbutton?: boolean;
  submitfunc?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<FormProps> = ({ showbutton, submitfunc, children }) => {
  return (
    <FormWrapper onSubmit={submitfunc} pl={5} pr={5} mt={4}>
      <Row display="grid" flexdir="column" gap={8} flex>
        {children}
      </Row>
      {showbutton && (
        <Row display="flex" flexdir="row" centerized gap={5} mt={4}>
          <MenuLink type="submit">save</MenuLink>
          <MenuLink>cancel</MenuLink>
        </Row>
      )}
    </FormWrapper>
  );
};
export default Form;

interface CustomProps {
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  display?: string;
  flexdir?: "row" | "column";
  centerized?: boolean;
  gap?: number;
  flex?: boolean;
}
const FormWrapper = styled.form<CustomProps>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  ${(props) => props.mt && "margin-top: " + props.mt + "px;"}
  ${(props) => props.mb && "margin-bottom: " + props.mb + "px;"}
  ${(props) => props.ml && "margin-left: " + props.ml + "px;"}
  ${(props) => props.mr && "margin-right: " + props.mr + "px;"}
  ${(props) => props.pt && "padding-top: " + props.pt + "px;"}
  ${(props) => props.pb && "padding-bottom: " + props.pb + "px;"}
  ${(props) => props.pl && "padding-left: " + props.pl + "px;"}
  ${(props) => props.pr && "padding-right: " + props.pr + "px;"}
`;

const Row = styled.div<CustomProps>`
  ${(props) => props.display && "display: " + props.display + ";"}
  ${(props) => props.flexdir && "flex-direction: " + props.flexdir + ";"}
  ${(props) =>
    props.centerized && "justify-content: center; align-items: center;"}
  ${(props) => props.gap && "gap: " + props.gap + "px;"}
  ${(props) => props.flex && "flex: 1;"}
  ${(props) => props.mt && "margin-top: " + props.mt + "px;"}
  ${(props) => props.mb && "margin-bottom: " + props.mb + "px;"}
  ${(props) => props.ml && "margin-left: " + props.ml + "px;"}
  ${(props) => props.mr && "margin-right: " + props.mr + "px;"}
  ${(props) => props.pt && "padding-top: " + props.pt + "px;"}
  ${(props) => props.pb && "padding-bottom: " + props.pb + "px;"}
  ${(props) => props.pl && "padding-left: " + props.pl + "px;"}
  ${(props) => props.pr && "padding-right: " + props.pr + "px;"}
`;

const MenuLink = styled.button`
  background: none;
  border: 1px solid #3232323b;
  outline: none;
  padding: 2px 4px;
  font-size: 0.8rem;
  &:hover {
    cursor: pointer;
    background: #ddd;
  }
`;
