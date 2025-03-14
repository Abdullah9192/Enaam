import React from "react";
import {
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
} from "@mui/material";
import { BiSend } from "react-icons/bi";
import { toast } from "react-toastify";
const PromoCode = () => {
  const handleApplyPromoCode = () => {
    // Handle promo code application logic here
    // console.log("Promo code applied!");
    toast.success("Promo code applied!");
  };
  return (
    <FormControl fullWidth variant="outlined">
      <OutlinedInput
        placeholder="Enter Promo Code"
        endAdornment={
          <InputAdornment position="end" sx={{
            borderLeft:"1px solid black"    
          }}>
            <IconButton
              color="warning"
              onClick={handleApplyPromoCode}
              edge="end"
              
            >
              <BiSend/>
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default PromoCode;
