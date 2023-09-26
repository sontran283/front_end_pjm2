import React, { useEffect, useState } from "react";
import Navbar from "../../../layout/user/navbar/Navbar";
import Footer from "../../../layout/user/footer/Footer";
import Back_To_Top from "./../../../base/backtop/Back_To_Top";
import { notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../firebase/firebaseConfig";
import axios from "axios";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập ở đây
    const userLocal = JSON.parse(localStorage.getItem("userLocal"));
    if (userLocal) {
      navigate("/*"); // Chuyển hướng đến trang 404 nếu đã đăng nhập
    }
  }, [navigate]);

  const getCarts = async () => {
    const response = await axios.get(`http://localhost:1997/carts`);
    return response.data;
  };

  //  Hàm validate dữ liệu nhập vào
  const validateData = (nameInput, valueInput) => {
    switch (nameInput) {
      case "email":
        if (!valueInput) {
          setEmailError(true);
        } else {
          setEmailError(false);
        }
        break;
      case "password":
        if (!valueInput) {
          setPasswordError(true);
        } else {
          setPasswordError(false);
        }
        break;

      default:
        break;
    }
  };

  //   // Lấy giá trị từ các ô input
  const handleInputChange = (e) => {
    // Lấy name và value từ input
    const { value, name } = e.target;

    // Khi onChange thì gọi đến hàm validate
    validateData(name, value);

    // Kiểm tra name và gán giá trị
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else {
      return;
    }
  };

  //dang nhap voi API
  const handleOnSumit = (e) => {
    e.preventDefault();
    validateData("email", email);
    validateData("password", password);

    if (email && password) {
      const newUser = {
        email: email,
        password: password,
      };
      // Gọi API đăng nhập
      axios
        .post("http://localhost:1997/login", newUser)
        .then((response) => {
          if (response.data.user.active === true) {
            notification.error({
              message: "Warning",
              description: "Your account has been locked, please contact admin",
            });
            return;
          }
          if (response.data.user.banned == true) {
            setAlertBan(true);
            return;
          }
          notification.success({
            message: "Logged in successfully",
            placement: "topRight",
          });
          localStorage.setItem("userLocal", JSON.stringify(response.data.user));
          return response.data.user;
        })
        .then(async (user) => {
          const carts = await getCarts();
          const cartUser = carts.find((cart) => cart.userId == user.id);
          if (!cartUser) {
            const res = await axios.post(`http://localhost:1997/carts`, {
              userId: user.id,
              cart: [],
            });
            return {
              ...res,
              ...user,
            };
          } else {
            return {
              data: { ...cartUser },
              ...user,
            };
          }
        })
        .then((res) => {
          localStorage.setItem("cartId", JSON.stringify(res.data.id));
          if (res.role == 0) {
            navigate("/admin/dashboard");
          } else {
            navigate("/");
          }
        })
        .catch((error) => {
          if (
            error.response.data === "Incorrect password" ||
            error.response.data === "Cannot find user" ||
            error.response.data === "Password is too short"
          ) {
            notification.error({
              message: "Warning",
              description: "Password or Email is incorrect",
            });
          }
          console.log(error);
        });
    }
  };

  //dang nhap voi google
  const signInWithGoogle = () => {
    // signInWithPopup  phuong thuc co san cua firebase auth
    signInWithPopup(auth, provider)
      .then((response) => {
        const useLocal = {
          email: response.email,
          user_name: response.user.displayName,
          image: response.user.photoURL,
          userId: response.user.uid,
        };
        //luu thong tin len local
        localStorage.setItem("userLocal", JSON.stringify(useLocal));
        //chuyen huong ve trang home
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="font-sans">
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-white p-9 rounded-lg shadow-lg flex flex-col items-center w-96">
            <h2 className="text-2xl text-center mb-4 bg-white">LOGIN</h2>
            <form className="w-full" onSubmit={handleOnSumit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-600">
                  Email:
                </label>
                <input
                  status="error"
                  value={email}
                  type="text"
                  id="email"
                  name="email"
                  required=""
                  placeholder="enter your email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  onChange={handleInputChange}
                />
                {emailError && (
                  <div className="text-red-500 mt-1">Email cannot be blank</div>
                )}
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-600">
                  Password:
                </label>
                <input
                  status="error"
                  value={password}
                  type="password"
                  id="password"
                  name="password"
                  required=""
                  placeholder="enter your password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  onChange={handleInputChange}
                />
                {passwordError && (
                  <div className="text-red-500 mt-1">
                    Password can not be blank
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 mb-2"
              >
                Login
              </button>
              <div className="flex justify-between w-full">
                <div>
                  <Link
                    to="/"
                    className="text-gray-500 hover:text-gray-700 transition duration-200"
                  >
                    Come Back
                  </Link>
                </div>
                <div>
                  <Link
                    href="/change_password"
                    className="text-blue-500 hover:text-blue-700 transition duration-200"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              {/* <div className="text-center mt-4">Or</div>
              <a
                onClick={signInWithGoogle}
                href="#"
                className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center mt-2"
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google Logo"
                  className="w-6 h-6 mr-2"
                />
                Login with Google
              </a> */}
              <div className="text-center mt-4">
                Do you already have an account?{" "}
                <Link
                  className="text-blue-500 hover:text-blue-700 transition duration-200"
                  to="/register"
                >
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      <Back_To_Top />
    </>
  );
}
