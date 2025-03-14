import React, { useState } from "react";
import women from "../../Assets/Group.png";
import AccountDetails from "./AccountDetails/AccountDetails";
import PasswordDetails from "./PasswordDetails/PasswordDetails";
const ProfileForm = () => {
  const [form, setForm] = useState("profile");
  const handleAccount = () => {
    setForm("profile");
  };
  const handlePassword = () => {
    setForm("password");
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="card w-75 px-5 py-5">
          <div className="row">
            <div className="col-4 " style={{ background: "#F3F5F7" }}>
              <div className="row justify-content-center mt-3">
                <div className="border border-black rounded-circle w-50 p-0">
                  <img
                    src={women}
                    className="img-fluid rounded-circle"
                    alt=""
                  />
                </div>
 
              </div>
              <h5 className="text-center  fw-bold">Komail Abbas</h5>
              <ul className="mb-3">
                <li className="mt-2">
                  <button
                    className={`btn w-100 rounded-0 text-start `}
                    style={
                      form === "profile"
                        ? { borderBottom: "2px solid black" }
                        : {}
                    }
                    onClick={handleAccount}
                  >
                    Account
                  </button>
                </li>
                <li className="mt-2">
                  <button
                    className={`btn w-100 rounded-0 text-start`}
                    onClick={handlePassword}
                    style={
                      form === "password"
                        ? { borderBottom: "2px solid black" }
                        : {}
                    }
                  >
                    Password
                  </button>
                </li>
              </ul>
            </div>
            <div className="col-8">
              {form === "profile" ? (
                <AccountDetails/>
              ) : form === "password" ? (
                <PasswordDetails/>
              ) : (
                <>no content to show</>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
