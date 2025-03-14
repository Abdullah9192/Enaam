import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Checkbox, FormControlLabel, IconButton, InputAdornment, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/enaam 4.png";
import PhoneInput from "../../Components/PhoneInput/PhoneInput";
import { DefaultUrl } from "../../Atom";
import { useRecoilState } from "recoil";
import { Post } from "../../Utils/Utils";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { toast } from "react-toastify";

const Register = () => {
  const [defaultUrl] = useRecoilState(DefaultUrl);
  let navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(true);
    const [showPassword1, setShowPassword1] = useState(true);
  
    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
    const togglePasswordVisibility1 = () => setShowPassword1((prev) => !prev);

  const formik = useFormik({
    initialValues: {
      lastName: "",
      firstName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      lastName: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),
      firstName: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phoneNumber: Yup.string().required("Phone is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      console.log("Form Values", values, defaultUrl);
      let obj = {
        email: values.email,
        password: values.password,
        phoneNumber: values.phoneNumber,
        name: values.firstName + ` ` + values.lastName,
      };
      // axios.post(`${defaultUrl}/users`, obj).then((res) => {
      //   console.log(res);
      // }).catch((err) => {
      //   console.log(err);
      // });
      let response = await Post("users", obj);
      if (response.status === 200|| response.status === 201) {
        navigate("/login");
        toast.success("Registration Successful");
      }else{
        toast.error("Error registring a new user");
        return false;
      }
    }
  });

  const customTextFieldStyles = {
    "& .MuiOutlinedInput-root": {
      color: "#fff",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#fff",
        borderWidth: "2px",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#fff",
        borderWidth: "2px",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#fff",
        borderWidth: "2px",
      },
    },
    "& .MuiInputLabel-outlined": {
      color: "#fff",
      fontWeight: "bold",
    },
    color: "#fff",
    marginTop: "8px",
  };

  return (
    <div className="container-fluid container-fluid-register">
      <div className="header">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit} className="form">
        <div className="form-content">
          <div className="text">Sign up</div>
          <span style={{ fontSize: "16px", fontWeight: 400, color: "#fff" }}>
            Let’s get you all st up so you can access your personal account.
          </span>
          <div className="form-fields">
            <div className="row">
              <div className="col-md-6">
                <TextField
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                  InputLabelProps={{ style: { color: "#fff" } }}
                  sx={{ ...customTextFieldStyles }}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  InputLabelProps={{ style: { color: "#fff" } }}
                  sx={{ ...customTextFieldStyles }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  InputLabelProps={{ style: { color: "#fff" } }}
                  sx={{ ...customTextFieldStyles }}
                />
              </div>
              <div className="col-md-6">
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
            </div>

            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type={showPassword?"password":"text"}
              variant="outlined"
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
                        <MdOutlineVisibility color="white"/>
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{ ...customTextFieldStyles }}
              InputLabelProps={{ style: { color: "#fff" } }}
            />
            <TextField
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type={showPassword1?"password":"text"}
              variant="outlined"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility1}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword1 ? (
                        <MdOutlineVisibilityOff color="white" />
                      ) : (
                        <MdOutlineVisibility color="white"/>
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              InputLabelProps={{ style: { color: "#fff" } }}
              sx={{ ...customTextFieldStyles }}
            />
          </div>
          <div className="d-flex align-items-center mt-3">
            <FormControlLabel
              value="policies"
              control={
                <Checkbox
                name="policies"
                id="policies"
                  sx={{
                    color: "#fff",
                    "&.Mui-checked": {
                      color: "#fff",
                    },
                  }}
                />
              }
              id="policies"
              name="policies"
            />
            <label htmlFor="policies" className="">
              I agree to all the{" "}
              <Link className="forgot-password" to={"/terms"}>
                Terms
              </Link>
                    {" "}and{" "}
              <Link className="forgot-password" to={"/terms"}>
                Privacy Policies
              </Link>
            </label>
          </div>
          <div className=" mt-2">
            <button type="submit" className="btn btn-login w-100">
              Create Account
            </button>
          </div>
          <div className="register-text mt-2">
            <span className="text-center">
              I already have an account.{" "}
              <Link className="forgot-password" to="/login">
                Login
              </Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
