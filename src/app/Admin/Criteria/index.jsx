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
  const [criteriaList, setCriteriaList] = useState([]);
  const [form1List, setForm1List] = useState([]);

  const [criteria, setCriteria] = useState({
    id: uuid(),
    name: "",
    description: "",
    type: "",
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
    const tempfontdata = localStorage.getItem("criteria");
    if (tempfontdata) {
      let tempTemplateList = JSON.parse(tempfontdata);
      if (isEdit) {
        tempTemplateList = tempTemplateList.map((temp) => {
          if (temp.id === criteria.id) {
            return criteria;
          } else {
            return temp;
          }
        });
        alert("Update Successfully !!");
      } else {
        tempTemplateList.push({ ...criteria });
        alert("Save Successfully !!");
      }
      setCriteriaList(tempTemplateList);
      localStorage.setItem("criteria", JSON.stringify(tempTemplateList));
    } else {
      localStorage.setItem("criteria", JSON.stringify([criteria]));
      setCriteriaList([criteria]);
      alert("Save Successfully !!");
    }

    setSelectedField(false);
    setCriteria({
      id: uuid(),
      name: "",
      criteria: "",
    });
  };

  React.useEffect(() => {
    if (localStorage.getItem("criteria")) {
      let localData = JSON.parse(localStorage.getItem("criteria"));
      if (localData && localData.length > 0) {
        setCriteriaList(localData);
      }
    }
  }, []);

  const deleteData = (criteria) => {
    let delData = criteria.id;
    const listFilterData = criteriaList.filter((ele) => {
      return ele.id !== criteria.id;
    });
    alert("Delete Sucessfully");
    localStorage.setItem("criteria", JSON.stringify(listFilterData));
    setCriteriaList(listFilterData);
  };

  const inputHandler = async (e) => {
    let { value, name, type, checked } = e.target;
    if (type === "checkbox") {
      setCriteria({
        ...criteria,
        [name]: checked,
      });
    } else {
      setCriteria({
        ...criteria,
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
              setCriteria({
                id: uuid(),
                name: "",
                description: "",
                type: "",
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
            ADD Criteria
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
                  <TableCell>Type</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {criteriaList.map((element) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{element?.name}</TableCell>
                    <TableCell>{element?.description}</TableCell>
                    <TableCell>{element?.type}</TableCell>

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
                          setCriteria(element);
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
            <p>ADD Criteria</p>
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
                  value={criteria.name}
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
                  value={criteria.description}
                  onChange={inputHandler}
                />
              </div>
            </Grid>
          </Grid>
          <Grid>
            <Grid item xs={12} md={6}>
              <div>
                <label htmlFor="duration">Type</label>
                <SelectField
                  style={{ width: "100%", height: "50px" }}
                  placeholder="Select type"
                  size="small"
                  id="type"
                  name="type"
                  value={criteria.type}
                  onChange={inputHandler}
                >
                  <option> Number</option>
                  <option> Boolean</option>
                  <option> string</option>
                </SelectField>
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
