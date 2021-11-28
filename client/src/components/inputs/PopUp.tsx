import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { filteredRow } from "../../utils/function.utils";
import { ReadOnlyTable, FilterInput } from "..";
interface PopUpInputProps {
  idname?: string;
  descname?: string;
  idlabel?: string;
  desclabel?: string;
  value?: any;
  lebar?: number;
  disable?: boolean;
  header?: any[];
  apiurl?: string;
  selectionhandle?: (data: any) => void;
  handlechange?: (event: React.FormEvent<HTMLInputElement>) => void;
}
const PopUpInput: React.FC<PopUpInputProps> = ({
  idname,
  descname,
  idlabel,
  desclabel,
  value,
  lebar,
  disable,
  selectionhandle,
  handlechange,
  apiurl,
  header,
}) => {
  const [enablepopup, setenablepopup] = useState<boolean>(false);
  const columns = [
    { id: "_id", desc: "Column 1", width: 60 },
    { id: "ket", desc: "Column 2", width: 100 },
  ];

  const exampledata = [
    { _id: "book1", ket: "Judul Buku 1" },
    { _id: "book2", ket: "Judul Buku 2" },
  ];

  const popupref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const closepopup = (e: any) => {
      if (popupref.current && !popupref.current.contains(e.target)) {
        setenablepopup(false);
      }
    };
    document.addEventListener("mousedown", closepopup);
    return () => {
      document.removeEventListener("mousedown", closepopup);
    };
  });

  // eslint-disable-next-line
  const [popupdata, setpopupdata] = useState<Array<any>>([]);
  useEffect(() => {
    if (apiurl) {
      axios.get(apiurl).then((respon) => setpopupdata(respon.data.data));
    }
  }, [apiurl]);

  const [filter, setfilter] = useState<string>("");
  const filterhandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setfilter(e.currentTarget.value);
  };

  const [formvalue, setformvalue] = useState<any>();
  const handledbclickrow = (data: any) => {
    setformvalue(data);
    selectionhandle && selectionhandle(data);
    setenablepopup(false);
  };
  return (
    <InputWrapper lebar={lebar}>
      <Column>
        <Label htmlFor={idname}>{idlabel ? idlabel + ":" : "Label:"}</Label>
        <Input
          type="text"
          name={idname}
          lebar={lebar && lebar / 4}
          onFocus={(e: React.FormEvent<HTMLInputElement>) =>
            setenablepopup(true)
          }
          defaultValue={formvalue?._id}
          onChange={handlechange}
          placeholder="click here!"
        />
        {enablepopup && (
          <PopUpWrapper ref={popupref}>
            <InnerPopUpWrapper>
              <Row>
                <TitleBox>Select the Data:</TitleBox>
              </Row>
              <Row>
                <FilterInput
                  name="gridfilter"
                  label="Filter"
                  handlechange={filterhandler}
                />
              </Row>
              <Row flex display="flex" flexdir="column">
                <ReadOnlyTable
                  headers={header ? header : columns}
                  rows={filteredRow(exampledata, columns, filter)}
                  handledbclickrow={handledbclickrow}
                />
              </Row>
            </InnerPopUpWrapper>
          </PopUpWrapper>
        )}
      </Column>
      <Column>
        <Label htmlFor={descname}>
          {desclabel ? desclabel + ":" : "Desc Label:"}
        </Label>
        <Input
          type="text"
          name={descname}
          defaultValue={formvalue?.ket}
          disabled={disable}
          onChange={handlechange}
        />
      </Column>
    </InputWrapper>
  );
};
export default PopUpInput;

const dropdown = keyframes`
0% {
  transform: scaleY(0);
} 100% {
  transform: scaleY(1);
}
`
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
`;

const Column = styled.div<{ lebar?: number; bgcolor?: string }>`
  display: flex;
  flex-direction: row;
  ${(props) => props.bgcolor && "background: " + props.bgcolor + ";"}
  gap: 4px;
  position: relative;
`;

const Label = styled.label``;
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
  overflow: hidden;
`;

const PopUpWrapper = styled.div`
  border-radius: 5px;
  height: 240px;
  background: rgba(255, 255, 255, 0.95);
  position: absolute;
  z-index: 10;
  box-shadow: 3px 3px 6px 4px #3232322b;
  left: 0;
  top: 25px;
  display: flex;
  transform-origin: center top;
  animation: ${dropdown} .2s;
`;
const InnerPopUpWrapper = styled.div`
  flex: 1;
  margin: 6px;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Row = styled.div<{
  flex?: boolean;
  bgcolor?: string;
  display?: string;
  flexdir?: "row" | "column";
}>`
  ${(props) => props.flex && "flex: 1;"}
  ${(props) => props.bgcolor && "background: " + props.bgcolor + ";"}
  ${(props) => props.display && "display: " + props.display + ";"}
  ${(props) => props.flexdir && "flex-direction: " + props.flexdir + ";"}
`;

const TitleBox = styled.p`
  font-size: 0.7rem;
  text-align: center;
`;
