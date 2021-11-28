import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { ReadOnlyTable, FilterInput } from "..";
import axios from "axios";
import { InputProps } from "./interfaces";

const Options: React.FC<InputProps> = ({
  name,
  label,
  value,
  lebar,
  disable,
  idcolumn,
  apiurl,
  apitoken,
  selectionhandler,
  handlefunc,
}) => {
  const [showdropdown, setshowdropdown] = useState<boolean>(false);
  const HandleDropdown = () => {
    setshowdropdown(true);
  };

  const dropdownref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const closedropdown = (e: any) => {
      if (dropdownref.current && !dropdownref.current.contains(e.target)) {
        setshowdropdown(false);
      }
    };
    document.addEventListener("mousedown", closedropdown);
    return () => {
      document.removeEventListener("mousedown", closedropdown);
    };
  }, []);

  const [initiatevalue, setinitiatevalue] = useState<any>(value);
  const LocalHandleSelection = (data: any) => {
    setinitiatevalue(data);
    selectionhandler && selectionhandler(data);
    setshowdropdown(false);
  };

  useEffect(() => {
    if (apiurl && apitoken) {
      axios
        .get(apiurl, { headers: { Authorization: apitoken } })
        .then((respon) => {
          setinitiatevalue(respon.data.data);
        });
    }
  }, [apiurl, apitoken]);

  const columns = [{ id: idcolumn ? idcolumn : "ket", desc: "Pilih:" }];
  const exampledata = [
    { _id: 0, ket: "Data 1" },
    { _id: 1, ket: "Data 2" },
    { _id: 2, ket: "Data 3" },
    { _id: 3, ket: "Data 4" },
  ];
  // eslint-disable-next-line
  const [filter, setfilter] = useState<any>("");
  const localchangehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    setfilter(value);
  };
  const localhandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    handlefunc && handlefunc(name, value);
  };
  return (
    <InputWrapper lebar={lebar}>
      <Label htmlFor={name}>{label + ":"}</Label>
      <Input
        type="text"
        name={name}
        defaultValue={initiatevalue?.ket}
        lebar={lebar}
        disabled={disable}
        onClick={HandleDropdown}
        onChange={localhandler}
        placeholder="click to choose"
      />
      {showdropdown && (
        <DropdownWrapper lebar={lebar} ref={dropdownref}>
          <InnerDropdownWrapper>
            <Row>
              <FilterInput
                name="filter"
                label="Filter"
                lebar={lebar && lebar - 50}
                handlechange={localchangehandler}
              />
            </Row>
            <Row flex>
              <ReadOnlyTable
                headers={columns}
                rows={exampledata}
                handleselectedrow={LocalHandleSelection}
              />
            </Row>
          </InnerDropdownWrapper>
        </DropdownWrapper>
      )}
    </InputWrapper>
  );
};
export default Options;

const InputWrapper = styled.div<{ lebar?: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 4px 6px;
  font-size: 0.78rem;
  border: 1px solid #3232322b;
  gap: 4px;
  ${(props) => !props.lebar && "flex: 1;"}
  position: relative;
`;
const dropdown = keyframes`
0% {
  transform: scaleY(0);
} 100% {
  transform: scaleY(1);
}
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

const DropdownWrapper = styled.div<{ lebar?: number }>`
  position: absolute;
  ${(props) =>
    props.lebar ? "width: " + (props.lebar + 10) + "px;" : "width: 100%;"}
  height: 200px;
  background: rgba(255, 255, 255, 0.96);
  border-radius: 5px;
  box-shadow: 3px 3px 6px 4px #3232322b;
  z-index: 10;
  margin: 0 4px;
  right: 0;
  top: 28px;
  display: flex;
  transform-origin: center top;
  animation: ${dropdown} 0.2s;
`;

const InnerDropdownWrapper = styled.div`
  flex: 1;
  margin: 4px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Row = styled.div<{ flex?: boolean }>`
  ${(props) => props.flex && "flex: 1;"}
  display: flex;
  flex-direction: column;
`;
