import axios from "axios";

const apiCall = async (url, method, data, id) => {
  const res = await axios.request({
    url: url,
    method: method,
    data: data,
  });
  if (res.status !== 200) {
    return "failed";
  }
  if (method === "DELETE") {
    return id;
  }

  return res.data;
};

export const fetchData = () => {
  return apiCall("https://api-hook-101.herokuapp.com/api/lists", "GET");
};

export const fetchOne = (id) => {
  return apiCall(`https://api-hook-101.herokuapp.com/api/list/${id}`, "GET");
};

export const editData = async (id, name) => {
  let myObj = {
    name: name,
    address: Date(),
  };

  return apiCall(
    `https://api-hook-101.herokuapp.com/api/edit/${id}`,
    "PATCH",
    myObj
  );
};

export const deleteData = async (id) => {
  return apiCall(
    `https://api-hook-101.herokuapp.com/api/delete/${id}`,
    "DELETE",
    null,
    id
  );
};
export const addData = async (name) => {
  let myObj = {
    name: name,
    address: Date(),
  };

  return apiCall(`https://api-hook-101.herokuapp.com/api/add`, "POST", myObj);
};
