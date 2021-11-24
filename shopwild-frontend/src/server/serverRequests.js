import axios from "axios";

const serverRequests = async ({ requestType, data, url, token }) => {
  switch (requestType) {
    case "get":
      try {
        const response = await axios.get(url, token);
        return { response, statusCode: response?.status };
      } catch (error) {
        return { error: true, statusCode: error?.response?.status };
      }

    case "post":
      try {
        const response = await axios.post(url, data, token);
        return { response, statusCode: response?.status };
      } catch (error) {
        return { response: null, statusCode: error.response.status };
      }

    case "delete":
      try {
        const response = await axios.delete(url, token);
        return { response, statusCode: response?.status };
      } catch (error) {
        return { error: true, statusCode: error?.response?.status };
      }

    default:
      return;
  }
};

export default serverRequests;
