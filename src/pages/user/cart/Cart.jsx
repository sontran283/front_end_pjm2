import React, { useEffect, useState } from "react";
import "./cart.css";
import Navbar from "../../../layout/user/navbar/Navbar";
import Footer from "../../../layout/user/footer/Footer";
import Back_To_Top from "./../../../base/backtop/Back_To_Top";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { formatMoney } from "../../../utils/formatData";
import { DeleteOutlined } from "@ant-design/icons";
import { notification } from "antd";
import CheckOut from "./../checkout/CheckOut";

export default function Cart() {
  const cartId = JSON.parse(localStorage.getItem("cartId"));
  const [carts, setCarts] = useState();
  const [products, setProducts] = useState([]);
  const productCart = [];
  let sum = 0;

  if (products && carts) {
    carts.cart.map((c) => {
      products.map((p) => {
        if (p.id === c.idProduct) {
          productCart.push({ ...p, quantity: c.quantity });
        }
      });
    });
  }

  // lay id cua thang carts
  useEffect(() => {
    axios
      .get(`http://localhost:1997/carts/${cartId}`)
      .then((response) => setCarts(response.data))
      .catch((error) => console.log(error));
    axios
      .get(`http://localhost:1997/products`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  }, []);

  // hàm tăng giảm số lượng sản phẩm
  const handleDecrease = (productId) => {
    const updatedProductCart = productCart
      .map((product) => {
        if (product.id === productId) {
          // Giảm số lượng sản phẩm
          const newQuantity = product.quantity - 1;
          if (newQuantity <= 0) {
            // Xoá sản phẩm nếu số lượng giảm xuống 0 hoặc âm
            return null;
          }
          return { ...product, quantity: newQuantity };
        }
        return product;
      })
      .filter(Boolean); // Lọc bỏ các sản phẩm null (sản phẩm bị xoá)

    const updatedCarts = {
      ...carts,
      cart: updatedProductCart.map((product) => ({
        idProduct: product.id,
        quantity: product.quantity,
      })),
    };

    axios
      .put(`http://localhost:1997/carts/${cartId}`, updatedCarts)
      .then((response) => {
        // Cập nhật giỏ hàng thành công
        setCarts(updatedCarts);
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.log(error);
      });
  };

  const handleIncrease = async (productId) => {
    const resProductInfo = await axios.get(
      `http://localhost:1997/products/${productId}`
    );
    const productInfo = resProductInfo.data;

    const index = productCart.findIndex((pro) => pro.id == productId);

    if (productCart[index].quantity + 1 > productInfo.quantity) {
      notification.error({
        message: "0ut of stock",
        placement: "topRight",
      });
      return;
    }

    const updatedProductCart = productCart.map((product) => {
      if (product.id === productId) {
        // Tăng số lượng sản phẩm
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });

    const updatedCarts = {
      ...carts,
      cart: updatedProductCart.map((product) => ({
        idProduct: product.id,
        quantity: product.quantity,
      })),
    };

    axios
      .put(`http://localhost:1997/carts/${cartId}`, updatedCarts)
      .then((response) => {
        // Cập nhật giỏ hàng thành công
        setCarts(updatedCarts);
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.log(error);
      });
  };

  // ham xoá sản phẩm khi click vào button xoá
  const handleRemove = (productId) => {
    const updatedProductCart = productCart.filter(
      (product) => product.id !== productId
    );
    const updatedCarts = {
      ...carts,
      cart: updatedProductCart.map((product) => ({
        idProduct: product.id,
        quantity: product.quantity,
      })),
    };

    axios
      .put(`http://localhost:1997/carts/${cartId}`, updatedCarts)
      .then((response) => {
        // Cập nhật giỏ hàng thành công
        setCarts(updatedCarts);
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.log(error);
      });
  };

  return (
    <div>
      <Navbar />
      <div
        className="hero-wrap hero-bread"
        style={{ backgroundImage: 'url("images/bg_1.jpg")' }}
      >
        <div className="container">
          <div className="row no-gutters slider-text align-items-center justify-content-center">
            <div className="col-md-9 text-center">
              <p className="breadcrumbs">
                <span className="mr-2">
                  <a href="index.html">Home</a>
                </span>{" "}
                <span>Cart us</span>
              </p>
              <h1 className="mb-0 bread">Your Cart</h1>
            </div>
          </div>
        </div>
      </div>
      <section className=" ftco-cart mb-4 cart">
        <div className=" ">
          <div className="">
            <div className="cart-list">
              <table className="table">
                <thead className="bg-lime-200">
                  <tr className="text-center">
                    <th>STT</th>
                    <th>Image</th>
                    <th>Product name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {productCart.map((e, details) => {
                    sum += e.price * e.quantity;
                    return (
                      <tr className="text-center" key={details}>
                        <td>{details + 1}</td>
                        <td className="image-prod">
                          <div className="img">
                            <img
                              style={{
                                width: 90,
                                height: 90,
                              }}
                              src={e.image}
                              alt=""
                            />
                          </div>
                        </td>
                        <td className="product-name">
                          <h3>{e.product_name}</h3>
                          <p>{e.description}</p>
                        </td>
                        <td className="price">
                          {formatMoney(e.price * e.quantity)}
                        </td>
                        <td className="quantity">
                          <div className="flex gap-16 justify-center">
                            <div className="flex gap-3 items-center">
                              <div>
                                <button
                                  onClick={() => handleDecrease(e.id)}
                                  className="btn py-1 px-2 bg-lime-200"
                                >
                                  -
                                </button>
                              </div>
                              <div>
                                {" "}
                                <span>{e.quantity}</span>
                              </div>
                              <div>
                                <button
                                  onClick={() => handleIncrease(e.id)}
                                  className="btn py-1 px-2 bg-orange-200"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="product-remove">
                          <a onClick={() => handleRemove(e.id)}>
                            <DeleteOutlined />
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="justify-center">
          <div className="gap-6">
            <div className="total1">
              <h3 className="total">
                Cart Total: <strong>{formatMoney(sum)}</strong>
              </h3>
            </div>
            <CheckOut productCart={productCart} sum={sum} />
            <div>
              {" "}
              <button className="btn py-1 px-2 bg-orange-200">
                <NavLink to="/">Continue shopping</NavLink>
              </button>{" "}
              &emsp;
            </div>
          </div>
          <br />
          <hr />
        </div>
      </section>
      <Footer />
      <Back_To_Top />
    </div>
  );
}
