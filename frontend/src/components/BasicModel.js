
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState } from "react";

import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
// import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import storage from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  firstName: yup
    .string("Enter your firstName")
    .required("First Name is required"),
  lastName: yup.string("Enter your lastName").required("Last Name is required"),
  mobileNo: yup.string("Enter your email").required("Mobile No. is required"),
  post: yup.string("Enter your email").required("Post is required"),
});

export default function BasicModal(props) {
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const { open, handleClose, setEntryUpdate, entryUpdate } = props;
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);
  const [profile, setProfile] = useState(null);

  function handleProfileChange(event) {
    setFile(event.target.files[0]);
  }

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert("Please choose a file first!");
    }
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ); // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setProfile(url);
        });
      }
    );
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobileNo: "",
      post: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      // alert(JSON.stringify(values, null, 2));
      // toggleFormIsOpen();
      const emloyeedata = { ...values, profile: profile };
      try {
        const res = await fetch(`http://localhost:8000/api/entry`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emloyeedata),
        });
        const data = await res.json();
        if (data.status === "success") {
          setProfile(null);
          setEntryUpdate(!entryUpdate);
          resetForm();
        } else {
          alert("email already exist");
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          style={{
            width: "500px",
            background: "white",
            borderRadius: "10px",
            padding: "20px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <form onSubmit={formik.handleSubmit} style={{ textAlign: "center" }}>
            <TextField
              fullWidth
              id="firstName"
              variant="outlined"
              name="firstName"
              label="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              //   helperText={formik.touched.firstName && formik.errors.firstName}
            />{" "}
            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              variant="outlined"
              label="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              //   helperText={formik.touched.lastName && formik.errors.lastName}
            />{" "}
            <TextField
              fullWidth
              id="email"
              name="email"
              variant="outlined"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              //   helperText={formik.touched.email && formik.errors.email}
            />{" "}
            <TextField
              fullWidth
              id="mobileNo"
              name="mobileNo"
              variant="outlined"
              label="Mobile No."
              value={formik.values.mobileNo}
              onChange={formik.handleChange}
              error={formik.touched.mobileNo && Boolean(formik.errors.mobileNo)}
              //   helperText={formik.touched.mobileNo && formik.errors.mobileNo}
            />{" "}
            <TextField
              fullWidth
              id="post"
              name="post"
              variant="outlined"
              label="Post"
              value={formik.values.post}
              onChange={formik.handleChange}
              error={formik.touched.post && Boolean(formik.errors.post)}
              //   helperText={formik.touched.post && formik.errors.post}
            />
            <div style={{ marginTop: "0%" }}>
              <p
                style={{
                  height: "20px",
                  marginBottom: "0%",
                  fontSize: "15px",
                  color: "#C0C0C0",
                }}
              >
                {`${percent} % uploded`}
              </p>
              <Button
                class="btn btn-dark"
                color="primary"
                variant="text"
                component="label"
                fullWidth
                style={{
                  backgroundColor: "lightblue",
                  borderRadius: "10px",
                  padding: "5px 5px",
                  width: "auto",
                  height: "50px"
                }}
                size="medium"
                // onClick={handleUpload}
              >
                Upload Profile Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  style={{ height: "100%" }}
                  hidden
                />
              </Button>
            </div>
            <Button
              class="btn btn-dark"
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              style={{
                borderRadius: "10px",
                padding: "10px 20px",
                marginTop: "20px",
                width: "auto",
              }}
            >
              Submit
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
