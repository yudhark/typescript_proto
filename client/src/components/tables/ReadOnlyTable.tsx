import React from "react";
import styled from "styled-components";

const currency_conversion = (value: number) => {
  let returnedValue = value.toString();
    returnedValue = returnedValue.replace(/\D/g, "");
    returnedValue = returnedValue.replace(/(\d)(\d{2})$/, "$1.$2");
    returnedValue = returnedValue.replace(/(?=(\d{3})+(\D))\B/g, ",");
    return returnedValue;
};

const RenderHeader: React.FC<{ column: Array<any> }> = ({ column }) => {
  return (
    <>
      {column.map((item) =>
        item.width ? (
          <Cell key={item.id} lebar={item.width} type="header" textAlign={item.position}>
            {item.desc}
          </Cell>
        ) : (
          <Cell key={item.id} type="header" textAlign={item.position}>
            {item.desc}
          </Cell>
        )
      )}
      <Cell lebar={4}></Cell>
    </>
  );
};

const RenderCell: React.FC<{ row: any; column: any; type?: string }> = ({
  row,
  column,
  type,
}) => {
  if (type && (type === "currency" || type === "number")) {
    if (column.width) {
      return (
        <Cell key={row._id + "_" + column.id} lebar={column.width} textAlign="right">
          {currency_conversion(row[column.id])}
        </Cell>
      );
    }
    return (
      <Cell key={row._id + "_" + column.id} textAlign="right">
        {currency_conversion(row[column.id])}
      </Cell>
    );
  } else {
    if (column.width) {
      return (
        <Cell key={row._id + "_" + column.id} lebar={column.width}>
          {row[column.id]}
        </Cell>
      );
    }
    return <Cell key={row._id + "_" + column.id}>{row[column.id]}</Cell>;
  }
};

const RenderBody: React.FC<{
  rows: Array<any>;
  columns?: Array<any>;
  handleselectedrow?: (data?: any) => void;
  handledbclickrow?: (data?: any) => void;
}> = ({ rows, columns, handleselectedrow, handledbclickrow }) => {
  return (
    <>
      {rows.map((row) => (
        <Row
          key={row._id}
          onClick={() => handleselectedrow && handleselectedrow(row)}
          onDoubleClick={() => handledbclickrow && handledbclickrow(row)}
        >
          {columns?.map((column) => (
            <RenderCell
              key={row._id + "_" + column.id}
              row={row}
              column={column}
              type={column.type}
            />
          ))}
        </Row>
      ))}
    </>
  );
};

interface ReadOnlyTableProps {
  rows?: Array<any>;
  headers?: Array<any>;
  enablecounter?: boolean;
  handleselectedrow?: (event: React.MouseEvent<HTMLDivElement>) => void;
  handledbclickrow?: (event: React.MouseEvent<HTMLDivElement>) => void;
}
const ReadOnlyTable: React.FC<ReadOnlyTableProps> = ({
  rows,
  headers,
  enablecounter,
  handleselectedrow,
  handledbclickrow,
}) => {
  return (
    <>
      <Header>{headers && <RenderHeader column={headers} />}</Header>
      <Body>
        {rows && rows.length > 0 ? (
          <RenderBody
            rows={rows}
            columns={headers}
            handleselectedrow={handleselectedrow}
            handledbclickrow={handledbclickrow}
          />
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

export default ReadOnlyTable;

interface CellProps {
  type?: "header" | "body";
  lebar?: number;
  textAlign?: "left" | "right" | "center";
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
  ${(props) => props.textAlign && "text-align: " + props.textAlign + ";"}
  cursor: default;
  overflow: hidden;
`;

const EmptyCell = styled.p`
  flex: 1;
  text-align: center;
`;
