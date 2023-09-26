import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button, Dropdown, Modal } from "antd";
import {
  KeyOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import "./navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  // sau khi danh nhap bang gg thanh cong, lay thong tin user da dang nhap
  const userLogin = JSON.parse(localStorage.getItem("userLocal"));
  const [cartItemCount, setCartItemCount] = useState(0);

  //
  const handleLogout = () => {
    // xoa du kieu tren local
    localStorage.removeItem("userLocal");
    // chuyen huong ve trang chu
    navigate("/");
  };

  // ham xu li dang xuat
  const handleConfirmLogout = () => {
    Modal.confirm({
      title: "Confirm!",
      content: "Are you sure you want to log out?",
      onOk() {
        handleLogout();
      },
      cancelText: "Cancel",
      okText: "Log out",
    });
  };

  const items = [
    {
      key: "1",
      label: (
        <Link to={"/profile"}>
          <UserAddOutlined className=" mr-2" />
          Profile
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to={"/change-password"}>
          <KeyOutlined className=" mr-2" />
          Change Password
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <a onClick={handleConfirmLogout}>
          <LogoutOutlined className=" mr-2" />
          Log Out
        </a>
      ),
    },
  ];

  return (
    <>
      <div>
        <nav
          className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
          id="ftco-navbar"
        >
          <div className="container ">
            <NavLink className="navbar-brand" to={"/"}>
              Vegefoods
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#ftco-nav"
              aria-controls="ftco-nav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="oi oi-menu" /> Menu
            </button>
            <div>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <NavLink className="nav-link" to={"/"}>
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/about"}>
                    About
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/contact"}>
                    Contact
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/blog"}>
                    Blog
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/history"}>
                    History
                  </NavLink>
                </li>
                {userLogin && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to={"/cart"}>
                      cart
                    </NavLink>
                  </li>
                )}

                {
                  // Sau khi lay du lieu tu local tu ben tren, sau do xuong day,
                  // dang nhap vao thi 2 file dang ki va dang nhap se an di.
                  userLogin != null ? (
                    <>
                      <li className="nav-item justify-center flex items-center">
                        <Dropdown
                          menu={{
                            items,
                          }}
                          placement="bottomLeft"
                          arrow
                        >
                          <Button className="border-none shadow-none text-white hover:text-white">
                            <div className="flex items-center gap-2">
                              <img
                                className="rounded-full"
                                src={userLogin.image || userLogin.avatar}
                                height={26}
                                width={26}
                                alt="avatar"
                              />
                              <div className="nameColor">
                                {userLogin.user_name}
                              </div>
                            </div>
                          </Button>
                        </Dropdown>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item">
                        <NavLink className="nav-link" to={"/login"}>
                          Login
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" to={"/register"}>
                          Register
                        </NavLink>
                      </li>
                    </>
                  )
                }
              </ul>
            </div>
          </div>
        </nav>
        {/* END nav */}
      </div>
    </>
  );
}
