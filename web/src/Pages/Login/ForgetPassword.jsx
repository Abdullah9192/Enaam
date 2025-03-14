import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField } from "@mui/material";
import PhoneInput from "../../Components/PhoneInput/PhoneInput"; 
import logo from "../../Assets/enaam 4.png";
import "./Style.css";
import { AccessToken, DefaultUrl, User } from "../../Atom";
import { useRecoilState } from "recoil";
import axios from "axios";
import { IoArrowBack } from "react-icons/io5";

const ForgetPassword = () => {
  const [defaultUrl] = useRecoilState(DefaultUrl);
  // eslint-disable-next-line
  const [_, setAccessToken] = useRecoilState(AccessToken);
  // eslint-disable-next-line
  const [user, setUser] = useRecoilState(User);

  const [emailOrNumber, setEmailOrNumber] = useState(true);

  const validationSchema = Yup.object({
    email: emailOrNumber
      ? Yup.string()
          .email("Invalid email address")
          .required("Must enter email address")
      : Yup.string().notRequired(),
    phoneNumber: !emailOrNumber
      ? Yup.string().required("Phone number is required")
      : Yup.string().notRequired(),
  });

  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      // let obj={
      //   email: values.email,
      //   password: values.password,
      // }
      await axios
        .post(`${defaultUrl}/auth/login`, values)
        .then((res) => {
          console.log(res.data.data);
          setAccessToken(res.data.accessToken);
          setUser(res.data.data);

        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
 
  return (
    <div className="form-container-login">
      <div className="header">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
      </div>
      <div
        className="form-forget"
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <div className="form-content p-md-4 p-2">
            <Link to={"/login"}><IoArrowBack /> Back to login</Link>
          <div className="text my-4">Forget your password?</div>
          <span style={{ fontSize: "16px", fontWeight: 400, color: "#fff" }}>
            Let’s get you all st up so you can access your personal account.
          </span>
          <div className="text-white mt-3 d-flex gap-2">
            <button
              className="btn-invisible"
              onClick={() => setEmailOrNumber(true)}
            >
              {emailOrNumber ? <u>Email</u> : <> Email</>}
            </button>
            Or
            <button
              className="btn-invisible"
              onClick={() => setEmailOrNumber(false)}
            >
              {!emailOrNumber ? <u>Phone Number</u> : <> Phone Number</>}
            </button>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="mt-2">
              {!emailOrNumber ? (
                <div className="" style={{ marginTop: "18px" }}>
                  <PhoneInput
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    formik={formik}
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <div
                      className="error-text"
                      style={{
                        color: "#d32f2f",
                        fontSize: "12px",
                        margin: "3px 14px",
                      }}
                    >
                      {formik.errors.phoneNumber}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <TextField
                    type="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    InputLabelProps={{ style: { color: "#fff" } }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: "#fff",
                        fontFamily: "Arial",
                        fontWeight: "bold",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#fff",
                          color: "#fff",
                          borderWidth: "2px",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#fff",
                          color: "#fff",
                          borderWidth: "2px",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#fff",
                          borderWidth: "2px",
                          color: "#fff",
                        },
                      },
                      "& .MuiInputLabel-outlined": {
                        color: "#fff",
                        fontWeight: "bold",
                      },
                      marginTop: "10px",
                    }}
                  />
                </>
              )}

            </div>

            <div className="mt-3">
              <button type="submit" className="w-100 btn btn-login">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
