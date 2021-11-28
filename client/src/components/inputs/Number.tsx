import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { InputProps } from "./interfaces";

const NumberInput: React.FC<InputProps> = ({
  name,
  label,
  value: value_from_props,
  lebar,
  unit,
  disable,
  handlefunc,
}) => {
  const [current_value, set_current_value] = useState<any>(
    value_from_props ? value_from_props : 0
  );

  useEffect(() => {
    value_from_props && set_current_value(value_from_props);
  }, [value_from_props]);

  const locahandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    set_current_value(value)
    handlefunc && handlefunc(name, Number(value));
  };
  return (
    <InputWrapper lebar={lebar}>
      <Label htmlFor={name}>{label}:</Label>
      <Input
        type="number"
        name={name}
        value={current_value}
        onChange={locahandler}
        lebar={lebar}
        disabled={disable}
      />
      {unit && <Sufix>{unit}</Sufix>}
    </InputWrapper>
  );
};
export default NumberInput;

const InputWrapper = styled.div<{ lebar?: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 4px 6px;
  font-size: 0.78rem;
  border: 1px solid #3232322b;
  ${(props) => !props.lebar && "flex: 1;"}
`;

const Label = styled.label`
  margin-right: 5px;
`;

const Input = styled.input<{ lebar?: number }>`
  border: none;
  outline: none;
  font-size: 0.72rem;
  font-family: "Fira Sans", sans-serif;
  background: #dedede;
  padding: 2px 4px;
  box-shadow: inset 1px 1px 2px 1px #3232321b;
  text-align: right;
  ${(props) => (props.lebar ? "width: " + props.lebar + "px;" : "flex: 1;")}
  -moz-appearance: textfield;
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  color: #1c1c1c;
  &:disabled {
    color: #525252;
  }
`;

const Sufix = styled.p`
  font-size: 0.7rem;
  margin-left: 4px;
`;
