import React, { useEffect } from "react";
import image from "../../../Assets/Image.png";
import { ImBin } from "react-icons/im";
import { BiMinus, BiPlus } from "react-icons/bi";
import { cartData, DefaultUrl, User } from "../../../Atom";
import { useRecoilState } from "recoil";
import emtycart from "../../../Assets/emptycart.svg";
import axios from "axios";
import { toast } from "react-toastify";

const CartProducts = ({ onTotalChange }) => {
  const [cart, setCart] = useRecoilState(cartData);
  const [userData] = useRecoilState(User);
  const [defaultUrl] = useRecoilState(DefaultUrl);

  useEffect(() => {
    if (Array.isArray(cart)) {
      const newTotal = cart.reduce(
        (acc, product) => acc + product.price * (product.quantity || 1),
        0
      );
      onTotalChange(newTotal);
    } else {
      console.warn("Cart is not an array:", cart);
    }
  }, [cart, onTotalChange]);

  const updateQuantity = (id, action) => {
    setCart((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === id) {
          const currentQuantity = product.quantity || 1;
          const newQuantity =
            action === "increment"
              ? currentQuantity + 1
              : Math.max(1, currentQuantity - 1);
          return {
            ...product,
            quantity: newQuantity,
          };
        }
        return product;
      })
    );
  };

  const handleDelete = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((product) => product.id !== id);

      const myCart = {
        cartItems: updatedCart,
        total: updatedCart.reduce(
          (acc, product) => acc + product.price * (product.quantity || 1),
          0
        ),
      };

      axios
        .put(`${defaultUrl}/cart/${userData.id}`, myCart)
        .then(() => {
          toast.success("Item removed from cart");
        })
        .catch((err) => {
          console.error("Error updating the cart:", err);
        });

      return updatedCart;
    });
  };


  return (
    <>
      {cart.length > 0 ? (
        <>
          {cart.map((product) => (
            <div className="product-card1" key={product.id}>
              <div className="product-image1">
                <img src={image} alt={product.title} />
              </div>
              <div className="product-details1">
                <div className="d-flex align-items-center">
                  <div className="product-title w-50 font-weight-bold ">
                    <h4>{product.name}</h4>
                  </div>
                  <div className="w-50 text-end">
                    <h5 className="Black">Rs: {product.price} PKR</h5>
                  </div>
                </div>
                <div>
                  <div className="d-flex align-items-center mt-3">
                    <div className="w-50">Categories</div>
                    <div className="w-50">
                      <div className="d-flex align-items-center justify-content-end">
                        Quantity:
                        <button
                          onClick={() =>
                            updateQuantity(product.id, "decrement")
                          }
                          className="btn btn-sm btn-outline-danger mx-2 square"
                        >
                          <BiMinus />
                        </button>
                        <span>{product.quantity || 1}</span>
                        <button
                          onClick={() =>
                            updateQuantity(product.id, "increment")
                          }
                          className="btn btn-sm btn-outline-success mx-2 square"
                        >
                          <BiPlus />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="btn btn-sm mx-2 delete-btn square"
                        >
                          <ImBin />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="product-description mt-3">{product.description}</p>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: "400px" }}
        >
          <img src={emtycart} className="img-fluid" alt="empty cart" />
        </div>
      )}
    </>
  );
};

export default CartProducts;

