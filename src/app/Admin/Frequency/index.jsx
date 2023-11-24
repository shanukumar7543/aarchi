import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import * as React from "react";

import SelectField from "../../component/SelectFeild";
import { useState } from "react";
import InputField from "../../component/InputField";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { v4 as uuid } from "uuid";
import "./style.css";
export default function Index() {
  const [selectedField, setSelectedField] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [frequency, setFrequency] = useState([]);
  const [form1List, setForm1List] = useState([]);

  const [frequencyList, setFrequencyList] = useState({
    id: uuid(),
    name: "",
    description: "",
  });

  React.useEffect(() => {
    let data = localStorage.getItem("form_details1");
    console.log("data", data);
    if (data) {
      setForm1List(JSON.parse(data));
    } else {
      setForm1List([]);
    }
  }, []);

  const saveFontdata = () => {
    const tempfontdata = localStorage.getItem("frequencyList");
    if (tempfontdata) {
      let tempTemplateList = JSON.parse(tempfontdata);
      if (isEdit) {
        tempTemplateList = tempTemplateList.map((temp) => {
          if (temp.id === frequencyList.id) {
            return frequencyList;
          } else {
            return temp;
          }
        });
        alert("Update Successfully !!");
      } else {
        tempTemplateList.push({ ...frequencyList });
        alert("Save Successfully !!");
      }
      setFrequency(tempTemplateList);
      localStorage.setItem("frequencyList", JSON.stringify(tempTemplateList));
    } else {
      localStorage.setItem("frequencyList", JSON.stringify([frequencyList]));
      setFrequency([frequencyList]);
      alert("Save Successfully !!");
    }

    setSelectedField(false);
    setFrequencyList({
      id: uuid(),
      name: "",
      frequencyList: "",
    });
  };

  React.useEffect(() => {
    if (localStorage.getItem("frequencyList")) {
      let localData = JSON.parse(localStorage.getItem("frequencyList"));
      if (localData && localData.length > 0) {
        setFrequency(localData);
      }
    }
  }, []);

  const deleteData = (frequencyList) => {
    let delData = frequencyList.id;
    const listFilterData = frequency.filter((ele) => {
      return ele.id !== frequencyList.id;
    });
    alert("Delete Sucessfully");
    localStorage.setItem("frequencyList", JSON.stringify(listFilterData));
    setFrequency(listFilterData);
  };

  const inputHandler = async (e) => {
    let { value, name, type, checked } = e.target;
    if (type === "checkbox") {
      setFrequencyList({
        ...frequencyList,
        [name]: checked,
      });
    } else {
      setFrequencyList({
        ...frequencyList,
        [name]: value,
      });
    }
  };

  return (
    <>
      {!selectedField ? (
        <div>
          <Button
            onClick={() => {
              setIsEdit(false);
              setSelectedField(true);
              setFrequencyList({
                id: uuid(),
                name: "",
                frequencyList: "",
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
            ADD Frequency
          </Button>

          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>NAME</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {frequency.map((element) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{element?.name}</TableCell>
                    <TableCell>{element?.frequencyList}</TableCell>

                    <TableCell component="th" scope="row">
                      <DeleteIcon
                        style={{ color: "red", marginRight: "25px" }}
                        onClick={() => {
                          deleteData(element);
                        }}
                      />
                      <ModeEditIcon
                        onClick={() => {
                          setIsEdit(true);
                          setFrequencyList(element);
                          setSelectedField(true);
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
            <p>ADD Frequency</p>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <div>
                <label htmlFor="duration">Name</label>
                <InputField
                  placeholder=" Enter Duration"
                  size="small"
                  style={{ width: "100%", height: "50px" }}
                  id="name"
                  name="name"
                  value={frequencyList.name}
                  onChange={inputHandler}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div>
                <label htmlFor="duration">Description</label>
                <InputField
                  placeholder=" Enter Description"
                  size="small"
                  style={{ width: "100%", height: "50px" }}
                  id="frequencyList"
                  name="frequencyList"
                  value={frequencyList.frequencyList}
                  onChange={inputHandler}
                />
              </div>
            </Grid>
          </Grid>

          <Button
            className="gradient-background"
            onClick={() => {
              saveFontdata();
            }}
            style={{
              marginTop: "10px",
              marginLeft: "20px",
              width: "300px%",
              marginButtom: "10px",
              color: "white",
            }}
          >
            Save
          </Button>
        </>
      )}
    </>
  );
}
