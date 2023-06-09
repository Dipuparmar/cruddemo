import React from "react";
import { useFormik } from "formik";

import Box from "@mui/material/Box";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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

const WithMaterialUI = (props) => {
  const { toggleFormIsOpen } = props;
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobileNo: "",
      post: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));
      toggleFormIsOpen();
      try {
        return await fetch(`http://localhost:8000/api/entry`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="firstName"
          variant="outlined"
          name="firstName"
          label="First Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          fullWidth
          id="lastName"
          name="lastName"
          variant="outlined"
          label="Last Name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
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
          helperText={formik.touched.email && formik.errors.email}
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
          helperText={formik.touched.mobileNo && formik.errors.mobileNo}
        />{" "}
        <TextField
          fullWidth
          id="post"
          variant="outlined"
          name="post"
          label="Post"
          value={formik.values.post}
          onChange={formik.handleChange}
          error={formik.touched.post && Boolean(formik.errors.post)}
          helperText={formik.touched.post && formik.errors.post}
        />
        <Button
          class="btn btn-dark"
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default WithMaterialUI;
