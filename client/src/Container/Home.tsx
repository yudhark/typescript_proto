import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  CurrencyInput,
  EditableTable,
  FilterInput,
  PopUpInput,
  ReadOnlyTable,
  TextInput,
} from "../components";
import Form from "../components/Form";
import { CURR } from "../components/inputs/interfaces";
import Uploader from "../components/inputs/Uploader";
import Grid from "../components/layouts/Grid";
import GridHeader from "../components/layouts/GridHeader";
import { filteredRow } from "../utils/function.utils";
import { Row } from "../utils/main.styled";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  // grid table component and event
  const [form_data, set_form_data] = useState<any>({});
  const grid_headers: Array<any> = [
    { id: "_id", desc: "ID", width: 20 },
    { id: "ket", desc: "Deskripsi" },
    { id: "stock", desc: "Stock", width: 30, type: "number" },
    {
      id: "price",
      desc: "Harga",
      width: 60,
      type: "currency",
      position: "center",
    },
  ];
  const [filter_grid_word, set_filter_grid_word] = useState<any>("");
  const grid_filter_handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    set_filter_grid_word(value);
  };

  const [filter_detail_word, set_filter_detail_word] = useState<any>("");
  const detail_filter_handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    set_filter_detail_word(value);
  };

  const grid_table_selection_handler = (data: any) => {
    set_form_data(data);
    console.log(data);
  };

  const [grid_data_row, set_grid_data_row] = useState<Array<any>>([]);
  const [detail_data_row, set_detail_data_row] = useState<Array<any>>([]);

  const form_handler = (name: any, value: any) => {
    set_form_data({ ...form_data, [name]: value });
  };

  useEffect(() => {
    axios.get("http://localhost:3030/api/v1/siswa/dummy/50").then((respon) => {
      return set_grid_data_row(respon.data);
    });
    axios.get("http://localhost:3030/api/v1/siswa/dummy/15").then((respon) => {
      return set_detail_data_row(respon.data);
    });
  }, []);
  return (
    <>
      <Grid headercolor="white">
        <Row mb={6}>
          <FilterInput
            name="grid_filter_handler"
            label="Filter"
            handlechange={grid_filter_handler}
          />
        </Row>
        <ReadOnlyTable
          headers={grid_headers}
          rows={filteredRow(grid_data_row, grid_headers, filter_grid_word)}
          enablecounter
          handleselectedrow={grid_table_selection_handler}
        />
      </Grid>
      <Row
        flex
        display="flex"
        flexdir="column"
        gap={15}
        fixing_width
        fixing_height
        ml={2}
      >
        <GridHeader
          title="Header"
          bgcolor="white"
          enablebutton
          buttonlist={["import", "print", "new", "edit", "del"]}
          mode="main"
        >
          <Form
            showbutton
            submitfunc={(e: React.FormEvent) => {
              e.preventDefault();
              console.log(form_data);
            }}
          >
            <Row display="flex" flexdir="row" gap={6} >
              <TextInput
                name="_id"
                label="ID"
                lebar={80}
                value={form_data?._id}
                handlefunc={form_handler}
              />
              <TextInput
                name="ket"
                label="Deskripsi"
                value={form_data?.ket}
                handlefunc={form_handler}
              />
              <CurrencyInput name="price" label="Harga" value={form_data?.price} handlefunc={form_handler} lebar={100} currency={CURR.USD}/>
              <Uploader lebar={200} uploadername="image" label="Image" type="image" maxfilesize={2024000}/>
            </Row>
            <Row display="flex" flexdir="row" gap={6} flex >
              <TextInput
                name="_id"
                label="ID"
                lebar={80}
                value={form_data?._id}
                handlefunc={form_handler}
              />
              <TextInput
                name="ket"
                label="Deskripsi"
                value={form_data?.ket}
                handlefunc={form_handler}
              />
              <Uploader lebar={200} uploadername="image" label="Image" type="image" maxfilesize={2024000}/>
            </Row>
          </Form>
        </GridHeader>
        <GridHeader
          title="Detail"
          bgcolor="white"
          enablebutton
          buttonlist={["import", "print", "new", "edit", "del"]}
          enablefilter
          filterNode={
            <FilterInput
              name="detailfilter"
              label="Filter"
              handlechange={detail_filter_handler}
              lebar={200}
            />
          }
        >
          <EditableTable
            headers={grid_headers}
            rows={filteredRow(
              detail_data_row,
              grid_headers,
              filter_detail_word
            )}
            enablecounter
            enablechecbox
          />
        </GridHeader>
      </Row>
    </>
  );
};
export default Home;
