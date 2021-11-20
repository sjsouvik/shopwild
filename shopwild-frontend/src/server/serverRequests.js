import axios from "axios";

const serverRequests = async ({ requestType, data, url, token }) => {
  switch (requestType) {
    case "get":
      try {
        const response = await axios.get(url, token);
        return response.status === 200
          ? { response, error: false }
          : { error: true };
      } catch (error) {
        return { error: true };
      }

    case "post":
      try {
        const response = await axios.post(url, data, token);
        return response.status === 200
          ? { response, statusCode: response.status }
          : { response: null, statusCode: 400 };
      } catch (error) {
        return { response: null, statusCode: error.response.status };
      }

    case "delete":
      try {
        const response = await axios.delete(url, token);
        return response.status === 200
          ? { response, error: false }
          : { error: true };
      } catch (error) {
        return { error: true };
      }

    default:
      return;
  }
};

export default serverRequests;
