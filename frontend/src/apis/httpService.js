import axios from "axios";

const httpService = {
  // apiEndpointShort: "https://ndfurnituremart.com/api/rest/",
  // apiEndpoint: "https://ndfurnituremart.com/index.php?route=feed/rest_api/",
  // apiEndpointLong: "https://ndfurnituremart.com/index.php?route=",
  // headers: {
  //   "X-Oc-Merchant-Id": "12345",
  //   Accept: "application/json",
  // },
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default httpService;
