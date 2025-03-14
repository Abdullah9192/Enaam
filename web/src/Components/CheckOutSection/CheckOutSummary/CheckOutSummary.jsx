import React from "react";
import { Button } from "@mui/material";

const CheckOutSummary = ({ totalAmount }) => {
  let tax = totalAmount * 0.16;
  let subTotal = totalAmount + tax;
  return (
    <div className="card p-3 mt-3">
      <h5 className="text-center">ORDER SUMMARY</h5>
      <hr />
      <table className="table table-responsive table-borderless">
        <tbody>
          <tr>
            <td>Total: </td>
            <td className="text-end">RS. {totalAmount}</td>
          </tr>
          <tr>
            <td>Tax(16%) </td>
            <td className="text-end">RS. {tax}</td>
          </tr>
          <tr>
            <td>Sub Total: </td>
            <td className="text-end">RS. {subTotal}</td>
          </tr>
        </tbody>
      </table>
      <hr />
     <h5 className="text-center">Promo code Status</h5>
      <hr />
      <table>
        <tbody>
          <tr>
            <td>Grand Total: </td>
            <td className="text-end">RS. {subTotal}</td>
          </tr>
        </tbody>
      </table>
      <Button variant="contained" size="large" className="btn-add-to-cart mt-3 " fullWidth>Proceed  To Pay</Button>
    </div>
  );
};

export default CheckOutSummary;
