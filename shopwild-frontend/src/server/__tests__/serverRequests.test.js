import serverRequests from "../serverRequests";
import axios from "axios";

jest.mock("axios");

describe("tests server requests", () => {
  test("should return the response with status code as 200 if the API get request is successful", async () => {
    const data = [
      {
        id: "2131",
        brandName: "Roadster",
        description: "Slim Fit Casual shirt",
        details:
          "Casual shirt, has a spread collar, long sleeves, curved hem, one patch pocket",
        image:
          "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/1291760/2017/12/5/11512469309068-Highlander-Dark-Green-Slim-Fit-Casual-Shirt-5071512469308877-3.jpg",
        offeredPrice: 1699,
        actualPrice: 2599,
        discount: 34,
      },
    ];

    const response = { data, status: 200 };
    axios.get.mockResolvedValue(response);

    const request = {
      requestType: "get",
      url: "http://localhost:8080/product",
    };
    const serverResponse = await serverRequests(request);

    expect(serverResponse).toEqual({ response, statusCode: 200 });
  });
});
