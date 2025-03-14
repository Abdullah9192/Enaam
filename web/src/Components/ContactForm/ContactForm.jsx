import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "@mui/material";
import { SlEnvolopeLetter } from "react-icons/sl";
import { FiPhoneCall } from "react-icons/fi";

const ContactForm = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required."),
    phone: Yup.string().required("Phone number is required."),
    email: Yup.string()
      .email("Invalid email address.")
      .required("Email is required."),
    message: Yup.string().required("Message is required."),
  });

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log("Form submitted:", values);
    alert("Message sent successfully!");
    resetForm();
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 py-md-5 py-3">
      <div className="card contactcard p-4 shadow">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="row">
              <div className="col-md-6">
                <h1 className="fw-bolder mt-md-5 mt-3">
                  Get In <span className="yellow">Touch</span>
                </h1>
                <h5>Leave us a message</h5>
                <div className="mb-2">
                  <Field
                    name="name"
                    id="name"
                    as={TextField}
                    label="Name"
                    fullWidth
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </div>
                <div className="mb-2">
                  <Field
                    name="email"
                    id="email"
                    as={TextField}
                    label="Email"
                    type="email"
                    fullWidth
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </div>
                <div className="mb-2">
                  <Field
                    name="phone"
                    id="phone"
                    as={TextField}
                    label="Phone Number"
                    type="text"
                    fullWidth
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                </div>
                <div className="mb-2">
                  <Field
                    name="message"
                    id="message"
                    as={TextField}
                    label="Your Message"
                    fullWidth
                    multiline
                    rows={4}
                    error={touched.message && Boolean(errors.message)}
                    helperText={touched.message && errors.message}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-add-to-cart w-100 btn-lg mt-2"
                >
                  Send
                </button>
                <div className="row mt-3">
                  <div className="col-6">
                    <div className="d-flex align-items-center h-100">
                      <div>
                        <FiPhoneCall size={30} />
                      </div>
                      <div className="w-100 ms-3">
                        Phone
                        <h6 className="yellow">0123123123222</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center h-100">
                      <div>
                        <SlEnvolopeLetter size={30} />
                      </div>
                      <div className="w-100 ms-3">
                        Mail
                        <h6 className="yellow">info@enaam.pk</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 location-text">
                <div id="map" className="map h-100">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31850.10153394507!2d74.29109645801383!3d31.46724248474466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391906abb85c74dd%3A0x355f6b3dda977640!2sAmanah%20Mall!5e0!3m2!1sen!2s!4v1735731310880!5m2!1sen!2s"
                    className="w-100 h-100"
                    title="location"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ border: "0" }}
                  ></iframe>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ContactForm;
