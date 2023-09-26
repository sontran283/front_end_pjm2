import React, { useEffect, useState } from "react";
import Navbar from "../../../layout/user/navbar/Navbar";
import Footer from "../../../layout/user/footer/Footer";
import Back_To_Top from "./../../../base/backtop/Back_To_Top";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Image, notification } from "antd";
import { formatMoney } from "../../../utils/formatData";

export default function Description() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [detail, setDetial] = useState({});
  const [cartUser, setCartUser] = useState([]);
  const cartId = JSON.parse(localStorage.getItem("cartId"));
  const userLocal = JSON.parse(localStorage.getItem("userLocal"));

  axios
    .get(`http://localhost:1997/products/${id}`)
    .then((response) => setDetial(response.data))
    .catch((error) => navigate("/"));

  // lay id cua thang carts
  useEffect(() => {
    axios
      .get(`http://localhost:1997/carts/${cartId}`)
      .then((response) => setCartUser(response.data))
      .catch((error) => console.log(error));
  }, []);

  // Xử lý chức năng thêm sản phẩm vào giỏ hàng
  const handleAddToCart = async () => {
    if (userLocal) {
      const cart = cartUser.cart;
      const index = cart.findIndex((pr) => pr.idProduct === detail.id);
      if (index == -1) {
        cart.push({ idProduct: detail.id, quantity: 1 });
        {
          notification.success({
            message: "Add to cart successfully",
            placement: "topRight",
          });
        }
      } else {
        if (+cart[index].quantity >= +detail.quantity) {
          notification.error({
            message: "0ut of stock",
            placement: "topRight",
          });
          return;
        }
        cart[index].quantity = Number(cart[index].quantity) + 1;
        notification.success({
          message: "Add to cart successfully",
          placement: "topRight",
        });
      }
      await axios.put(`http://localhost:1997/carts/${cartId}`, {
        // bao luu tat ca gia tri cua cart
        ...cartUser,
        cart: cart,
      });
    } else {
      // Người dùng chưa đăng nhập
      notification.error({
        message: "Please log in to purchase",
        placement: "topRight",
      });
      // Chuyển hướng người dùng đến trang đăng nhập
      // navigate("/login"); // Thay đổi "/login" thành đường dẫn tới trang đăng nhập của bạn
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="hero-wrap hero-bread"
        style={{ backgroundImage: 'url("/images/bg_1.jpg")' }}
      >
        <div className="container">
          <div className="row no-gutters slider-text align-items-center justify-content-center">
            <div className="col-md-9 text-center">
              <p className="breadcrumbs">
                <span className="mr-2">
                  <a href="index.html">Home</a>
                </span>{" "}
                <span>Description us</span>
              </p>
              <h1 className="mb-0 bread">Description</h1>
            </div>
          </div>
        </div>
      </div>
      <section className="ftco-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-5">
              <a className="image-popup">
                <Image
                  src={detail.image}
                  className="img-fluid"
                  alt={detail.product_name}
                />
              </a>
            </div>
            <div className="col-lg-6 product-details pl-md-5">
              <h2>{detail.product_name}</h2>
              <div className="rating d-flex">
                <p className="text-left mr-4">
                  <a href="#" className="mr-2">
                    5.0
                  </a>
                  <a href="#">
                    <span className="ion-ios-star-outline" />
                  </a>
                  <a href="#">
                    <span className="ion-ios-star-outline" />
                  </a>
                  <a href="#">
                    <span className="ion-ios-star-outline" />
                  </a>
                  <a href="#">
                    <span className="ion-ios-star-outline" />
                  </a>
                  <a href="#">
                    <span className="ion-ios-star-outline" />
                  </a>
                </p>
                <p className="text-left mr-4">
                  <a href="#" className="mr-2" style={{ color: "#000" }}>
                    100 <span style={{ color: "#bbb" }}>Rating</span>
                  </a>
                </p>
                <p className="text-left">
                  <a href="#" className="mr-2" style={{ color: "#000" }}>
                    500 <span style={{ color: "#bbb" }}>Sold</span>
                  </a>
                </p>{" "}
                &emsp;
                <p>
                  <del>
                    15.000 <sup>đ</sup>
                  </del>
                </p>
              </div>{" "}
              <br />
              <p className="price">
                <span>{formatMoney(detail.price)}</span>
              </p>
              <p>{detail.description}</p>
              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="form-group d-flex"></div>
                </div>
                <div className="w-100" />
                <div className="input-group col-md-6 d-flex mb-3"></div>
                <div className="w-100" />
                <div className="col-md-12">
                  <p style={{ color: "#000" }}>600 kg available</p>
                </div>
              </div>
              <p>
                <br />
                <span
                  onClick={() => handleAddToCart(detail.id)}
                  className="btn btn-black py-3 px-5"
                >
                  Add to Cart
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <Back_To_Top />
    </>
  );
}
