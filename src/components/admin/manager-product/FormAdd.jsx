import React, { useEffect, useState } from "react";
import "./product.css";
import { notification } from "antd";
import { storage } from "../../../firebase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";

export default function FormAdd({ handleCloseForm, loadData }) {
  const [categori, setCategori] = useState([]);

  const [product, setProduct] = useState({
    product_name: "",
    price: 0,
    description: "",
    from: "",
    image: [],
    category_name: "",
    quantity: 0,
    discount: "",
    category_id: 0,
  });
  //   const [product, setProduct] = useState([]);
  console.log(product);

  useEffect(() => {
    axios
      .get("http://localhost:1997/categories")
      .then((response) => setCategori(response.data))
      .catch((error) => console.log(error));
  }, []);

  // ham lay gia tri tu cac o input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // ham them moi san pham
  const handleSubmit = (e) => {
    e.preventDefault();
    // const imageName = ""

    if (
      product.product_name !== "" &&
      product.price !== 0
      //    &&
      //   product.from !== ""
    ) {
      // goi API them moi
      if (!file) {
        alert("Please upload an image first!");
      }
      //
      const storageRef = ref(storage, `/files/${file.name}`);
      // tiến trình có thể được tạm dừng và tiếp tục. Nó cũng hiển thị các cập nhật tiến độ.
      // Nhận tham chiếu lưu trữ và tệp để tải lên.
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // Cập nhật tiến độ
          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          // tải xuống url
          getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
              console.log(url);
              const imageName = url;
              return fetch("http://localhost:1997/products", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json", //ep kieu dau vao tu js sang json
                },
                body: JSON.stringify({
                  ...product,
                  price: parseInt(product.price),
                  image: imageName,
                  category_id: Number(product.category_id),
                }),
              });
            })
            .then((response) => {
              // kiem tra du lieu tra ve
              if (response.status === 201) {
                // hien thi notification thanh cong
                notification.success({
                  message: "Success!",
                  description: "Added new products successfully",
                });
                // handleUpload(imageName)
                // an form them moi
                handleCloseForm();
                loadData();
              }
            })
            .catch((error) => console.log(error));
        }
      );
    }
  };

  // Trạng thái lưu trữ tập tin đã tải lên
  const [file, setFile] = useState("");

  // tiến triển
  const [percent, setPercent] = useState(0);

  // Xử lý sự kiện tải lên tệp và trạng thái cập nhật
  function handleChangeFile(event) {
    setFile(event.target.files[0]);
  }

  return (
    <>
      <div className="product-container">
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="mb-3">
            <h2>+ Add Product</h2>
          </div>
          <div>
            <div className="flex gap-2">
              <div className="mb-3 mt-3">
                <label htmlFor="product_name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="product_name"
                  id="product_name"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 mt-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  id="price"
                  min={0}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 mt-3">
                <label htmlFor="quantity" className="form-label">
                  Quantity
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="quantity"
                  id="quantity"
                  min={0}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                onChange={handleChange}
                name="description"
                id=""
                cols="45"
                rows="3"
              ></textarea>
            </div>
            {/* <div className="mb-3 mt-3">
              <label className="form-label" htmlFor="from">
                From
              </label>
              <input
                type="text"
                className="form-control"
                name="from"
                id="from"
                onChange={handleChange}
              />
            </div> */}
            <div className="mb-3 mt-3">
              <label className="form-label" htmlFor="category_id">
                Type --
              </label>
              <select
                name="category_id"
                id="category_id"
                onChange={handleChange}
              >
                {categori.map((cate) => (
                  <option value={cate.id} key={cate.id}>
                    {cate.category_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="form-label" htmlFor="image">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                name="image"
                id="image"
                onChange={handleChangeFile}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary me-2">
            Add
          </button>
          <button
            onClick={handleCloseForm}
            type="button"
            className="btn btn-danger"
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}
