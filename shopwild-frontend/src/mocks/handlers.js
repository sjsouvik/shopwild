import { rest } from "msw";
import { endpoints } from "../common/endpoints";
import { products } from "./testData";

export const handlers = [
  rest.get(endpoints.products, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ product: products }));
  }),

  rest.get("*", (req, res, ctx) => {
    console.error(`Please add request handler for ${req.url.toString()}`);
    return res(
      ctx.status(500),
      ctx.json({ error: "You must add request handler." })
    );
  }),
];
