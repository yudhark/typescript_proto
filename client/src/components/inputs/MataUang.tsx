import React, { useState } from "react";
import styled from "styled-components";

interface MataUangProps {
  name: string;
  label: string;
  value?: number;
  lebar?: number;
  disable?: boolean;
  handlefunc?: (name: any, value: any) => void;
}

const MataUang: React.FC<MataUangProps> = ({
  name,
  label,
  value: valueFromProps,
  lebar,
  disable,
  handlefunc,
}) => {
  const numberToStringWithFormat = (initiatevalue: string): string => {
    let returnedValue = initiatevalue.replace(/\D/g, "");
    returnedValue = returnedValue.replace(/(\d)(\d{2})$/, "$1.$2");
    returnedValue = returnedValue.replace(/(?=(\d{3})+(\D))\B/g, ",");
    return returnedValue;
  };

  const stringToNumber = (stringvalue: string): number => {
    const formatedValue = stringvalue.replace(/,/g, "");
    const returnedValue: number = parseFloat(formatedValue);
    return returnedValue;
  };

  const [currentValue, setCurrentValue] = useState<string>(
    valueFromProps
      ? numberToStringWithFormat(valueFromProps.toString())
      : numberToStringWithFormat((0.0).toString())
  );
  const localhandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const floatRegexp = new RegExp('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')
    let { name, value } = e.currentTarget;
    // if(value==="" || floatRegexp.test(value)) {
    setCurrentValue(numberToStringWithFormat(value));
    handlefunc && handlefunc(name, stringToNumber(value));
  };
  return (
    <InputWrapper lebar={lebar}>
      <Label htmlFor={name}>{label}:</Label>
      <Input
        type="text"
        lebar={20}
        disabled
        defaultValue="Rp"
        centerized
        name="curr"
      />
      <Input
        type="text"
        name={name}
        value={currentValue}
        onChange={localhandler}
        lebar={lebar}
        disabled={disable}
      />
    </InputWrapper>
  );
};
export default MataUang;

const InputWrapper = styled.div<{ lebar?: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 4px 6px;
  font-size: 0.78rem;
  border: 1px solid #3232322b;
  gap: 2px;
  ${(props) => !props.lebar && "flex: 1;"}
`;

const Label = styled.label`
  margin-right: 5px;
`;

const Input = styled.input<{ lebar?: number; centerized?: boolean }>`
  border: none;
  outline: none;
  background: #dedede;
  padding: 2px 4px;
  color: black;
  font-size: 0.72rem;
  font-family: "Fira Sans", sans-serif;
  box-shadow: inset 1px 1px 2px 1px #3232321b;
  text-align: right;
  ${(props) => (props.lebar ? "width: " + props.lebar + "px;" : "flex: 1;")}
  ${(props) => props.centerized && "text-align: center;"}
  &:disabled {
    color: #323232;
  }
`;
