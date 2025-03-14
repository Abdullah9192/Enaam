import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import PhoneInput from "../../Components/PhoneInput/PhoneInput"; // Your custom PhoneInput component
import logo from "../../Assets/enaam 4.png";
import "./Style.css";
import { AccessToken, DefaultUrl, User } from "../../Atom";
import { useRecoilState } from "recoil";
import axios from "axios";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { toast } from "react-toastify";

const Login = () => {
  const [defaultUrl] = useRecoilState(DefaultUrl);
  let navigate = useNavigate();
  // eslint-disable-next-line
  const [_, setAccessToken] = useRecoilState(AccessToken);
  // eslint-disable-next-line
  const [user, setUser] = useRecoilState(User);

  const [emailOrNumber, setEmailOrNumber] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const validationSchema = Yup.object({
    email: emailOrNumber
      ? Yup.string()
          .email("Invalid email address")
          .required("Must enter email address")
      : Yup.string().notRequired(),
    phoneNumber: !emailOrNumber
      ? Yup.string().required("Phone number is required")
      : Yup.string().notRequired(),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setApiError(false);
      setLoader(true);

      toast
        .promise(
          axios.post(`${defaultUrl}/auth/login`, values).then((res) => {
            // Success handling
            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("LogedIn", true);
            localStorage.setItem("userData", JSON.stringify(res.data.data)); // Use JSON.stringify for storing objects
            setUser(res.data.data);
            navigate("/");
          }),
          {
            pending: "Logging in...",
            success: "Login successful!",
            error: "Invalid email or password.",
          }
        )
        .catch((err) => {
          console.error(err);
          setApiError(true);
        })
        .finally(() => {
          setLoader(false);
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
        className="form"
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <div className="form-content">
          <div className="text">Login</div>
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
                        color: "#fff",
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
                          borderColor: apiError ? "#d32f2f" : "#fff",
                          borderWidth: "2px",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: apiError ? "#d32f2f" : "#fff",
                          borderWidth: "2px",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: apiError ? "#d32f2f" : "#fff",
                          borderWidth: "2px",
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
              <TextField
                type={showPassword ? "password" : "text"}
                name="password"
                label="Password"
                variant="outlined"
                fullWidth
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={togglePasswordVisibility}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? (
                          <MdOutlineVisibilityOff color="white" />
                        ) : (
                          <MdOutlineVisibility color="white" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                slotProps={{
                  formHelperText: {
                    sx: { color: (t) => t.palette.error.main },
                  },
                }}
                helperText={formik.touched.password && formik.errors.password}
                InputLabelProps={{ style: { color: "#fff" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "#fff",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: apiError ? "#d32f2f" : "#fff",
                      borderWidth: "2px",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: apiError ? "#d32f2f" : "#fff",
                      borderWidth: "2px",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: apiError ? "#d32f2f" : "#fff",
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiInputLabel-outlined": {
                    color: "#fff",
                    fontWeight: "bold",
                  },
                  marginTop: "10px",
                }}
              />
            </div>
            {apiError && (
              <p className="text-center mt-1">Invalid email or password</p>
            )}
            <div className="d-flex justify-content-between mt-1">
              <div>
                <FormControlLabel
                  value="rememberMe"
                  control={
                    <Checkbox
                      sx={{
                        color: "#fff",
                        "&.Mui-checked": {
                          color: "#fff",
                        },
                      }}
                    />
                  }
                  label="Remember Me"
                  id="rememberMe"
                  name="rememberMe"
                />
              </div>
              <div className="text-end mt-2">
                <Link className="forgot-password" to="/forget-password">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <div className="mb-2">
              <button
                type="submit"
                className="w-100 btn btn-login"
                disabled={loader}
              >
                {loader ? (
                  <div className="d-flex justify-content-center align-items-center">
                    <span className="loader"></span>
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>

          <div className="register-text">
            Don't have an account ?&nbsp;
            <span>
              <Link className="forgot-password" to="/register">
                Register
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
