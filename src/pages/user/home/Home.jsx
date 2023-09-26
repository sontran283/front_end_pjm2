import React, { useEffect, useState } from "react";
import Navbar from "../../../layout/user/navbar/Navbar";
import Footer from "../../../layout/user/footer/Footer";
import Slider from "../../../layout/user/slider/Slider";
import Seach from "../../../pages/user/seach/Seach";
import Sevices from "../../../pages/user/sevices/Sevices";
import Back_To_Top from "./../../../base/backtop/Back_To_Top";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./home.css";
import Loading from "./../../../base/loading/Loading";
import { Button, Image, Input, Pagination, notification } from "antd";
import { formatMoney } from "../../../utils/formatData";
import Search from "antd/es/input/Search";

export default function Home() {
  // de luu tru gia tri cua useEffect, tao ra hook
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const [cartUser, setCartUser] = useState([]);
  const cartId = JSON.parse(localStorage.getItem("cartId"));
  const [search, setSearch] = useState("");

  const onSearch = async (e) => {
    setSearch(e.target.value);
    await axios
      .get(`http://localhost:1997/products?product_name_like=${search}`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  };

  //  do ra chi tiet san pham
  useEffect(() => {
    axios
      .get(`http://localhost:1997/products/${id}`)
      .then((response) => setDescription(response.data))
      .catch((error) => console.log(error));
  }, []);

  // const [currentProducts, setCurrentProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const initPage = (currentP) => {
    const startIndex = (currentP - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return {
      startIndex,
      endIndex,
    };
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setCurrentProducts(products.slice(startIndex, endIndex));
  };

  // đổ ra danh mục sản phẩm
  useEffect(() => {
    axios
      .get("http://localhost:1997/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.log(error));
    // lay id cua thang carts
    axios
      .get(`http://localhost:1997/carts/${cartId}`)
      .then((response) => setCartUser(response.data))
      .catch((error) => console.log(error));
    // init category
    loadDataProduct();
  }, []);

  // lay ra id cua category
  const getCategoryId = (id) => {
    setCategoryId(id);
  };

  // goi api lay ra thong tin tat ca sp
  const loadDataProduct = () => {
    // moi khi goi lay product theo id can dat lai currentPage ve trang dau tien
    setCurrentPage(1);
    const pageObj = initPage(1);

    setLoading(true);
    axios
      .get("http://localhost:1997/products")
      .then((response) => {
        if (categoryId == 0) {
          // neu ko co categoryId , thi se lay tat ca
          setProducts(response.data);
          setCurrentProducts(
            response.data.slice(pageObj.startIndex, pageObj.endIndex)
          );
        } else {
          // neu co categoryid tien hanh loc
          const listProduct = response.data.filter(
            (product) => product.category_id == categoryId
          );

          // khi click vao tung danh muv, loc ra mang moi, thi mk set lai
          setProducts(listProduct);
          setCurrentProducts(
            listProduct.slice(pageObj.startIndex, pageObj.endIndex)
          );
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  // de cho thang loadDataProduct bi render lại, thi phai cho no 1 cai dependenci
  // cu moi lan categoryId bi thay doi, thi loadDataProduct no se bi goi lai
  useEffect(() => {
    loadDataProduct();
  }, [categoryId]);

  // Xử lý chức năng thêm sản phẩm vào giỏ hàng
  const handleAddToCart = async (idPro) => {
    const userLocal = JSON.parse(localStorage.getItem("userLocal"));
    if (userLocal) {
      const cart = cartUser.cart;
      const index = cart.findIndex((pr) => pr.idProduct == idPro);
      if (index == -1) {
        cart.push({ idProduct: idPro, quantity: 1 });
        {
          notification.success({
            message: "Add to cart successfully",
            placement: "topRight",
          });
        }
      } else {
        const productCheck = products.find((p) => p.id == idPro);
        if (+cart[index].quantity >= +productCheck.quantity) {
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
      {loading && (
        <>
          <Loading />
        </>
      )}
      <Navbar />
      <Slider />

      <section className="ftco-section ">
        <div class="row justify-content-center ">
          <div class="col-md-10 mb-3 text-center ">
            {/*  render tat ca sp */}
            <ul class="product-category ">
              <li
                style={
                  categoryId === 0
                    ? {
                        backgroundColor: "green",
                        color: "#fff",
                      }
                    : {}
                }
                onClick={() => getCategoryId(0)}
                className="p-2 hover:bg-slate-20 cursor-pointer"
              >
                <a class="active">All Products</a>
              </li>

              {
                // render danh muc san pham ra ngoai giao dien
                categories.map((cat) => (
                  <li
                    style={
                      categoryId === cat.id
                        ? {
                            backgroundColor: "green",
                            color: "#fff",
                          }
                        : {}
                    }
                    onClick={() => getCategoryId(cat.id)}
                    key={cat.id}
                    className="p-2 hover:bg-slate-20 cursor-pointer"
                  >
                    <a class="active">{cat.category_name}</a>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>

        <div className="search">
          <Search
            placeholder="Search Name..."
            onChange={onSearch}
            style={{ width: 200 }}
          />
        </div>

        <div className="container">
          <div className="row justify-content-center mb-3 pb-3">
            <div className="col-md-12 heading-section text-center ">
              <p>
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Quos nulla numquam voluptatum molestiae,
                consequatur reiciendis tenetur nobis vel, nam, alias sit fuga
                est obcaecati! Sit assumenda repellat consequatur aliquid
                tenetur. Fugit, quod officia. Iure dolores dignissimos inventore
                ullam dicta unde error quidem fugit eos. Minus ea, nihil
                debitis, pariatur, commodi velit corrupti minima mollitia odit
                repudiandae ullam aliquam enim quo!
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="flex flex-col items-center">
            <div className="row">
              {currentProducts.map((product) => (
                <div className="col-md-6 col-lg-3 ">
                  <div className="product">
                    <NavLink
                      to={`/description/${product.id}`}
                      className="img-prod"
                    >
                      <Image
                        className="img-fluid"
                        src={product.image}
                        alt="product image"
                      />
                      <span className="status">30%</span>
                      <div className="overlay" />
                    </NavLink>
                    <div className="text py-3 pb-4 px-3 text-center">
                      <h3>{product.product_name}</h3>
                      <div className="d-flex">
                        <div className="pricing">
                          <p className="price">
                            <span className="mr-2 price-dc">
                              15.000 <sup>đ</sup>
                            </span>
                            <span className="price-sale">
                              {formatMoney(product.price)}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="bottom-area d-flex px-3">
                        <div className="m-auto d-flex">
                          <a
                            href="#"
                            className="add-to-cart d-flex justify-content-center align-items-center text-center"
                          >
                            <span>
                              <i className="ion-ios-menu" />
                            </span>
                          </a>
                          {/* add to cart */}
                          <a
                            onClick={() => handleAddToCart(product.id)}
                            className="buy-now d-flex justify-content-center align-items-center mx-1 cursor-pointer"
                          >
                            <span>
                              <i className="ion-ios-cart" />
                            </span>
                          </a>

                          <a
                            href="#"
                            className="heart d-flex justify-content-center align-items-center "
                          >
                            <span>
                              <i className="ion-ios-heart" />
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <Pagination
                current={currentPage}
                onChange={handlePageChange}
                total={products.length}
                pageSize={itemsPerPage}
              />
            </div>
          </div>
          {/* 2 */}
        </div>
      </section>
      <div className="col-md-12 heading-section text-center ">
        <h3 className="mb-4">Helthy Products</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium,
          expedita ratione, quisquam dolore suscipit obcaecati distinctio minus
          quaerat placeat ipsam et dolorum nam est adipisci asperiores
          temporibus, quidem tenetur quos? Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Quos nulla numquam voluptatum
          molestiae, consequatur reiciendis tenetur nobis vel, nam, alias sit
          fuga est obcaecati! Sit assumenda repellat consequatur aliquid
          tenetur. Fugit, quod officia. Iure dolores dignissimos inventore ullam
          dicta unde error quidem fugit eos. Minus ea, nihil debitis, pariatur,
          commodi velit corrupti minima mollitia odit repudiandae ullam aliquam
          enim quo!
        </p>
      </div>

      {/*  */}
      <section className="ftco-section">
        <div className="container">
          <div className="row no-gutters ftco-services">
            <div className="col-md-3 text-center d-flex align-self-stretch ">
              <div className="media block-6 services mb-md-0 mb-4">
                <div className="icon bg-color-1 active d-flex justify-content-center align-items-center mb-2">
                  <span className="flaticon-shipped" />
                </div>
                <div className="media-body">
                  <h3 className="heading">Free Shipping</h3>
                  <span>On order over $100</span>
                </div>
              </div>
            </div>
            <div className="col-md-3 text-center d-flex align-self-stretch ">
              <div className="media block-6 services mb-md-0 mb-4">
                <div className="icon bg-color-2 d-flex justify-content-center align-items-center mb-2">
                  <span className="flaticon-diet" />
                </div>
                <div className="media-body">
                  <h3 className="heading">Always Fresh</h3>
                  <span>Product well package</span>
                </div>
              </div>
            </div>
            <div className="col-md-3 text-center d-flex align-self-stretch ">
              <div className="media block-6 services mb-md-0 mb-4">
                <div className="icon bg-color-3 d-flex justify-content-center align-items-center mb-2">
                  <span className="flaticon-award" />
                </div>
                <div className="media-body">
                  <h3 className="heading">Superior Quality</h3>
                  <span>Quality Products</span>
                </div>
              </div>
            </div>
            <div className="col-md-3 text-center d-flex align-self-stretch ">
              <div className="media block-6 services mb-md-0 mb-4">
                <div className="icon bg-color-4 d-flex justify-content-center align-items-center mb-2">
                  <span className="flaticon-customer-service" />
                </div>
                <div className="media-body">
                  <h3 className="heading">Support</h3>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  */}
      <section className="ftco-section ftco-category ftco-no-pt">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-6 order-md-last align-items-stretch d-flex">
                  <div
                    className="category-wrap-2 
                     img align-self-stretch d-flex"
                    style={{ backgroundImage: "url(images/category.jpg)" }}
                  >
                    <div className="text text-center">
                      <h2>Vegetables</h2>
                      <p>Protect the health of every home</p>
                      <p>
                        <a href="#" className="btn btn-primary">
                          Shop now
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div
                    className="category-wrap 
                     img mb-4 d-flex align-items-end"
                    style={{ backgroundImage: "url(images/category-1.jpg)" }}
                  >
                    <div className="text px-3 py-1">
                      <h2 className="mb-0">
                        <a href="#">Fruits</a>
                      </h2>
                    </div>
                  </div>
                  <div
                    className="category-wrap 
                     img d-flex align-items-end"
                    style={{ backgroundImage: "url(images/category-2.jpg)" }}
                  >
                    <div className="text px-3 py-1">
                      <h2 className="mb-0">
                        <a href="#">Vegetables</a>
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="category-wrap 
                 img mb-4 d-flex align-items-end"
                style={{ backgroundImage: "url(images/category-3.jpg)" }}
              >
                <div className="text px-3 py-1">
                  <h2 className="mb-0">
                    <a href="#">Juices</a>
                  </h2>
                </div>
              </div>
              <div
                className="category-wrap 
                 img d-flex align-items-end"
                style={{ backgroundImage: "url(images/category-4.jpg)" }}
              >
                <div className="text px-3 py-1">
                  <h2 className="mb-0">
                    <a href="#">Dried</a>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="ftco-section img"
        style={{ backgroundImage: "url(images/bg_3.jpg)" }}
      >
        <div className="container">
          <div className="row justify-content-end">
            <div className="col-md-6 heading-section  deal-of-the-day ">
              <span className="subheading">Best Price For You</span>
              <h2 className="mb-4">Deal of the day</h2>
              <p>
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia
              </p>
              <h3>
                <a href="#">Spinach</a>
              </h3>
              <span className="price">
                $10 <a href="#">now $5 only</a>
              </span>
              <div id="timer" className="d-flex mt-5">
                <div className="time" id="days" />
                <div className="time pl-3" id="hours" />
                <div className="time pl-3" id="minutes" />
                <div className="time pl-3" id="seconds" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  */}
      <section className="ftco-section testimony-section">
        <div className="container">
          <div className="row justify-content-center mb-5 pb-3">
            <div className="col-md-7 heading-section  text-center">
              <span className="subheading">Testimony</span>
              <h3 className="mb-4">Our satisfied customer says</h3>
              <p>
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts. Separated
                they live in
              </p>
            </div>
          </div>
          <div className="row ">
            <div className="col-md-12">
              <div className="carousel-testimony d-flex">
                <div className="item">
                  <div className="testimony-wrap p-4 pb-5">
                    <div
                      className="user-img mb-5"
                      style={{ backgroundImage: "url(images/person_1.jpg)" }}
                    >
                      <span className="quote d-flex align-items-center justify-content-center">
                        <i className="icon-quote-left" />
                      </span>
                    </div>
                    <div className="text text-center">
                      <p className="mb-5 pl-4 line">
                        Far far away, behind the word mountains, far from the
                        countries Vokalia and Consonantia, there live the blind
                        texts.
                      </p>
                      <p className="name">Garreth Smith</p>
                      <span className="position">Marketing Manager</span>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="testimony-wrap p-4 pb-5">
                    <div
                      className="user-img mb-5"
                      style={{ backgroundImage: "url(images/person_2.jpg)" }}
                    >
                      <span className="quote d-flex align-items-center justify-content-center">
                        <i className="icon-quote-left" />
                      </span>
                    </div>
                    <div className="text text-center">
                      <p className="mb-5 pl-4 line">
                        Far far away, behind the word mountains, far from the
                        countries Vokalia and Consonantia, there live the blind
                        texts.
                      </p>
                      <p className="name">Garreth Smith</p>
                      <span className="position">Interface Designer</span>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="testimony-wrap p-4 pb-5">
                    <div
                      className="user-img mb-5"
                      style={{ backgroundImage: "url(images/person_3.jpg)" }}
                    >
                      <span className="quote d-flex align-items-center justify-content-center">
                        <i className="icon-quote-left" />
                      </span>
                    </div>
                    <div className="text text-center">
                      <p className="mb-5 pl-4 line">
                        Far far away, behind the word mountains, far from the
                        countries Vokalia and Consonantia, there live the blind
                        texts.
                      </p>
                      <p className="name">Garreth Smith</p>
                      <span className="position">UI Designer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Seach />
      <Sevices />
      <Footer />
      <Back_To_Top />
    </>
  );
}
