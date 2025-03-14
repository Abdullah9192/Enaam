import React from "react";
import PromoCode from "../../PromoCode/PromoCode";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { cartData, DefaultUrl, User } from "../../../Atom";
import { useRecoilState } from "recoil";

const CartSummary = ({ totalAmount }) => {
    const [userData] = useRecoilState(User);
    // eslint-disable-next-line 
      const [cart, setCart] = useRecoilState(cartData);
    const [defaultUrl] = useRecoilState(DefaultUrl);
  let tax = totalAmount * 0.16;
  let subTotal = totalAmount + tax;
  let navigate = useNavigate();

  const handleCheckout = () => {
    setCart((prevCart) => {
      const updatedCart = prevCart;

      const myCart = {
        cartItems: updatedCart,
        total: updatedCart.reduce(
          (acc, product) => acc + product.price * (product.quantity || 1),
          0
        ),
      };

      axios
        .put(`${defaultUrl}/cart/${userData.id}`, myCart)
        .then((res) => {
          // console.log(res);
          navigate("/gamesection");
        })
        .catch((err) => {
          console.error("Error updating the cart:", err);
        });

      return updatedCart;
    });
  };


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
      <PromoCode />
      <hr />
      <table>
        <tbody>
          <tr>
            <td>Grand Total: </td>
            <td className="text-end">RS. {subTotal}</td>
          </tr>
        </tbody>
      </table>
      <Button
        variant="contained"
        size="large"
        className="btn-add-to-cart mt-3 "
        fullWidth
        onClick={handleCheckout} 
      >
        Checkout
      </Button>
    </div>
  );
};

export default CartSummary;
