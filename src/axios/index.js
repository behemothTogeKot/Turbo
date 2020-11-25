import axios from "axios";

// const baseURL =
// 'https://5fb0f9d859018900164463bd.mockapi.io/api/userform/users';
const baseURL = "https://ru.turbo.az/api/v1/";

const instance = axios.create({
  baseURL,
  headers: { Accept: "application/json" },
});

const requestPrettify = (config) => {
  //   //func can be used further in case if necessity to add some
  //   // token to header etc.
  return config;
};

const errorHandler = (error) => {
  console.log(String(error));
};

instance.interceptors.request.use(requestPrettify, errorHandler);

export const getCars = (params) => {
  return instance({
    method: "get",
    url: "autos",
    params,
  });
};

export const updateCar = (params) => {
  return instance({
    method: "put",
    url: "autos",
    params,
  });
};

export const createCar = (params) => {
  return instance({
    method: "post",
    url: "autos",
    params,
  });
};

export const deleteCar = (params) => {
  return instance({
    method: "delete",
    url: "autos",
    params,
  });
};
