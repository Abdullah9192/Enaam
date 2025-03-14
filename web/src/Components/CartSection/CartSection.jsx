import React, { useEffect, useState } from "react";
import CartProducts from "./CartProducts/CartProducts";
import CartSummary from "./CartSummary/CartSummary";
import { cartData } from "../../Atom";
import { useRecoilState } from "recoil";
import { GetWihoutHead } from "../../Utils/Utils";
import { useNavigate } from "react-router-dom";

const CartSection = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  // eslint-disable-next-line
  const [cart, setCart] = useRecoilState(cartData);
  // eslint-disable-next-line
  const [logedIn, setLogedIn] = useState(localStorage.getItem("LogedIn"));
  // eslint-disable-next-line
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  let navigate = useNavigate();
  useEffect(() => {
    if (!logedIn && logedIn === false && !user) {
      navigate("/login");
      return false;
    } else {
      fetchCart(user.id);
    }
    // eslint-disable-next-line
  }, []);
  const fetchCart = async (id) => {
    //console.log(id,"userid")
    const res = await GetWihoutHead(`/cart/${id}`);
    // eslint-disable-next-line
    if (res.status === 200 && res) {
      //console.log(res);
      setCart(res.data.cartItems);
    } else {
      //console.log(res, "error getting cart");
    }
  };
  const updateTotalAmount = (newTotal) => {
    setTotalAmount(newTotal);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8 ">
          <CartProducts onTotalChange={updateTotalAmount} />
        </div>
        <div className="col-md-4">
          <CartSummary totalAmount={totalAmount} />
        </div>
      </div>
    </div>
  );
};

export default CartSection;
