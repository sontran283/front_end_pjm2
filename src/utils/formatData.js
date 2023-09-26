/**
 * ham format tien te viet nam
 * @param {*} money  // tham so truyen vao la chuoi tien te can format
 * @returns  // chuoi tien te da duoc format
 * Author : SONTRAN
 */
export const formatMoney = (money) => {
  try {
    return money.toLocaleString("vi", { style: "currency", currency: "VND" });
  } catch (e) {
    return ""
  }
};

/**
 * dinh dang chuoi thoi gian
 * @param {*} date  // chuoi thoi gian can dinh dang
 * @returns  // dinh  dang thoi gian ngay- thang- nam
 * Author : SONTRAN
 */
export const formatDate = (date) => {
  // lay ra dinh dang thoi gian cua chuoi, dua vao thoi gian thuc
  const today = new Date(date);
  // lay ra nam
  let year = today.getFullYear();
  // lay ra thang
  let month = today.getMonth() + 1;
  if (month > 0 && month < 10) {
    month = `0${month}`;
  }
  //  lay ra ngay
  let day = today.getDate();
  //  tra ra chuoi can dinh dang
  return `${day}-${month}-${year}`;
};

/**
 * Validate email
 * @param {*} email : chuỗi email cần kiểm tra
 * @returns true nếu đúng định dạng, false nếu sai định dạng
 * Author: SONTRAN
 */
export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
