import React, { useState } from "react";
import "./register.css";
import Navbar from "../../../layout/user/navbar/Navbar";
import Footer from "../../../layout/user/footer/Footer";
import Back_To_Top from "./../../../base/backtop/Back_To_Top";
import { Button, Radio, Upload, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase/firebaseConfig";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [gender, setGender] = useState(0);
  const [imageURL, setImageURL] = useState(null);

  // Tạo một them chiếu đến thư mục chưa kho ảnh trên firebase
  const imageLishRef = ref(storage, "images/");

  const handleCheck = (e) => {
    console.log("radio checked", e.target.value);
    setGender(e.target.value);
  };

  // Props của Upload
  const props = {
    name: "file",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        // Lấy đường dẫn của ảnh sau khi hoàn tất quá trình tải
        const downloadURL = info.file.response.url;
        // Lưu đường dẫn vào trong một state
        setImageURL(downloadURL);
        // Hiển thi thong bao
        message.success("Upload image successfully");
      } else if (info.file.status === "error") {
        message.error("Image upload failed");
      }
    },
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        // Tạo một tham chiếu đến kho ảnh trên firebase
        const imageRef = ref(imageLishRef, file.name);

        // Tải ảnh lên firebase
        await uploadBytes(imageRef, file);

        // Lấy url từ firebase về sau khi upload thành công
        const downloadURL = await getDownloadURL(imageRef);

        // Gọi hàm onSuccess để thông báo là upload ảnh thành công
        onSuccess({ url: downloadURL });
      } catch (error) {
        onError(error);
      }
    },
  };

  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    user_name: "",
    address: "",
    dateOfBirthday: "",
    role: 1,
    cart: [],
    avatar: [],
    bill:[],
    active: false,
  });

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isDisable, setIsDisalble] = useState(false);

  // Hàm validate dữ liệu nhập vào
  const validateData = (nameInput, valueInput) => {
    switch (nameInput) {
      case "user_name":
        if (!valueInput) {
          setNameError("Name cannot be left blank");
          return; // Dừng kiểm tra và trả về ngay khi gặp lỗi
        } else {
          setNameError("");
        }
        break;
      case "email":
        if (!valueInput) {
          setEmailError("Email cannot be blank");
          return; // Dừng kiểm tra và trả về ngay khi gặp lỗi
        } else {
          setEmailError("");
        }
        break;
      case "password":
        if (!valueInput) {
          setPasswordError("Password can not be blank");
          return; // Dừng kiểm tra và trả về ngay khi gặp lỗi
        } else if (valueInput.length < 8) {
          setPasswordError("Password must have at least 8 characters");
          return; // Dừng kiểm tra và trả về ngay khi gặp lỗi
        } else {
          setPasswordError("");
        }
        break;
      case "confirmPassword":
        if (!valueInput) {
          setConfirmPasswordError("Password can not be blank");
          return; // Dừng kiểm tra và trả về ngay khi gặp lỗi
        } else if (user.password !== valueInput) {
          setConfirmPasswordError("Passwords do not match");
          return; // Dừng kiểm tra và trả về ngay khi gặp lỗi
        } else {
          setConfirmPasswordError("");
        }
        break;
      default:
        break;
    }
  };

  //xử lí sự kiện checked trong ô checkbox
  const handleChecked = (e) => {
    setIsDisalble(e.target.checked);
  };

  //lấy giá trị ô input
  const handleInputChange = (e) => {
    const { value, name } = e.target;
    validateData(value, name);

    //distructoring
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Hàm kiểm tra email
  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:1997/users?email=${email}`
      );
      return response.data.length > 0; // Trả về true nếu email đã tồn tại
    } catch (error) {
      console.error("Error when checking email:", error);
      return false; // Trả về false nếu có lỗi
    }
  };

  // Xử lí hàm submit
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    validateData("user_name", user.user_name);
    validateData("email", user.email);
    validateData("password", user.password);
    validateData("confirmPassword", user.confirmPassword);

    // Kiểm tra email trước khi tạo người dùng
    const emailExists = await checkEmailExists(user.email);

    if (emailExists) {
      setEmailError("Email already exists, please select another email.");
      return;
    }

    // Tiến hành tạo người dùng mới
    axios
      .post("http://localhost:1997/users", {
        ...user,
        gender: gender,
        avatar: imageURL,
        role: 1,
      })
      .then((response) => {
        if (response.status === 201) {
          // Hiển thị thông báo thành công và chuyển hướng đến trang đăng nhập
          notification.success({
            message: "Success",
            description: "New user added successfully",
          });
          navigate("/login");
        }
      })
      .catch((error) => {
        // Hiển thị thông báo lỗi
        notification.error({
          message: "Failure",
          description: "Adding new user failed",
        });
      });
  };

  return (
    <>
      <Navbar />
      <div className=" font-sans">
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center w-98">
            <h2 className="text-2xl text-center ">REGISTER</h2>
            <br />
            <form className="w-full" onSubmit={handleOnSubmit}>
              <div>
                <div className="flex gap-2">
                  <div>
                    <div className="">
                      <label
                        htmlFor="user_name"
                        className="block text-gray-600"
                      >
                        Name:
                      </label>
                      <input
                        type="text"
                        id="user_name"
                        name="user_name"
                        required=""
                        placeholder="enter your name"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none {`form-control ${nameError &&  focus:border-red-500}`}"
                        onChange={handleInputChange}
                      />
                      {nameError && (
                        <div className="text-red-500 mt-1">{nameError}</div>
                      )}
                    </div>
                    <br />
                    <div className="">
                      <label htmlFor="email" className="block text-gray-600">
                        Email:
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required=""
                        placeholder="enter your email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none {`form-control ${emailError &&  focus:border-red-500}`}"
                        onChange={handleInputChange}
                      />
                      {emailError && (
                        <div className="text-red-500 mt-1">{emailError}</div>
                      )}
                    </div>
                    <br />
                  </div>

                  <div>
                    <div className="">
                      <label htmlFor="email" className="block text-gray-600">
                        Address:
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        required=""
                        placeholder="enter your address"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none {`form-control ${emailError &&  focus:border-red-500}`}"
                        onChange={handleInputChange}
                      />
                    </div>
                    <br />
                    <div className="">
                      <label htmlFor="dob" className="block text-gray-600">
                        Date Of Birth:
                      </label>
                      <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        required=""
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="">
                    <label htmlFor="password" className="block text-gray-600">
                      Password:
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      required=""
                      placeholder="enter your password"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none {`form-control ${passwordError &&  focus:border-red-500}`}"
                      onChange={handleInputChange}
                    />
                    {passwordError && (
                      <div className="text-red-500 mt-1">{passwordError}</div>
                    )}
                  </div>
                  <div className="">
                    <label htmlFor="password" className="block text-gray-600">
                      Confirm Password:
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      required=""
                      placeholder="enter your password"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none {`form-control ${confirmPasswordError &&  focus:border-red-500}`}"
                      onChange={handleInputChange}
                    />
                    {confirmPasswordError && (
                      <div className="text-red-500 mt-1">
                        {confirmPasswordError}
                      </div>
                    )}
                    {/* <div className="text-red-500 mt-1">Mật khẩu không được để trống</div> */}
                  </div>
                </div>
                <br />
                <div className="flex gap-8">
                  <div className="mb-3">
                    <label htmlFor="name">Gender</label>
                    <div className="mt-2">
                      <Radio.Group onChange={handleCheck} value={gender}>
                        <Radio value={0}>Male</Radio>
                        <Radio value={1}>Female</Radio>
                        <Radio value={2}>Other</Radio>
                      </Radio.Group>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="name">Image</label>
                    <div className="text-center mt-2">
                      <Upload {...props}>
                        <Button icon={<UploadOutlined />}>
                        Upload images
                        </Button>
                      </Upload>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className=" text-gray-600 flex mt-3 mr-2">
                  <input
                    type="checkbox"
                    id="agree"
                    name="agree"
                    required=""
                    className="mr-2"
                    onChange={handleChecked}
                  />
                  <div className="mt-2">
                    {" "}
                    Do you agree with us{" "}
                    <a
                      href="#"
                      className="text-blue-500 hover:text-blue-700 transition duration-200"
                    >
                      Terms
                    </a>
                    ?
                  </div>
                </label>
              </div>
              <button
                type="submit"
                disabled={!isDisable}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 mb-1"
              >
                Register
              </button>
              <div className="flex justify-between w-full">
                <div>
                  <Link
                    to="/"
                    className="text-gray-500 hover:text-gray-700 transition duration-200"
                  >
                    Come back
                  </Link>
                </div>
              </div>
              <div className="text-center mt-4">
                Do you already have an account?
                <Link
                  to="/login"
                  className="text-blue-500 hover:text-blue-700 transition duration-200"
                >
                  Login
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
