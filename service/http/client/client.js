import axios from "axios";
import { apiBaseUrl } from "../../../environment/environment";
import AuthService from "../../../modules/auth/AuthService";

/**
 * Axios basic configuration
 */
const config = {
  baseURL: apiBaseUrl,
};

/**
 * Creating the instance of Axios
 * It is because, in large scale application we may need
 * to consume APIs from more than single server,
 */
const client = axios.create(config);

/**
 * Auth interceptors
 * @description Add auth tokens to every outgoing requests.
 * @param {*} config
 */
const authInterceptor = (config) => {
  config.headers.Authorization = `Bearer ${AuthService.token}`;
  config.headers.common.Accept = "Application/json";
  config.headers["Access-Control-Allow-Origin"] = "*";
  return config;
};

/**
 * Logger interceptors
 * @description Log app requests.
 * @param {*} config
 */
const loggerInterceptor = (config) =>
  /** Add logging here */
  config;

/** Adding the request interceptors */
client.interceptors.request.use(authInterceptor);
client.interceptors.request.use(loggerInterceptor);

/** Adding the response interceptors */
client.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    // Event.$emit('ApiError', 500, error.response.data.message)
    if (error.response.status === 401) AuthService.logout();
    error.response.data.message = error.response.data.message.includes(
      "CorrelationId:"
    )
      ? JSON.parse(
          error.response.data.message.split("code :").pop()
        ).error.message.split("CorrelationId:")[0]
      : error.response.data.message;
    throw error;
    // Promise.reject(error)
  }
);

export default client;
