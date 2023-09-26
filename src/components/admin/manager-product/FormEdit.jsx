import React, { useEffect, useState } from "react";
import { notification } from "antd";
import { storage } from "../../../firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import axios from "axios";

export default function FormEdit({ idEdit, handleCloseFormEdit, loadData }) {
  const [product, setProduct] = useState({
    product_name: "",
    price: 0,
    from: "",
    description: "",
    image: "",
    quantity: "",
  });

  const [category, setCategory] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:1997/categories")
      .then((response) => setCategory(response.data))
      .catch((error) => console.log(error));
  }, []);

  // ham lay gia tri tu cac o input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Trạng thái lưu trữ tập tin đã tải lên
  const [file, setFile] = useState("");

  // Xử lý sự kiện tải lên tệp và trạng thái cập nhật
  function handleChangeFile(event) {
    setFile(event.target.files[0]);
  }

  // goi API lay thong tin 1 san pham theo id
  useEffect(() => {
    // call API
    fetch(`http://localhost:1997/products/${idEdit}`)
      .then((response) => response.json()) //ep kieu ve dang json
      .then((response) => setProduct(response)) //lay du lieu
      .catch((error) => console.log(error)); //bat loi
  }, []);

  // tiến triển
  const [percent, setPercent] = useState(0);
  // ham cap nhat san pham
  const handleSubmit = (e) => {
    e.preventDefault();

    if (file) {
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
              return fetch(`http://localhost:1997/products/${idEdit}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json", //ep kieu dau vao tu js sang json
                },
                body: JSON.stringify({
                  ...product,
                  price: parseInt(product.price),
                  image: imageName,
                }),
              });
            })
            .then((response) => {
              // kiem tra du lieu tra ve
              if (response.status === 200) {
                // hien thi notification thanh cong
                notification.success({
                  message: "Success!",
                  description: "Product update successful",
                });
                // handleUpload(imageName)
                // an form them moi
                handleCloseFormEdit();
                loadData();
              }
            })
            .catch((error) => console.log(error));
        }
      );
    } else {
      fetch(`http://localhost:1997/products/${idEdit}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", //ep kieu dau vao tu js sang json
        },
        body: JSON.stringify({ ...product, price: parseInt(product.price) }),
      })
        .then((response) => {
          // kiem tra du lieu tra ve
          if (response.status === 200) {
            // hien thi notification thanh cong
            notification.success({
              message: "Success!",
              description: "Cap the most effective products",
            });
            // an form them moi
            handleCloseFormEdit();
            loadData();
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <div className="product-container">
        <form onSubmit={handleSubmit} className="form-container">
          <div className="mb-3">
            <h2>+ Updates Product </h2>
          </div>
          <div>
            <div className="d-flex gap-2">
              <div className="mb-3 mt-3">
                <label htmlFor="product_name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={product.product_name}
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
                  value={product.price}
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
                  value={product.quantity}
                  name="quantity"
                  id="quantity"
                  min={0}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  value={product.description}
                  name="description"
                  id="description"
                  onChange={handleChange}
                  cols="45"
                  rows="3"
                ></textarea>
              </div>
              {/* <div className="mb-4">
                <label className="form-label" htmlFor="from">
                  From
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={product.from}
                  name="from"
                  id="from"
                  onChange={handleChange}
                />
              </div> */}
              <div className="mb-4">
                <div className="mb-3 mt-3">
                  <label className="form-label" htmlFor="category_id">
                    Type --
                  </label>
                  <select
                    name="category_id"
                    id="category_id"
                    onChange={handleChange}
                  >
                    {category.map((cate) => (
                      <option value={cate.id} key={cate.id}>
                        {cate.category_name}
                      </option>
                    ))}
                  </select>
                </div>
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
          </div>

          <button type="submit" className="btn btn-primary me-2">
            Update
          </button>
          <button
            onClick={handleCloseFormEdit}
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
