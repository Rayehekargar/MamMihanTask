import axios, { AxiosInstance } from "axios";
import { API_BASE_URL } from "../config";
import toastAlert from "../helpers/toast";
import { log } from "../helpers/helpers";
import { setCookie,  getCookie} from "../helpers/cookie";
import { OptionsTypes } from "./model";
import { authAddresses } from "../constants/relative-url";

const base = (authorization: boolean = false): AxiosInstance => {
  const options: OptionsTypes = {
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json"
    }
  };

 
  if (authorization) options.headers["Authorization"] = "Bearer " + getCookie('accessToken') ?? "";

  const instance = axios.create(options);

  instance.interceptors.request.use(
    function (config) {
     
      return config;
    },
    function (error) {

      return Promise.reject(error);
    }
  );

  const responseInterceptor = instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response) {
        if (error.response.status === 403) {
          const refreshToken = getCookie('refreshToken');
          console.log({ refreshToken });
          if (!authorization) return;
          if (!refreshToken) {
            return;
          }
          options.headers["Content-Type"] = "application/json";
          instance.interceptors.response.eject(responseInterceptor);
          return instance
            .post(authAddresses.refreshToken, { refreshToken }, options)
            .then(response => {
              log("Refresh Response", response);
              const { data } = response;
              setCookie('accessToken', data.accessToken);
              error.response.config.headers["Authorization"] = "Bearer " + data.accessToken;
              return axios(error.response.config);
            })
            .catch(error => {
              log("Check Refresh Error:", error.response);
              return;
            });
        }
        if (error.response.status >= 500 && error.response.status < 600)
          toastAlert(error.response.data?.message ?? error.response.statusText, "error");
        if (error.response.status >= 400 && error.response.status < 500)
          toastAlert(error.response.data?.message ?? error.response.statusText, "warning");
        if (error.response.status >= 300 && error.response.status < 400)
          toastAlert(error.response.data?.message ?? error.response.statusText, "info");
        log(error.response);
        log(error.response.data);
        log(error.response.status);
        log(error.response.statusText);
        log(error.response.headers);
      }else {
        log("Error:", error.message);
      }
    }
  );

  return instance;
};

export default base;
