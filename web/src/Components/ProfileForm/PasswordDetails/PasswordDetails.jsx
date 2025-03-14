import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";

const PasswordDetails = () => {
  const initialValues = {
    confirmPassword: "",
    newPassword: "",
    oldPassword: "",
  };
  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Old password is required."),
    newPassword: Yup.string().required("New password is required."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match.")
      .required("Confirm password is required."),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log("Form submitted:", values);
    alert("Message sent successfully!");
    resetForm();
  };

  return (
    <div>
      <h4>Password Details</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-3">
              <Field
                name="oldPassword"
                as={TextField}
                type="password"
                label="First Name"
                fullWidth
                error={touched.oldPassword && Boolean(errors.oldPassword)}
                helperText={touched.oldPassword && errors.oldPassword}
              />
            </div>
            <div className="mb-3">
              <Field
                name="newPassword"
                as={TextField}
                label="New Password"
                type="password"
                fullWidth
                error={touched.newPassword && Boolean(errors.newPassword)}
                helperText={touched.newPassword && errors.newPassword}
              />
            </div>
            <div className="mb-3">
              <Field
                name="confirmPassword"
                as={TextField}
                label="Confirm Password"
                type="password"
                fullWidth
                error={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
                helperText={touched.confirmPassword && errors.confirmPassword}
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

export default PasswordDetails;
