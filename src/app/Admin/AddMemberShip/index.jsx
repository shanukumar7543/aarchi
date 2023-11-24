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

import { Jodit } from "jodit";
import JoditReact from "jodit-react";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { height } from "@mui/system";
import InputField from "../../component/InputField";
import TextArea from "../../component/TextArea";
import SelectField from "../../component/SelectFeild";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { Editor, EditorState } from "react-draft-wysiwyg";
import {
  // deleteMemberShipApi,
  getBase64,
  getCategoryApi,
  // getMemberShipApi,
  // saveMembershipApi,
} from "../../utils";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { v4 as uuid } from "uuid";
import "./style.css";
// import { useEffect } from "react";
export default function Index() {
  const [selectedField, setSelectedField] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [formList, setFormList] = useState([]);

  const [form_details1, setFormDetails1] = useState({
    id: uuid(),
    title: "",
    category: "",
    duration: "",
    image: "",
    wysiwyg_editor: null,
    link: "",
    price: "",
    price2: "",
    text: "",
    monthly: "",
    annually: "",
    days: "",
  });

  React.useEffect(() => {
    // getMemberShipHandler();
  }, []);

  // const deleteMemberShip = (form_details1) => {
  //   deleteMemberShipApi(form_details1)
  //     .then((response) => {
  //       console.log("545445s", response);
  //       // getMemberShipHandler();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const getCategoryHandler = () => {
    getCategoryApi()
      .then((response) => {
        // console.log("78", response.data.data);
        const resAPiData = response?.data?.data;
        if (resAPiData && resAPiData?.length > 0) {
          setCategoryList(resAPiData);
        } else {
          console.log("dhgh");
          setCategoryList([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    getCategoryHandler();
  }, []);

  // const saveMemberShip = (form_details1) => {
  //   console.log("test", form_details1);
  //   saveMembershipApi(form_details1)
  //     .then((response) => {
  //       console.log("545445s", response);
  //       getMemberShipHandler();
  //       setSelectedField(false);
  //       // handleClose();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // React.useEffect(() => {
  //   getMemberShipHandler();
  // }, []);

  let editerConfig = {
    readonly: false,
    // autofocus: true,
    tabIndex: 1,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    defaultActionOnPaste: "insert_clear_html",
    placeholder: "Write something awesome ...",
    beautyHTML: true,
    toolbarButtonSize: "large",
    buttons: [
      "source",
      "|",
      "bold",
      "italic",
      "|",
      "ul",
      "ol",
      "|",
      "font",
      "fontsize",
      "brush",
      "paragraph",
      "|",
      "video",
      "table",
      "link",
      "|",
      "left",
      "center",
      "right",
      "justify",
      "|",
      "undo",
      "redo",
      "|",
      "hr",
      "eraser",
      "fullsize",
    ],
  };

  const saveFontdata = () => {
    const tempfontdata = localStorage.getItem("form_details1");
    if (tempfontdata) {
      let tempTemplateList = JSON.parse(tempfontdata);
      if (isEdit) {
        tempTemplateList = tempTemplateList.map((temp) => {
          if (temp.id === form_details1.id) {
            return form_details1;
          } else {
            return temp;
          }
        });
        alert("Update Successfully !!");
      } else {
        tempTemplateList.push({ ...form_details1 });
        alert("Save Successfully !!");
      }
      setFormList(tempTemplateList);
      localStorage.setItem("form_details1", JSON.stringify(tempTemplateList));
    } else {
      localStorage.setItem("form_details1", JSON.stringify([form_details1]));
      setFormList([form_details1]);
      alert("Save Successfully !!");
    }
    setSelectedField(false);
    setFormDetails1({
      id: uuid(),
      Title: "",
      category: "",
      duration: "",
      image: "",
      wysiwyg_editor: null,
      link: "",
      price: "",
      price2: "",
      text: "",
      monthly: "",
      annually: "",
      days: "",
      isChecked: false,
    });
  };

  React.useEffect(() => {
    if (localStorage.getItem("form_details1")) {
      let localData = JSON.parse(localStorage.getItem("form_details1"));
      if (localData && localData.length > 0) {
        setFormList(localData);
      }
    }
  }, []);

  const deleteData = (form_details1) => {
    let delData = form_details1.id;
    const listFilterData = formList.filter((ele) => {
      return ele.id !== form_details1.id;
    });
    alert("Delete Sucessfully");
    localStorage.setItem("form_details1", JSON.stringify(listFilterData));
    setFormList(listFilterData);
  };

  const inputHandler = async (e) => {
    let { value, name, type, checked } = e.target;
    if (type === "checkbox") {
      setFormDetails1({
        ...form_details1,
        [name]: checked,
      });
    } else {
      setFormDetails1({
        ...form_details1,
        [name]: value,
      });
    }
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
              setFormDetails1({
                id: uuid(),
                title: "",
                category: "",
                duration: "",
                image: "",
                wysiwyg_editor: null,
                link: "",
                price: "",
                price2: "",
                text: "",
                isChecked: false,
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
            Add Membership
          </Button>

          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Price 1: </TableCell>
                  <TableCell>Price 2:</TableCell>
                  <TableCell>Button text</TableCell>
                  <TableCell>Button link</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formList.map((element) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{element?.id}</TableCell>
                    <TableCell>{element?.title}</TableCell>
                    <TableCell>{element?.category}</TableCell>

                    <TableCell>
                      {
                        <img
                          width={"40px"}
                          src={element?.image}
                          alt="loading"
                        />
                      }
                    </TableCell>
                    <TableCell>{element?.price}</TableCell>
                    <TableCell>{element?.price2}</TableCell>
                    <TableCell>{element?.text}</TableCell>
                    <TableCell>{element?.link}</TableCell>

                    <TableCell component="th" scope="row">
                      <DeleteIcon
                        style={{ color: "red", marginRight: "25px" }}
                        onClick={() => {
                          // deleteMemberShip({
                          //   record_id: [element?.id],
                          // });
                        }}
                      />

                      <ModeEditIcon
                        onClick={() => {
                          setIsEdit(true);
                          setFormDetails1(element);
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
            <p className="form-head">Add Membership choices</p>
          </div>

          <Grid
            className="form-container"
            container
            spacing={3}
            style={{ width: "60%", display: "flex", flexWrap: "wrap" }}
          >
            <Grid item xs={12} md={12}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <label htmlFor="title">Title</label>
                <InputField
                  placeholder=" Enter Title"
                  size="small"
                  style={{ width: "70%", height: "50px" }}
                  id="title"
                  name="title"
                  value={form_details1.title}
                  onChange={inputHandler}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={12}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <label htmlFor="Category">Category</label>
                <br />
                <SelectField
                  style={{ width: "70%", height: "50px" }}
                  id="category"
                  name="category"
                  value={form_details1.category}
                  onChange={inputHandler}
                  placeholder="Select Category"
                >
                  {categoryList.map((category) => {
                    return (
                      <option value={category.category}>
                        {category.category}
                      </option>
                    );
                  })}
                </SelectField>
              </div>
            </Grid>

            <Grid item xs={12} md={12}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <label htmlFor="Price">Price 1: </label>
                <br />
                <InputField
                  placeholder=" Enter Per Month Price"
                  size="small"
                  style={{ width: "28%", height: "50px", marginLeft: "18.5%" }}
                  id="price"
                  name="price"
                  value={form_details1.price}
                  onChange={inputHandler}
                />

                <label htmlFor="Frequency">Frequency </label>

                <SelectField
                  style={{ width: "28%", height: "50px" }}
                  id="monthly"
                  name="monthly"
                  value={form_details1.monthly}
                  onChange={inputHandler}
                  placeholder="Select Here"
                >
                  <option value="monthly">Monthly</option>
                </SelectField>
              </div>
            </Grid>
            <Grid item xs={12} md={12}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <label htmlFor="Price2">Price 2: </label>
                <br />
                <InputField
                  placeholder=" Enter Per annually Price"
                  size="small"
                  style={{ width: "28%", height: "50px", marginLeft: "-7%" }}
                  id="price2"
                  name="price2"
                  value={form_details1.price2}
                  onChange={inputHandler}
                />

                <SelectField
                  style={{ width: "28%", height: "50px" }}
                  id="annually"
                  name="annually"
                  value={form_details1.annually}
                  onChange={inputHandler}
                  placeholder="Select Here"
                >
                  <option value="Annually">Annually</option>
                </SelectField>
              </div>
            </Grid>

            <Grid item xs={12} md={12}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <label htmlFor="Category">Activate trial </label>
                <div className="amt-cont" style={{ width: "72%" }}>
                  <input
                    id="checkbox"
                    type="checkbox"
                    name="isChecked"
                    onChange={inputHandler}
                    checked={form_details1.isChecked}
                    style={{ width: "10%", fontSize: "55px", height: "25px" }}
                  />
                  {form_details1.isChecked ? (
                    <>
                      <InputField
                        placeholder=" Enter Amount"
                        size="small"
                        style={{
                          width: "35%",
                          height: "50px",
                          marginLeft: "15px",
                        }}
                        id="Amount"
                        name="Amount"
                        value={form_details1.amount}
                        onChange={inputHandler}
                      />
                      <InputField
                        placeholder=" Enter Days"
                        size="small"
                        style={{
                          width: "38%",
                          height: "50px",
                          marginLeft: "78px",
                        }}
                        id="data"
                        name="data"
                        value={form_details1.data}
                        onChange={inputHandler}
                      />
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </Grid>

            <Grid item xs={12} md={12}>
              <div>
                <label htmlFor="editer">WYSIWYG Editor</label>
                <JoditReact
                  value={form_details1.wysiwyg_editor}
                  config={editerConfig}
                  onBlur={(value) => {
                    setFormDetails1((preval) => {
                      return {
                        ...preval,
                        wysiwyg_editor: value,
                      };
                    });
                  }}
                />
              </div>
            </Grid>

            <Grid item xs={12} md={12}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <label htmlFor="Category">Button Text</label>
                <br />
                <InputField
                  placeholder=" Enter Text"
                  size="small"
                  style={{ width: "70%", height: "50px" }}
                  id="text"
                  name="text"
                  value={form_details1.text}
                  onChange={inputHandler}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={12}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <label htmlFor="link">Button Link</label>
                <br />
                <InputField
                  placeholder=" Button Link"
                  size="small"
                  style={{ width: "70%", height: "50px" }}
                  id="link"
                  name="link"
                  value={form_details1.link}
                  onChange={inputHandler}
                />
              </div>
            </Grid>

            <Grid
              item
              xs={12}
              md={12}
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <label htmlFor="">Video/Image Upload</label>
              <br />

              <div style={{ display: "none" }}>
                <input
                  type="file"
                  id="upload"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    const b64 = await getBase64(file);
                    setFormDetails1({
                      ...form_details1,
                      image: b64,
                    });
                  }}
                />
              </div>

              <Button
                id="upload-btn"
                className="gradient-background "
                onClick={() => {
                  document.getElementById("upload").click();
                }}
                style={{
                  width: "60%",
                  position: "relative",
                  color: "white",
                }}
              >
                Upload
              </Button>
            </Grid>
          </Grid>
          <Button
            id="save-btn"
            className="gradient-background"
            onClick={() => {
              saveFontdata();
            }}
            style={{
              marginTop: "10px",
              marginLeft: "20px",
              width: "10%",
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
