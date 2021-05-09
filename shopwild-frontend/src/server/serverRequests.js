import axios from "axios";

const serverRequests = async ({ requestType, data, url }) => {
  switch (requestType) {
    case "get":
      try {
        const response = await axios.get(url);
        return response.status === 200
          ? { response, error: false }
          : { error: true };
      } catch (error) {
        return { error: true };
      }

    case "post":
      try {
        const response = await axios.post(url, data);
        return response.status === 200
          ? { response, error: false }
          : { error: true };
      } catch (error) {
        return { error: true };
      }

    case "delete":
      try {
        const response = await axios.delete(url, {
          headers: { "Content-Type": "application/json" },
          data: data,
        });
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
