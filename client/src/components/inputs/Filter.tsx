import React from "react";
import styled from "styled-components";

interface FilterProps {
  name: string;
  label: string;
  value?: any;
  lebar?: number;
  disable?: boolean
  handlechange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterInput: React.FC<FilterProps> = ({
  name,
  label,
  value,
  handlechange,
  lebar,
  disable
}) => {
  return (
    <InputWrapper lebar={lebar}>
      <Label htmlFor={name}>{label}:</Label>
      <Input
        type="text"
        name={name}
        defaultValue={value}
        onChange={handlechange}
        disabled={disable}
        lebar={lebar}
      />
    </InputWrapper>
  );
};
export default FilterInput;

const InputWrapper = styled.div<{ lebar?: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 4px 4px;
  border: 1px solid #3232322b;
  font-size: 0.74rem;
  ${(props) => !props.lebar && "flex: 1;"}
`;

const Label = styled.label`
  margin-right: 5px;
`;

const Input = styled.input<{ lebar?: number }>`
  border: none;
  outline: none;
  background: #dedede;
  font-size: 0.72rem;
  font-family: "Fira Sans", sans-serif;
  padding: 2px 4px;
  box-shadow: inset 1px 1px 2px 1px #3232321b;
  ${(props) => (props.lebar ? "width: " + props.lebar + "px;" : "flex: 1;")}
  color: #1c1c1c;
  &:disabled {
    color: #525252;
  }
`;
