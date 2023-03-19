const products = [
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
  {
    id: "2132",
    brandName: "Dennis Lingo",
    description: "Slim Fit Casual shirt",
    details:
      "Casual shirt, has a spread collar, long sleeves, curved hem, one patch pocket",
    image:
      "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/7488102/2019/8/22/8002a744-0dad-4dbb-9481-cf0090134c3b1566454086786-Dennis-Lingo-Men-Pink-Slim-Fit-Solid-Casual-Shirt-9891566454-1.jpg",
    offeredPrice: 1628,
    actualPrice: 2249,
    discount: 28,
  },
];

const user = {
  email: "test@gmail.com",
  firstName: "User",
  lastName: "Auth Testing",
  _id: "123",
};

const loggedInUserDetails = { token: "token123", user };

export { products, loggedInUserDetails };
