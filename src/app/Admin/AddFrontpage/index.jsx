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
import { getBase64, getCategoryApi } from "../../utils";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { v4 as uuid } from "uuid";
import "./style.css";
import axios from "axios";
export default function Index() {
  const [selectedField, setSelectedField] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [formList, setFormList] = useState([]);

  const [form_details, setFormDetails] = useState({
    id: uuid(),
    category: "",
    duration: "",
    image: "",
    wysiwyg_editor: null,
    is_abundance_token: false,
    is_utopia: false,
    is_user_balance: false,
    is_button1: false,
    is_button2: false,
    is_button3: false,
    btn1_text: "",
    btn2_text: "",
    btn3_text: "",
    btn1_link: "",
    btn2_link: "",
    btn3_link: "",
  });

  const { swagerData, setSwagerData } = useState({
    id: 0,
    category_id: 0,
    duration: 0,
    description: "string",
    isUtopia: true,
    isAbundance: true,
    isUserBalance: true,
    buttonsList: [
      {
        id: 0,
        name: "string",
        link: "string",
      },
    ],
  });

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

  // const saveSlider = (form_details) => {
  //   const token = localStorage.getItem("token");
  //   const config = {
  //     headers: {
  //       Authorization: `bearer ${token}`,
  //     },
  //   };
  //   axios
  //     .post("http://20.77.73.112:5005/api/Slider/add", form_details, config)
  //     .then((response) => {
  //       console.log("res", response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

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
    const tempfontdata = localStorage.getItem("form_details");
    if (tempfontdata) {
      let tempTemplateList = JSON.parse(tempfontdata);
      if (isEdit) {
        tempTemplateList = tempTemplateList.map((temp) => {
          if (temp.id === form_details.id) {
            return form_details;
          } else {
            return temp;
          }
        });
        alert("Update Successfully !!");
      } else {
        tempTemplateList.push({ ...form_details });
        alert("Save Successfully !!");
      }
      setFormList(tempTemplateList);
      localStorage.setItem("form_details", JSON.stringify(tempTemplateList));
    } else {
      localStorage.setItem("form_details", JSON.stringify([form_details]));
      setFormList([form_details]);
      alert("Save Successfully !!");
    }
    setSelectedField(false);
    setFormDetails({
      id: uuid(),
      category: "",
      duration: "",
      image: "",
      wysiwyg_editor: null,
      is_abundance_token: false,
      is_utopia: false,
      is_user_balance: false,
      is_button1: false,
      is_button2: false,
      is_button3: false,
      btn1_text: "",
      btn2_text: "",
      btn3_text: "",
      btn1_link: "",
      btn2_link: "",
      btn3_link: "",
    });
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

  const inputHandler = async (e) => {
    let { value, name, type, checked } = e.target;
    if (type === "checkbox") {
      setFormDetails({
        ...form_details,
        [name]: checked,
      });
    } else {
      setFormDetails({
        ...form_details,
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
              setFormDetails({
                id: uuid(),
                category: "",
                duration: "",
                image: "",
                wysiwyg_editor: null,
                is_abundance_token: false,
                is_utopia: false,
                is_user_balance: false,
                is_button1: false,
                is_button2: false,
                is_button3: false,
                btn1_text: "",
                btn2_text: "",
                btn3_text: "",
                btn1_link: "",
                btn2_link: "",
                btn3_link: "",
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
            ADD FRONT PAGE SLIDE
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
                  <TableCell>Sub Title</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formList.map((element) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{element?.id}</TableCell>
                    <TableCell>{element?.duration}</TableCell>

                    <TableCell>
                      {
                        <img
                          width={"40px"}
                          src={element?.image}
                          alt="loading"
                        />
                      }
                    </TableCell>

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
                          setFormDetails(element);
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

          {/* <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Sub Title</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categoryList.map((element) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{element?.id}</TableCell>
                    <TableCell>{element?.duration}</TableCell>

                    <TableCell>
                      {
                        <img
                          width={"40px"}
                          src={element?.image}
                          alt="loading"
                        />
                      }
                    </TableCell>

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
                          setFormDetails(element);
                          setSelectedField(true);
                        }}
                        style={{ color: "green" }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> */}
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
            <p>ADD FRONT PAGE SLIDE</p>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <div>
                <label htmlFor="Category">Category</label>
                <br />
                <SelectField
                  style={{ width: "100%", height: "50px" }}
                  id="category"
                  name="category"
                  value={form_details.category}
                  onChange={inputHandler}
                  placeholder="Select Category"
                >
                  {categoryList.map((category) => {
                    console.log("category", category);
                    return <option value={category.id}>{category.type}</option>;
                  })}
                </SelectField>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div>
                <label htmlFor="duration">Duration</label>
                <InputField
                  placeholder=" Enter Duration"
                  size="small"
                  style={{ width: "100%", height: "50px" }}
                  id="duration"
                  name="duration"
                  value={form_details.duration}
                  onChange={inputHandler}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div>
                <label htmlFor="editer">WYSIWYG Editor</label>
                <JoditReact
                  value={form_details.wysiwyg_editor}
                  config={editerConfig}
                  onBlur={(value) => {
                    setFormDetails((preval) => {
                      return {
                        ...preval,
                        wysiwyg_editor: value,
                      };
                    });
                  }}
                />
              </div>
            </Grid>

            <Grid item xs={12} md={6}>
              <label htmlFor="">Video/Image Upload</label>
              <br />

              <div style={{ display: "none" }}>
                <input
                  type="file"
                  id="upload"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    const b64 = await getBase64(file);
                    setFormDetails({
                      ...form_details,
                      image: b64,
                    });
                  }}
                />
              </div>

              <Button
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

            <Grid
              style={{ display: "flex", flexDirection: "column" }}
              item
              xs={12}
              md={6}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <input
                  onChange={inputHandler}
                  type="checkbox"
                  name="is_utopia"
                  checked={form_details.is_utopia}
                  style={{ height: "20px", width: "20px", marginRight: "10px" }}
                />
                <label htmlFor="editer">Utopia</label>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <input
                  onChange={inputHandler}
                  type="checkbox"
                  name="is_abundance_token"
                  checked={form_details.is_abundance_token}
                  style={{ height: "20px", width: "20px", marginRight: "10px" }}
                />
                <label htmlFor="editer">Abundance Token</label>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <input
                  onChange={inputHandler}
                  type="checkbox"
                  name="is_user_balance"
                  checked={form_details.is_user_balance}
                  style={{ height: "20px", width: "20px", marginRight: "10px" }}
                />
                <label htmlFor="editer">User Balance</label>
              </div>
            </Grid>
            <Grid
              style={{
                padding: "25px",
                display: "flex",
                flexDirection: "column",
              }}
              item
              xs={12}
              md={6}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <input
                    onChange={(e) => {
                      setFormDetails((preval) => {
                        return {
                          ...preval,
                          is_button1: e.target.checked,
                        };
                      });
                    }}
                    type="checkbox"
                    name="is_button1"
                    id=""
                    checked={form_details.is_button1}
                    style={{
                      height: "20px",
                      width: "20px",
                      marginRight: "10px",
                    }}
                  />
                  <label htmlFor="editer">Button 1</label>
                </div>
                <div>
                  {form_details.is_button1 && (
                    <>
                      <div className="d-flex">
                        <InputField
                          placeholder=" Enter Button text"
                          name="btn1_text"
                          value={form_details.btn1_text}
                          onChange={inputHandler}
                          style={{
                            width: "40%",
                            height: "50px",
                            marginRight: "10px",
                          }}
                        />

                        <InputField
                          placeholder="Enter Button link"
                          name="btn1_link"
                          value={form_details.btn1_link}
                          onChange={inputHandler}
                          style={{ width: "40%", height: "50px" }}
                        />
                      </div>
                      <br />
                    </>
                  )}
                </div>
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <input
                    onChange={(e) => {
                      setFormDetails((preval) => {
                        return {
                          ...preval,
                          is_button2: e.target.checked,
                        };
                      });
                    }}
                    type="checkbox"
                    name="is_button2"
                    id=""
                    checked={form_details.is_button2}
                    style={{
                      height: "20px",
                      width: "20px",
                      marginRight: "10px",
                    }}
                  />
                  <label htmlFor="editer">Button 2</label>
                </div>
                <div>
                  {form_details.is_button2 && (
                    <>
                      <div className="d-flex">
                        <InputField
                          placeholder=" Enter Button text"
                          name="btn2_text"
                          value={form_details.btn2_text}
                          onChange={inputHandler}
                          style={{
                            width: "40%",
                            height: "50px",
                            marginRight: "10px",
                          }}
                        />

                        <InputField
                          placeholder="Enter Button link"
                          name="btn2_link"
                          value={form_details.btn2_link}
                          onChange={inputHandler}
                          style={{ width: "40%", height: "50px" }}
                        />
                      </div>
                      <br />
                    </>
                  )}
                </div>
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <input
                    onChange={(e) => {
                      setFormDetails((preval) => {
                        return {
                          ...preval,
                          is_button3: e.target.checked,
                        };
                      });
                    }}
                    type="checkbox"
                    name="is_button3"
                    id=""
                    checked={form_details.is_button3}
                    style={{
                      height: "20px",
                      width: "20px",
                      marginRight: "10px",
                    }}
                  />
                  <label htmlFor="editer">Button 3</label>
                </div>
                <div>
                  {form_details.is_button3 && (
                    <>
                      <div className="d-flex">
                        <InputField
                          placeholder=" Enter Button text"
                          name="btn3_text"
                          value={form_details.btn3_text}
                          onChange={inputHandler}
                          style={{
                            width: "40%",
                            height: "50px",
                            marginRight: "10px",
                          }}
                        />

                        <InputField
                          placeholder="Enter Button link"
                          name="btn3_link"
                          value={form_details.btn3_link}
                          onChange={inputHandler}
                          style={{ width: "40%", height: "50px" }}
                        />
                      </div>
                      <br />
                    </>
                  )}
                </div>
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

          <div style={{ padding: "35px" }} className="preview-box">
            <div className="">
              <div style={{ width: "450px" }} className="">
                <div></div>
                <div></div>
              </div>
              {/* //2nd */}
              <div>
                {/* <div
                  className="MuiOutlinedInput-root mb-4"
                  style={{
                    height: "180px",
                    width: "350px",
                    padding: "10px",
                  }}
                >
                  <p>Create New Cataigory</p>
                  <div className="d-flex justify-content-between mb-1">
                    <label htmlFor="">Cataigory</label>
                    <InputField className="input" size="small" id="fullWidth" />
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <label htmlFor="">Referer Link</label>
                    <InputField className="input" size="small" id="fullWidth" />
                  </div>
                  <div>
                    <Button
                      className="gradient-background "
                      style={{
                        float: "right",
                        border: "2px solid blue",
                        borderRadius: "30px",
                        background: "red",
                        color: "white",
                      }}
                    >
                      Add New Cataigory
                    </Button>
                  </div>
                </div> */}

                {/* //3 */}
                {/* <div
                  className="MuiOutlinedInput-root"
                  style={{
                    //   width: "400px",
                    //   height: "450px",
                    //   border: "2px solid black",
                    padding: "5px",
                  }}
                >
                  <p>Edit Cataigory</p>
                  <div className="d-flex justify-content-between mb-1">
                    <InputField
                      style={{ width: "100%" }}
                      className="gradient-border input"
                      fullWidth
                      id="fullWidth"
                    />
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <InputField
                      style={{ width: "100%" }}
                      className="gradient-border input "
                      fullWidth
                      id="fullWidth"
                    />
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <InputField
                      style={{ width: "100%" }}
                      className="gradient-border input"
                      fullWidth
                      id="fullWidth"
                    />
                  </div>
                  <div>
                    <InputField
                      style={{ width: "100%" }}
                      className="gradient-border input"
                      fullWidth
                      id="fullWidth"
                    />
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <InputField
                      style={{ width: "100%" }}
                      className="gradient-border input"
                      fullWidth
                      id="fullWidth"
                    />
                  </div>
                </div> */}

                {/* <div
                  className="MuiOutlinedInput-root input"
                  style={{
                    marginTop: "5px",
                    padding: "5px",
                    width: "100%",
                  }}
                >
                  <p>Edit Slides</p>
                  <br />
                  <div className="d-flex justify-content-between mb-1">
                    <label htmlFor="">Category1</label>
                    <SelectField
                      style={{ width: "100%" }}
                      className="gradient-border input"
                      id=""
                    >
                      <option value={""}>Select</option>
                    </SelectField>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <InputField
                      style={{ width: "100%" }}
                      className="gradient-border input"
                      fullWidth
                      id="fullWidth"
                    />
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <InputField
                      style={{ width: "100%" }}
                      className="gradient-border input"
                      fullWidth
                      id="fullWidth"
                    />
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <InputField
                      style={{ width: "100%" }}
                      className="gradient-border input"
                      fullWidth
                      id="fullWidth"
                    />
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <InputField
                      style={{ width: "100%" }}
                      className="gradient-border input"
                      fullWidth
                      id="fullWidth"
                    />
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <InputField
                      style={{ width: "100%" }}
                      className="gradient-border input"
                      fullWidth
                      id="fullWidth"
                    />
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <InputField
                      style={{ width: "100%" }}
                      className="gradient-border input"
                      fullWidth
                      id="fullWidth"
                    />
                  </div>
                </div> */}
              </div>
            </div>
            {/* // Card */}

            <div
              className="gradient-border"
              style={{
                // width: "900px",
                marginTop: "30px",
                height: "380px",
                border: "2px solid black",
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
                overflowY: "auto",
                // padding: "25px",
              }}
            >
              <div
                className="preview-img"
                style={{
                  width: "60%",
                  border: "2px solid transparent",
                  borderRadius: "20px",
                }}
              >
                <img
                  style={{ borderRadius: "20px" }}
                  src={form_details.image}
                  height="100%"
                  width="100%"
                  alt="Loading"
                />
              </div>

              <div
                style={{ width: "40%", color: "rgb(175,133,243)" }}
                className="px-4 preview-txt"
              >
                {/* <div>{form_details.wysiwyg_editor}</div> */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: form_details.wysiwyg_editor,
                  }}
                />
                <h2 className="">{/* <b>{form_details.category}</b> */}</h2>
                <p style={{ color: "rgb(175,133,243)" }}>
                  {/* {form_details.duration} */}
                </p>

                <br />
                {form_details.is_button1 && (
                  <Button
                    onClick={() => {
                      openLinkHandler(form_details.btn1_link);
                    }}
                    style={{
                      background: "rgb(56,182,255)",
                      width: "100%",
                      color: "white",
                    }}
                  >
                    <span style={{ float: "right" }}>
                      {form_details.btn1_text ? form_details.btn1_text : "USDT"}
                    </span>
                  </Button>
                )}
                <br />
                {form_details.is_button2 && (
                  <Button
                    onClick={() => {
                      openLinkHandler(form_details.btn2_link);
                    }}
                    style={{
                      marginTop: "10px",
                      background: "rgb(56,182,255)",
                      width: "100%",
                      marginButtom: "10px",
                      color: "white",
                    }}
                  >
                    <span style={{ float: "right" }}>
                      {form_details.btn2_text
                        ? form_details.btn2_text
                        : "UTOPIA"}
                    </span>
                  </Button>
                )}
                <br />

                {form_details.is_button3 && (
                  <Button
                    onClick={() => {
                      openLinkHandler(form_details.btn3_link);
                    }}
                    style={{
                      marginTop: "10px",
                      background: "red",
                      width: "100%",
                      marginButtom: "10px",
                      color: "white",
                    }}
                  >
                    {form_details.btn3_text
                      ? form_details.btn3_text
                      : "BUY NOW"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
