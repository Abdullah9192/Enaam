import React, { useEffect, useState } from "react";
import clrlogo from "../../Assets/enaam.pk icon.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosCart } from "react-icons/io";
import { User } from "../../Atom";
import { useRecoilState } from "recoil";
import { AiOutlineLogout, AiOutlineUser } from "react-icons/ai";

import { FaRegBell, FaUser } from "react-icons/fa";

const Navbar = () => {
  const [user, setUser] = useRecoilState(User);
  const [dropDown, setDropDown] = useState(false);
  const [logedIn, setLogedIn] = useState(localStorage.getItem("LogedIn"));
  const navigate = useNavigate();
  const [isBellDropdownOpen, setBellDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("userData") && localStorage.getItem("LogedIn")) {
      setLogedIn(localStorage.getItem("LogedIn"));
      setUser(JSON.parse(localStorage.getItem("userData")));
    }
    // eslint-disable-next-line
  }, []);

  const toggleBellDropdown = () => setBellDropdownOpen(!isBellDropdownOpen);
  const toggleUserDropdown = () => setUserDropdownOpen(!isUserDropdownOpen);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="logoImage ms-4" to="/">
          <img src={clrlogo} className="img-fluid" alt="Logo" />
        </Link>
        <div
          className="navbar-toggler border-0 me-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon text-dark"></span>
        </div>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto d-flex align-items-center">
            <li className="nav-item" style={{ marginRight: "15px" }}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item" style={{ marginRight: "15px" }}>
              <NavLink
                to="/prizes"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Prizes
              </NavLink>
            </li>
            <li
              className="nav-item dropdown"
              style={{ marginRight: "15px", position: "relative" }}
              onMouseEnter={(e) => {
                e.currentTarget.classList.add("show");
                setDropDown(true);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.classList.remove("show");
                setDropDown(false);
              }}
            >
              <NavLink className="dropdown" id="navbarDropdown">
                Winners
                {dropDown ? (
                  <IoIosArrowUp size={18} />
                ) : (
                  <IoIosArrowDown size={18} />
                )}
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <NavLink
                    to="/hang-tower-winners"
                    className={({ isActive }) =>
                      isActive ? "dropdown-item active" : "dropdown-item"
                    }
                  >
                    Hang Tower Winners
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/winners"
                    className={({ isActive }) =>
                      isActive ? "dropdown-item active" : "dropdown-item"
                    }
                  >
                    Competition Winners
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item" style={{ marginRight: "15px" }}>
              <NavLink
                to="/offers"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Offers
              </NavLink>
            </li>
            <li className="nav-item" style={{ marginRight: "15px" }}>
              <NavLink
                to="/about-us"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contact-us"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Contact
              </NavLink>
            </li>
            <li className="nav me-4">
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive ? "cart-icon active" : "cart-icon"
                }
              >
                {/* <img src={cartbag} alt="Cart" /> */}
                <IoIosCart size={25} className="" />
              </NavLink>
            </li>
            {logedIn ? (
              <div className="logedInIcons">
                <li className="nav">
                  <NavLink className="cart-icon">
                    <div className="position-relative">
                      <FaRegBell
                        size={22}
                        className="me-4 mt-md-0 mt-3 cart-icon"
                        onClick={toggleBellDropdown}
                        style={{ cursor: "pointer" }}
                      />
                      {isBellDropdownOpen && (
                        <div
                          className="dropdown-menu show"
                          style={{
                            position: "absolute",
                            top: "30px",
                            right: "0",
                          }}
                        >
                          <div className="dropdown-item">Notification 1</div>
                          <div className="dropdown-item">Notification 2</div>
                          <div className="dropdown-item">Notification 3</div>
                        </div>
                      )}
                    </div>
                  </NavLink>
                </li>
                {/* User Icon */}
                <li className="nav">
                  <NavLink className={"cart-icon"}>
                    <div className="position-relative">
                      <AiOutlineUser
                        size={25}
                        className="me-md-5 me-4 mt-md-0 mt-3  cart-icon"
                        onClick={toggleUserDropdown}
                        style={{ cursor: "pointer" }}
                      />
                      {isUserDropdownOpen && (
                        <div
                          className="dropdown-menu show"
                          style={{
                            position: "absolute",
                            top: "30px",
                            right: "0",
                          }}
                        >
                          <div className="dropdown-item">
                            <FaUser /> {user.name ? user.name : "User Name"}
                          </div>
                          <hr />
                          <span
                            className="dropdown-item"
                            onClick={()=>{
                              navigate("/profile");
                              console.log("Navigating to /profile");
                            }}
                          >
                            Profile
                          </span>
                          <span className="dropdown-item">History</span>
                          <div
                            className="dropdown-item dropdown-item-logout"
                            onClick={() => {
                              localStorage.clear();
                              setLogedIn(false);
                            }}
                          >
                            <AiOutlineLogout size={25} className="me-1" />{" "}
                            Logout
                          </div>
                        </div>
                      )}
                    </div>
                  </NavLink>
                </li>
              </div>
            ) : (
              <li className="nav-button">
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="btn btn-outline-warning me-4 nav-button text-dark"
                >
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
