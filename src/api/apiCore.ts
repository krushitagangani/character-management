import axios from "axios";
import config from "../config";

// default
axios.defaults.baseURL = config.API_URL;

// content type
axios.defaults.headers.post["Content-Type"] = "application/json";

// intercepting to capture errors
axios.interceptors.response.use(
  function (response: any) {
    return response.data ? response.data : response;
  },
  function (error: any) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      case 404:
        message = "Sorry! the data you are looking for could not be found";
        break;
      default:
        message = error.message || error;
    }
    return Promise.reject(message);
  }
);

class APIClient {
  /**
   * Fetches data from given url
   */
  get = (url: string, params?: any) => {
    let response;
    if (params) {
      let paramKeys: Array<any> = [];
      Object.keys(params).map(key => {
        if (Array.isArray(params[key])) {
          params[key].map((pk: string) => {
            return paramKeys.push(key + "=" + pk);
          });
        } else {
          paramKeys.push(key + "=" + params[key]);
        }
        return paramKeys;
      });

      var queryString =
        paramKeys && paramKeys.length ? paramKeys.join("&") : "";
      response = axios.get(`${url}?${queryString}`, params);
    } else {
      response = axios.get(`${url}`, params);
    }
    return response;
  };

  getMultiple = (urls: Array<string>, params?: any) => {
    const reqs: Array<any> = [];
    let queryString = "";
    if (params) {
      queryString = params
        ? Object.keys(params)
            .map(key => key + "=" + params[key])
            .join("&")
        : "";
    }

    for (const url of urls) {
      reqs.push(axios.get(`${url}?${queryString}`));
    }
    return axios.all(reqs);
  };
}

export { APIClient };
