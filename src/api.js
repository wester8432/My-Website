import axios from "axios";

const req = axios.create({
  baseURL: "",
  timeout: 1000 * 15,
});

req.defaults.headers.get["Content-Type"] = "text/plain";
req.defaults.headers.post["Content-Type"] = "multipart/form-data";
req.defaults.headers.patch["Content-Type"] = "multipart/form-data";
req.defaults.headers.delete["Content-Type"] = "multipart/form-data";

req.interceptors.request.use(
  (config) => {
    if (config.data && !(config.data instanceof FormData)) {
      let formData = new FormData();
      for (let [k, v] of Object.entries(config.data)) {
        if (Array.isArray(v)) {
          v.forEach((n, index) => formData.append(`${k}[${index}]`, n || ""));
        } else {
          formData.append(k, v || "");
        }
      }
      config.data = formData;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

req.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default req;
