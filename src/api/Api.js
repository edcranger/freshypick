import axios from "axios";
import { Cookies } from "quasar";

const Api = axios.create({
  withCredentials: true
});

// Add a request interceptor
Api.interceptors.request.use(function(config) {
  const xsrfToken = Cookies.get("csrf_id");
  // CSRF Token.
  if (xsrfToken) config.headers["X-XSRF-TOKEN"] = xsrfToken;
  return config;
});

export default Api;
