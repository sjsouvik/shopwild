import { rest } from "msw";
import { endpoints } from "../common/endpoints";
import { products } from "./testData";

export const handlers = [
  rest.get(endpoints.products, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ product: products }));
  }),

  rest.get(endpoints.wishlist, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ wishlist: [] }));
  }),

  rest.post(endpoints.wishlist, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.get(endpoints.cart, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ cart: [] }));
  }),

  rest.post(endpoints.cart, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.delete(endpoints.cart, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.get("*", (req, res, ctx) => {
    console.error(`Please add request handler for ${req.url.toString()}`);
    return res(
      ctx.status(500),
      ctx.json({ error: "You must add request handler." })
    );
  }),
];
