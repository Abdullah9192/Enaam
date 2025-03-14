import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Flag from "react-world-flags";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import countries from "../../Assets/Data/CountriesData";

const PhoneInput = ({ value, onChange, onBlur, error, helperText,formik }) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  // Handle country selection change
  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    const country = countries.find((c) => c.code === countryCode);
    setSelectedCountry(country);

    // Remove the old country code and add the new one
    const cleanPhoneNumber = value.replace(/^\+\d+/, "");
    onChange({
      target: {
        name: "phoneNumber",
        value: `+${country.callingCode}${cleanPhoneNumber}`,
      },
    });
  };

  // Handle phone number change
  const handlePhoneNumberChange = (e) => {
    const phoneNumber = e.target.value;

    // If the phone number starts with the selected country code, leave it as is
    if (phoneNumber.startsWith(`+${selectedCountry.callingCode}`)) {
      onChange({ target: { name: "phoneNumber", value: phoneNumber } });
    } else {
      // Otherwise, prepend the selected country code
      onChange({
        target: {
          name: "phoneNumber",
          value: `${phoneNumber.replace(/^\+\d+/, "")}`,
        },
      });
    }
  };

  return (
    <div className="input-group" style={{ display: "flex", width: "100%",marginTop: "8px"  }}>
      <FormControl variant="outlined" sx={{ width: "25%",}}>
        <Select
          value={selectedCountry.code}
          onChange={handleCountryChange}
          error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}   
          displayEmpty
          inputProps={{
            "aria-label": "Country",
          }}
          sx={{
            color: "white",
            borderRadius: "3px 0px 0px 3px",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "#fff",
              borderWidth: "2px",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#fff",
              borderWidth: "2px",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#fff",
              borderWidth: "2px",
            },
            ".MuiSvgIcon-root ": {
              fill: "white !important",
            },
          }}
        >
          {countries.map((country) => (
            <MenuItem key={country.code} value={country.code}>
              <Flag
                code={country.code}
                style={{ width: "20px", height: "20px", marginRight: "5px" }}
                fallback={<span>🌐</span>}
              />
              {country.code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        value={value}
        onChange={handlePhoneNumberChange}
        onBlur={onBlur}
        label="Phone Number"
        id="phoneNumber"
        name="phoneNumber"
        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}   
        variant="outlined"
        fullWidth
        InputLabelProps={{ style: { color: "#fff" } }}
        InputProps={{
          style: {
            borderRadius: "0px 3px 3px 0px",
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            color: "#fff",
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor:
                formik.touched.phoneNumber && formik.errors.phoneNumber
                  ? "#d32f2f"
                  : "#fff",
              color: "#fff",
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
          width: "75%",
        }}
      />
    </div>
  );
};

export default PhoneInput;
