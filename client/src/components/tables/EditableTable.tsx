import React from "react";
import styled from "styled-components";

const RenderHeader: React.FC<{ column: Array<any> }> = ({ column }) => {
  return (
    <>
      {column.map((item) =>
        item.width ? (
          <Cell key={item.id} lebar={item.width} type="header">
            {item.desc}
          </Cell>
        ) : (
          <Cell key={item.id} type="header">
            {item.desc}
          </Cell>
        )
      )}
      <Cell lebar={4}></Cell>
    </>
  );
};

const RenderBody: React.FC<{ rows: Array<any>; columns?: Array<any>; checkboxrow?: boolean }> = ({
  rows,
  columns,
  checkboxrow
}) => {
  return (
    <>
      {rows.map((row) => (
        <Row key={row._id}>
          {checkboxrow && <Cell lebar={20}><CheckBoxDiv><HiddenCheckbox/></CheckBoxDiv></Cell>}
          {columns?.map((column) =>
            column.width ? (
              <Cell key={row._id + "_" + column.id} lebar={column.width}>
                {row[column.id]}
              </Cell>
            ) : (
              <Cell key={row._id + "_" + column.id}>{row[column.id]}</Cell>
            )
          )}
        </Row>
      ))}
    </>
  );
};

interface EditableTableProps {
  rows?: Array<any>;
  headers?: Array<any>;
  enablecounter?: boolean;
  enablechecbox?: boolean;
}

const EditableTable: React.FC<EditableTableProps> = ({
  rows,
  headers,
  enablecounter,
  enablechecbox,
}) => {
  return (
    <>
      <Header>
        {enablechecbox && (
          <Cell lebar={20}>
            <CheckBoxDiv><HiddenCheckbox /></CheckBoxDiv>
          </Cell>
        )}
        {headers && <RenderHeader column={headers}/>}
      </Header>
      <Body>
        {rows && rows.length > 0 ? (
          <RenderBody rows={rows} columns={headers} checkboxrow={enablechecbox}/>
        ) : (
          <Row>
            <EmptyCell>No Record(s)</EmptyCell>
          </Row>
        )}
      </Body>
      {enablecounter && rows && rows.length > 0 && (
        <Row style={{ marginTop: 2 }}>
          <p style={{ fontSize: "0.8rem" }}>Total Records: {rows.length}</p>
        </Row>
      )}
    </>
  );
};
export default EditableTable;

interface CellProps {
  type?: "header" | "body";
  lebar?: number;
}
const Header = styled.div`
  display: flex;
  flex-direction: row;
  background: #128c7e;
  font-size: 0.8rem;
  & > div {
    border-right: 1px solid white;
  }
  & > div:last-child {
    border-right: none !important;
  }
  font-weight: bold;
  color: white;
`;
const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  overflow-y: scroll;
  & > div:last-child {
    border-bottom: 1px solid #3232322b;
  }
  & > div:nth-of-type(odd) {
    background: #e2e7ea;
  }
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  & > div {
    border-right: 1px solid #3232322b;
  }
  & > div:last-child {
    border-right: none !important;
  }
`;
const Cell = styled.div<CellProps>`
  ${(props) => (props.lebar ? "width: " + props.lebar + "px;" : "flex: 1;")}
  ${(props) =>
    props.type === "header" ? "padding: 3px 6px;" : "padding: 2px 6px;"}
  overflow: hidden;
`;

const EmptyCell = styled.p`
  flex: 1;
  text-align: center;
`;

const CheckBoxDiv = styled.div`
height: 100%;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
`
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
margin: auto;
text-align: center;
`