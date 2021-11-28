import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { InputProps } from "./interfaces";

const TextInput: React.FC<InputProps> = ({
  name,
  label,
  value: value_from_props,
  lebar,
  disable,
  handlefunc,
}) => {
  const [current_value, set_current_value] = useState<any>(
    value_from_props ? value_from_props : ""
  );
  useEffect(() => {
    value_from_props && set_current_value(value_from_props);
  }, [value_from_props]);

  const localhandler = (e: React.FormEvent<HTMLInputElement>) => {
    let { name, value } = e.currentTarget;
    set_current_value(value);
    handlefunc && handlefunc(name, value);
  };
  return (
    <InputWrapper lebar={lebar}>
      <Label htmlFor={name}>{label}:</Label>
      <Input
        type="text"
        name={name}
        value={current_value}
        lebar={lebar}
        disabled={disable}
        onChange={localhandler}
      />
    </InputWrapper>
  );
};
export default TextInput;

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
