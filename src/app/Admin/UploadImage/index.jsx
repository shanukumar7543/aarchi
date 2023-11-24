import { Button, TextField } from "@mui/material";
import { height } from "@mui/system";
import React from "react";
import "./style.scss";

export default function Index() {
  return (
    <>
      <div style={{ display: "flex", height: "160px", width: "90vw" }}>
        <div className=" imgg">
          <p className="text">Logo</p>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVq3vo1Myh1Y5c6xDPWhaQ5n0f16-1-um-9g&usqp=CAU"
            class="img-fluid rounded-top"
            height="80"
            width="70"
            alt=""
          />
          <br />
          <Button className="gradient-background ">Upload</Button>
        </div>
        <div className=" imgg border">
          <p className="text">Logo</p>
          <img
            className="imgg"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVq3vo1Myh1Y5c6xDPWhaQ5n0f16-1-um-9g&usqp=CAU"
            class="img-fluid rounded-top"
            height="100"
            width="70"
            alt=""
          />
          <br />
          <Button className="gradient-background ">Upload</Button>
        </div>
        <div className=" imgg">
          <p className="text">Logo</p>
          <img
            className="imgg"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVq3vo1Myh1Y5c6xDPWhaQ5n0f16-1-um-9g&usqp=CAU"
            class="img-fluid rounded-top"
            height="80"
            width="70"
            alt=""
          />
          <br />
          <Button className="gradient-background ">Upload</Button>
        </div>
        <div className=" imgg">
          <p className="text">Logo</p>
          <img
            className="imgg"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVq3vo1Myh1Y5c6xDPWhaQ5n0f16-1-um-9g&usqp=CAU"
            height="80"
            width="70"
            class="img-fluid rounded-top"
            alt=""
          />
          <br />
          <Button className="gradient-background ">Upload</Button>
        </div>
      </div>

      <div className="mb-4 p-4 mt-4" style={{ width: "600px" }}>
        <label className="mb-2">Update Title</label>
        <br />
        <TextField className="gradient-border" fullWidth id="fullWidth" />
        {/* <input
            style={{ width: "100%" }}
            className=" input"
            type="text"
            placeholder=" Type Update Titel"
          /> */}
        <br />
        <label>Update Subtitle</label>
        <br />
        <TextField className="gradient-border" fullWidth id="fullWidth" />
      </div>

      <div style={{ display: "flex" }}>
        {/* <div>
          <div>
            <p>ADD FORONT PAGE SLIDE</p>
          </div>
          <div>
            <label htmlFor="">Titel</label>
            <input
              type="text"
              style={{ marginLeft: "126px", marginBottom: "10px" }}
              placeholder=""
            />
          </div>

          <div>
            <label htmlFor="">Category</label>
            <input
              style={{ marginLeft: "93px", marginBottom: "10px" }}
              type="text"
              placeholder=""
            />
          </div>

          <div>
            <label htmlFor="">Duration</label>
            <input
              style={{ marginLeft: "98px", marginBottom: "10px" }}
              type="text"
              placeholder=""
            />
          </div>

          <div>
            <label htmlFor="">WYSIWYG Editor</label>
            <input
              style={{
                marginLeft: "36px",
                marginBottom: "10px",
                height: "200px",
              }}
              type="text"
              placeholder=""
            />
          </div>

          <div>
            <label htmlFor="">Button Text</label>
            <input
              style={{ marginLeft: "80px", marginBottom: "10px" }}
              type="text"
              placeholder=""
            />
          </div>

          <div>
            <label htmlFor="">Button Link</label>
            <input
              style={{ marginLeft: "79px", marginBottom: "10px" }}
              type="text"
              placeholder=""
            />
          </div>

          <div>
            <label htmlFor="">Tokenomics section 1</label>
            <input className="secinp" type="text" placeholder="" />
          </div>

          <div>
            <label htmlFor="">Tokenomics section 2</label>
            <input className="secinp" type="text" placeholder="" />
          </div>

          <div>
            <label htmlFor="">Tokenomics section 3</label>
            <input className="secinp" type="text" placeholder="" />
          </div>

          <div>
            <label htmlFor="">Tokenomics section 4</label>
            <input className="secinp" type="text" placeholder="" />
          </div>

          <div>
            <label htmlFor="">Video/Image Upload</label>
            <Button>Upload Images</Button> <Button>Upload Video</Button>
          </div>
        </div>
        {/* //2nd */}
        {/* <div>
          <div
            style={{
              marginLeft: "520px",
              height: "160px",
              width: "350px",
              border: "2px solid black",
              padding: "5px",
            }}
          >
            <p>Create New Cataigory</p>
            <div>
              <label htmlFor="">Cataigory</label>
              <input style={{ marginLeft: "25px" }} type="text" />
            </div>
            <div>
              <label htmlFor="">Referer Link</label>
              <input style={{ marginLeft: "9px" }} type="text" />
            </div>
            <div>
              <Button
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
          </div>

          <div
            style={{
              marginTop: "20px",
              marginLeft: "520px",
              height: "220px",
              width: "350px",
              border: "2px solid black",
              padding: "5px",
            }}
          >
            <p>Edit Cataigory</p>
            <div>
              <input style={{ marginLeft: "25px" }} type="text" />
            </div>
            <div>
              <input style={{ marginLeft: "9px" }} type="text" />
            </div>
            <div>
              <input style={{ marginLeft: "25px" }} type="text" />
            </div>
            <div>
              <input style={{ marginLeft: "9px" }} type="text" />
            </div>
            <div>
              <input style={{ marginLeft: "9px" }} type="text" />
            </div>
          </div>

          <div
            style={{
              marginTop: "15px",
              marginLeft: "520px",
              height: "300px",
              width: "350px",
              border: "2px solid black",
              // padding: "5px",
              paddingLeft: "15px",
            }}
          >
            <p>Edit Shlide</p>
            <br />
            <div>
              <label style={{ paddingLeft: "40px" }} htmlFor="">
                {" "}
                Category
              </label>
              <input type="text" placeholder="Invest" />
            </div>
            <div>
              <input style={{ marginLeft: "px", width: "100%" }} type="text" />
            </div>
            <div>
              <input style={{ marginLeft: "9px" }} type="text" />
            </div>
            <div>
              <input style={{ marginLeft: "25px" }} type="text" />
            </div>
            <div>
              <input style={{ marginLeft: "9px" }} type="text" />
            </div>
            <div>
              <input style={{ marginLeft: "25px" }} type="text" />
            </div>
            <div>
              <input style={{ marginLeft: "9px" }} type="text" />
            </div>
          </div>
        </div>  */}
      </div>
    </>
  );
}
