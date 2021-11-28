import React from "react";
import styled from "styled-components"

interface DateProps {
  name: string;
  label: string;
  value?: any;
  lebar?: number;
  disable?: boolean
  handlechange?: (event: React.FormEvent<HTMLInputElement>) => void;
}

const DateInput: React.FC<DateProps> = ({
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
        type="date"
        name={name}
        defaultValue={value}
        onChange={handlechange}
        lebar={lebar}
        disabled={disable}
      />
    </InputWrapper>
  );
};
export default DateInput;

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
  padding: 2px 4px;
  box-shadow: inset 1px 1px 2px 1px #3232321b;
  font-size: 0.72rem;
  font-family: 'Fira Sans', sans-serif;
  text-align: right;
  ${(props) => (props.lebar ? "width: " + props.lebar + "px;" : "flex: 1;")}
  color: #1c1c1c;
  &:disabled {
    color: #525252;
  }
`;

