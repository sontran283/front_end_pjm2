import React, { useEffect, useState } from "react";
import { storage } from "../firebase/configFirebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import ReactPlayer from "react-player";

export default function UploadSingelFile() {
  // muon lay duoc cai gia tri file trong div o duoi, cho no 1 cai hook
  // khi chua co du lieu, mac dinh la null
  const [imageUpload, setImageUpload] = useState(null);

  // co nhieu file, thi luu tru bang dạng mảng
  const [imageUrls, setImageUrls] = useState([]);

  // tạo một tham chiếu đến thư mục trên kho ảnh trên firebase
  const imageLishRef = ref(storage, "images/");

  // hàm upload file len firebase
  const uploadFiles = (files) => {
    // phai xu li duoc tac vu them nhieu file => ba dong bo => su dung promise
    Promise.all(
      files.map((file) => {
        // tao mot tham chieu tương đương tao folder tren firebase
        const imageRef = ref(storage, `images/${file.name}`);
        return uploadBytes(imageRef, file).then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        });
      })
    ).then((urls) => {
      // tra ve danh sach ca url
      setImageUrls((prev) => [...prev, urls]);
    });
  };

  const handleSelectFiles = (e) => {
    // lay tat ca cac gia tri co o input co type = "file"
    const files = Array.from(e.target.files);
    setImageUpload(files);
  };

  // khi click vao nut upload thi tien hanh upload len firebase
  const handleUpLoad = () => {
    // console.log(e.target.files[0]);
    // neu imageUpload ko co gia tri
    if (!imageUpload) {
      return;
    } else {
      // neu nhu co gia tri, tien hanh push no vao
      uploadFiles(imageUpload);
    }
  };

  // truoc khi lấy url trên firebase, thi len tren, tạo một tham chiếu đến thư mục trên kho ảnh trên firebase
  useEffect(() => {
    listAll(imageLishRef).then((response) => {
      // response trả về là 1 mảng danh sách các url
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);   // danh sach url
        });
      });
    });
  }, []);

  return (
    <>
      <div>
        <h1>Danh sách hình ảnh</h1>
        <div style={{ display: "flex", gap: 10 }}>
          {imageUrls.map((url) => (
            // <ReactPlayer url={url} controls={true} />    // up video
            <img       // up anh
                src={url}
                key={url}
                style={{ objectFit: 'cover' }}
                height={100}
                width={100}
                alt="ảnh" />
          ))}
        </div>
        <input type="file" multiple onChange={handleSelectFiles} />
        <button onClick={handleUpLoad}> Upload</button>
      </div>
    </>
  );
}
