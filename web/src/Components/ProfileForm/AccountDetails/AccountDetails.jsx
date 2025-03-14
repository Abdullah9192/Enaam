import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";

const AccountDetails = () => {
  const initialValues = {
    lastName: "",
    email: "",
    phone: "",
    firstName: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required."),
    lastName: Yup.string().required("Last name is required."),
    phone: Yup.string().required("Phone number is required."),
    email: Yup.string()
      .email("Invalid email address.")
      .required("Email is required."),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log("Form submitted:", values);
    alert("Message sent successfully!");
    resetForm();
  };

  return (
    <div>
      <h4>Account Details</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-3">
              <Field
                name="firstName"
                as={TextField}
                label="First Name"
                fullWidth
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />
            </div>
            <div className="mb-3">
              <Field
                name="lastName"
                as={TextField}
                label="Last Name"
                fullWidth
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
            </div>
            <div className="mb-3">
              <Field
                name="email"
                as={TextField}
                label="Email"
                type="email"
                fullWidth
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </div>
            <div className="mb-3">
              <Field
                name="phone"
                as={TextField}
                label="Phone"
                type="text"
                fullWidth
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone}
              />
            </div>
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="primary"
              className="btn-add-to-cart"
            >
              Save Changes
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AccountDetails;
