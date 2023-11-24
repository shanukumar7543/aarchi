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
  const [formList, setFormList] = useState([]);
  const [form1List, setForm1List] = useState([]);

  const [description, setDescription] = useState({
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
    const tempfontdata = localStorage.getItem("description");
    if (tempfontdata) {
      let tempTemplateList = JSON.parse(tempfontdata);
      if (isEdit) {
        tempTemplateList = tempTemplateList.map((temp) => {
          if (temp.id === description.id) {
            return description;
          } else {
            return temp;
          }
        });
        alert("Update Successfully !!");
      } else {
        tempTemplateList.push({ ...description });
        alert("Save Successfully !!");
      }
      setFormList(tempTemplateList);
      localStorage.setItem("description", JSON.stringify(tempTemplateList));
    } else {
      localStorage.setItem("description", JSON.stringify([description]));
      setFormList([description]);
      alert("Save Successfully !!");
    }

    setSelectedField(false);
    setDescription({
      id: uuid(),
      name: "",
      description: "",
    });
  };

  React.useEffect(() => {
    if (localStorage.getItem("description")) {
      let localData = JSON.parse(localStorage.getItem("description"));
      if (localData && localData.length > 0) {
        setFormList(localData);
      }
    }
  }, []);

  const deleteData = (description) => {
    let delData = description.id;
    const listFilterData = formList.filter((ele) => {
      return ele.id !== description.id;
    });
    alert("Delete Sucessfully");
    localStorage.setItem("description", JSON.stringify(listFilterData));
    setFormList(listFilterData);
  };

  const inputHandler = async (e) => {
    let { value, name, type, checked } = e.target;
    if (type === "checkbox") {
      setDescription({
        ...description,
        [name]: checked,
      });
    } else {
      setDescription({
        ...description,
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
              setDescription({
                id: uuid(),
                name: "",
                description: "",
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
            ADD Features
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
                {formList.map((element) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{element?.name}</TableCell>
                    <TableCell>{element?.description}</TableCell>

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
                          setDescription(element);
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
            <p>ADD Features</p>
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
                  value={description.name}
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
                  id="description"
                  name="description"
                  value={description.description}
                  onChange={inputHandler}
                />
              </div>
            </Grid>
          </Grid>

          <div className="feature">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "15px",
                width: "400px",
              }}
            >
              <div>Membership</div>
              <div>
                <SelectField
                  style={{ width: "100%", height: "20px" }}
                  id=""
                  name="titel"
                  value={form1List.title}
                  placeholder="Business builders"
                >
                  {form1List.map((value) => {
                    return <option value={value.title}>{value.title}</option>;
                  })}
                </SelectField>
              </div>
            </div>

            {[
              "Corporate Membership",
              "Individual Membership",
              "Lending Feature",
              "Borrowing Feature",
              "Metaverse Access",
              "Staking Feature",
              "Agency Feature",
              "Facilitation Feature",
              "Ship Gifts feature",
              "Property feature",
            ].map((item) => {
              return (
                <div className="d-flex space-weetbeen">
                  <input
                    className="input"
                    type="checkbox"
                    style={{ width: "20px" }}
                  />
                  <label htmlFor="">{item}</label>
                </div>
              );
            })}
          </div>

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
