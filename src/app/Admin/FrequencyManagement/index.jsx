import {
  Box,
  Button,
  Fade,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { Jodit } from "jodit";
import JoditReact from "jodit-react";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { height } from "@mui/system";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import InputField from "../../component/InputField";
import TextArea from "../../component/TextArea";
import SelectField from "../../component/SelectFeild";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { Editor, EditorState } from "react-draft-wysiwyg";
import { getBase64 } from "../../utils";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import { v4 as uuid } from "uuid";
// import "./style.css";
export default function Index() {
  const [selectedField, setSelectedField] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formList, setFormList] = useState([]);
  const [catigary, setCatigary] = useState({});
  const [frequency, setFrequency] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [modalData, setModalData] = useState({
    id: uuid(),
    frequencyName: frequency.name,
    criteria1: catigary.name,
    value1: "",
  });

  console.log("modalData", modalData);

  const [form_details, setFormDetails] = useState([
    {
      id: uuid(),
      frequencyName: frequency.name,
      criteria1: catigary.name,
      value1: "",
    },
  ]);

  const addFeilds = () => {
    const temp = [
      ...form_details,
      {
        id: uuid(),
        frequencyName: frequency.name,
        criteria1: catigary.name,
        value1: "",
      },
    ];
    setFormDetails(temp);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1200,
    height: 200,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const removeFeilds = (id) => {
    const data = form_details.filter((ele) => {
      return ele.id !== id;
    });

    console.log("temp", data);
    setFormDetails(data);
  };

  const editData = () => {
    handleOpen();
    console.log("Jai Shree Ram");
  };

  React.useEffect(() => {
    let data = localStorage.getItem("frequencyList");
    if (data) {
      setFrequency(JSON.parse(data));
      console.log("data", data);
    } else {
      setFrequency([]);
    }
  }, []);

  React.useEffect(() => {
    let Catigary = localStorage.getItem("criteria");
    if (Catigary) {
      setCatigary(JSON.parse(Catigary));
      console.log("data", Catigary);
    } else {
      setCatigary([]);
    }
  }, []);

  const saveFontdata = () => {
    const tempfontdata = localStorage.getItem("form_details");

    const totalSaveData = [...formList, ...form_details];
    setFormList(totalSaveData);
    localStorage.setItem("form_details", JSON.stringify(totalSaveData));
    // if (tempfontdata) {
    //   let tempTemplateList = JSON.parse(tempfontdata);
    //   if (isEdit) {
    //     tempTemplateList = tempTemplateList.map((temp) => {
    //       if (temp.id === form_details.id) {
    //         return form_details;
    //       } else {
    //         return temp;
    //       }
    //     });
    //     alert("Update Successfully !!");
    //   } else {
    //     tempTemplateList.push({ ...form_details });
    //     alert("Save Successfully !!");
    //   }
    //   setFormList(tempTemplateList);
    //   localStorage.setItem("form_details", JSON.stringify(tempTemplateList));
    // } else {
    //   localStorage.setItem("form_details", JSON.stringify([form_details]));
    //   setFormList([form_details]);
    //   alert("Save Successfully !!");
    // }
    setSelectedField(false);
    setFormDetails([
      {
        id: uuid(),
        frequencyName: "",
        criteria1: "",
        value1: "",
      },
    ]);
  };

  React.useEffect(() => {
    if (localStorage.getItem("form_details")) {
      let localData = JSON.parse(localStorage.getItem("form_details"));
      if (localData && localData.length > 0) {
        setFormList(localData);
      }
    }
  }, []);

  const deleteData = (form_details) => {
    let delData = form_details.id;
    const listFilterData = formList.filter((ele) => {
      return ele.id !== form_details.id;
    });
    alert("Delete Sucessfully");
    localStorage.setItem("form_details", JSON.stringify(listFilterData));
    setFormList(listFilterData);
  };

  const inputHandler = async (e, index) => {
    let { value, name } = e.target;
    console.log(value, name);
    const temp = [...form_details];
    temp[index][name] = value;
    setFormDetails([...temp]);
  };

  let openLinkHandler = (url) => {
    window.open(url);
  };

  return (
    <>
      {!selectedField ? (
        <div>
          <Button
            onClick={() => {
              setIsEdit(false);
              setSelectedField(true);
              // setFormDetails([
              //   {
              //     id: uuid(),
              //     frequencyName: "",
              //     criteria1: "",
              //     value1: "",
              //   },
              // ]);
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
            Add NEw FREQUENCY
          </Button>

          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>frequency Name</TableCell>
                  <TableCell>criteria1</TableCell>
                  {/* <TableCell>criteria2</TableCell>
                  <TableCell>criteria3</TableCell>
                  <TableCell>criteria4</TableCell>
                  <TableCell>criteria5</TableCell> */}
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formList.map((element) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{element?.id}</TableCell>
                    <TableCell>{element?.frequencyName}</TableCell>
                    <TableCell>{element?.criteria1}</TableCell>
                    {/* <TableCell>{element?.criteria2}</TableCell>
                    <TableCell>{element?.criteria3}</TableCell>
                    <TableCell>{element?.criteria4}</TableCell>
                    <TableCell>{element?.criteria5}</TableCell> */}

                    <TableCell component="th" scope="row">
                      <DeleteIcon
                        style={{ color: "red", marginRight: "25px" }}
                        onClick={() => {
                          deleteData(element);
                        }}
                      />
                      <ModeEditIcon
                        onClick={() => {
                          editData();
                          console.log("clicked");
                        }}
                        style={{ color: "green" }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <>
          <div>
            <Button
              onClick={() => {
                setSelectedField(false);
              }}
              variant="contained"
              color="success"
              style={{
                margin: "25px",
                background:
                  "linear-gradient(rgb(244, 103, 236) 0%, rgb(56, 182, 255) 100%)",
              }}
            >
              <KeyboardDoubleArrowLeftIcon /> Go Back
            </Button>
          </div>
          <div>
            <div style={{ float: "right", color: "blue" }}>
              <AddIcon
                onClick={() => {
                  addFeilds();
                }}
              />
            </div>
            <p>Add NEw FREQUENCY</p>

            {form_details.map((item, index) => {
              console.log("1222", item.id);
              return (
                <div style={{ width: "100%", padding: "25px" }}>
                  <div>
                    <div style={{ display: "flex" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginRight: "20px",
                          width: "430px",
                        }}
                      >
                        <label htmlFor="">Frequency Name</label>
                        <SelectField
                          style={{ width: "50%", height: "30px" }}
                          id="frequencyName"
                          name="frequencyName"
                          value={item.frequencyName}
                          onChange={(e) => {
                            inputHandler(e, index);
                          }}
                          placeholder=" Select Frequency Name"
                        >
                          {frequency.map((value) => {
                            return (
                              <option value={value.name}>{value.name}</option>
                            );
                          })}
                        </SelectField>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginRight: "20px",
                          width: "300px",
                        }}
                      >
                        <label htmlFor="">Criteria 1</label>
                        <SelectField
                          style={{ width: "50%", height: "30px" }}
                          id="criteria1"
                          name="criteria1"
                          value={item.criteria1}
                          onChange={(e) => {
                            inputHandler(e, index);
                          }}
                          placeholder="Select Criteria 1"
                        >
                          {catigary.map((value) => {
                            return (
                              <option value={value.name}>{value.name}</option>
                            );
                          })}
                        </SelectField>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginRight: "20px",
                        }}
                      >
                        <label htmlFor="">Value</label>
                        <InputField
                          placeholder=" Enter value"
                          size="small"
                          style={{ width: "50%", height: "30px" }}
                          id="value1"
                          name="value1"
                          type={
                            catigary.find((e) => e.name === item.criteria1)
                              ?.type
                          }
                          value={item.value1}
                          onChange={(e) => {
                            inputHandler(e, index);
                          }}
                        />
                      </div>
                      <div>
                        <RemoveIcon
                          onClick={() => {
                            removeFeilds(item.id);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <Button
              className="gradient-background"
              onClick={() => {
                saveFontdata();
              }}
              style={{
                marginTop: "30px",
                marginLeft: "20px",
                width: "300px%",
                marginButtom: "10px",
                color: "white",
                float: "right",
              }}
            >
              Save
            </Button>
          </div>
        </>
      )}
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <>
              <div style={{ float: "right" }}>
                <CloseIcon
                  onClick={() => {
                    handleClose();
                  }}
                />
              </div>
              <div style={{ width: "100%", padding: "25px" }}>
                <div>
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginRight: "20px",
                        width: "430px",
                      }}
                    >
                      <label htmlFor="">Frequency Name</label>
                      <SelectField
                        style={{ width: "50%", height: "30px" }}
                        id="frequencyName"
                        name="frequencyName"
                        value={modalData.frequencyName}
                        onChange={(e) => {
                          setModalData(e.target.value);
                        }}
                        placeholder=" Select Frequency Name"
                      ></SelectField>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginRight: "20px",
                        width: "300px",
                      }}
                    >
                      <label htmlFor="">Criteria 1</label>
                      <SelectField
                        style={{ width: "50%", height: "30px" }}
                        id="criteria1"
                        name="criteria1"
                        value={modalData.criteria1}
                        onChange={(e) => {
                          setModalData(e.target.value);
                        }}
                        placeholder="Select Criteria 1"
                      ></SelectField>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginRight: "20px",
                      }}
                    >
                      <label htmlFor="">Value</label>
                      <InputField
                        placeholder=" Enter value"
                        size="small"
                        style={{ width: "50%", height: "30px" }}
                        id="value1"
                        name="value1"
                        value={modalData.value1}
                        onChange={(e) => {
                          setModalData(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Button
                  className="gradient-background"
                  onClick={() => {
                    saveFontdata();
                  }}
                  style={{
                    marginTop: "30px",
                    marginLeft: "20px",
                    width: "300px%",
                    marginButtom: "10px",
                    color: "white",
                    float: "right",
                  }}
                >
                  Save
                </Button>
              </div>
            </>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
