import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { height } from "@mui/system";
import InputField from "../../component/InputField";
import TextArea from "../../component/TextArea";
import SelectField from "../../component/SelectFeild";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { v4 as uuid } from "uuid";
import "./styles.scss";
import axios from "axios";
import {
  deleteCategoryApi,
  getCategoryApi,
  saveCategoryApi,
} from "../../utils";

export default function Index() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isEdit, setIsEdit] = useState(false);
  const [getdata, setGetData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [categorydata, setCategorydata] = useState({
    id: "",
    name: "",
  });

  const saveCategory = (categorydata) => {
    saveCategoryApi(categorydata)
      .then((response) => {
        console.log("545445s", response);
        getData();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteCategory = (categorydata) => {
    deleteCategoryApi(categorydata)
      .then((response) => {
        console.log("545445s", response);
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getData = () => {
    getCategoryApi()
      .then((response) => {
        console.log("545445s", response);
        setGetData(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    let data = localStorage.getItem("categories");
    if (data) {
      setCategoryList(JSON.parse(data));
    } else {
      setCategoryList([]);
    }
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
  };

  const handleClick = () => {
    toast.success("Saved Successfully!");
  };

  const handleClickDel = () => {
    toast.success("Delete Successfully!");
  };

  return (
    <>
      {/* {!selectedField ? ( */}
      <div>
        <ToastContainer />
        <Button
          onClick={() => {
            setIsEdit(false);
            handleOpen();
            setCategorydata({
              name: "",
            });
          }}
          variant="contained"
          // color="success"
          style={{
            margin: "25px",
            marginLeft: "15px",
            background:
              "linear-gradient(rgb(244, 103, 236) 0%, rgb(56, 182, 255) 100%)",
          }}
        >
          CREATE NEW CATEGORY
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getdata.map((category) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{category.id}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell component="th" scope="row">
                    <DeleteIcon
                      style={{ color: "red", marginRight: "25px" }}
                      onClick={() => {
                        deleteCategory([category.id]);
                        handleClickDel();
                      }}
                    />
                    {/* <ModeEditIcon
                      onClick={() => {
                        setOpen(true);
                        setIsEdit(true);
                        setCategorydata(name);
                        // setSelectedField(true);
                      }}
                      style={{ color: "green" }}
                    /> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* ) : ( */}
      <>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="add-name">
            <div
              className="w-100 gradient-background p-3 text-center"
              style={{ borderRadius: "10px 10px 0px 0px" }}
            >
              <b className="text-white"> CREATE NEW CATEGORY</b>
            </div>
            {/* <br />
              <div>
                <HighlightOffIcon onClick={handleClose} />
              </div> */}
            <div
              style={{ padding: "25px 25px 25px 25px" }}
              className="inner-form"
            >
              <div className="d-flex justify-content-between mb-3">
                <div style={{ width: "450px" }} className="pt-3 form-container">
                  <div>
                    <div className="mb-4">
                      <label htmlFor="">Category</label>
                      <br />
                      <InputField
                        placeholder="Enter Category"
                        onChange={(e) => {
                          setCategorydata({
                            ...categorydata,
                            name: e.target.value,
                          });
                        }}
                        size="small"
                        name="name"
                        value={categorydata.name}
                        style={{ width: "100%", height: "50px" }}
                      />
                    </div>

                    <div style={{ float: "right" }}>
                      <Button
                        onClick={() => {
                          handleClose();
                        }}
                        variant="contained"
                        className="bg-secondary"
                        style={{ marginRight: "5px" }}
                      >
                        Back
                      </Button>

                      <Button
                        onClick={() => {
                          // categoryHandler();
                          handleClick();
                          saveCategory(categorydata);
                        }}
                        className="gradient-background text-white"
                      >
                        <SaveIcon /> Save
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </>
    </>
  );
}
