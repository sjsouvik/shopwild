const mongoose = require("mongoose");
require("mongoose-type-url");

const productSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: [true, "Please enter name of the product"],
    },
    description: {
      type: String,
      required: [true, "Please enter description of the product"],
    },
    details: {
      type: String,
      required: [true, "Please enter details of the product"],
    },
    offeredPrice: {
      type: Number,
      required: [true, "Please enter offered price of the product"],
    },
    actualPrice: {
      type: Number,
      required: [true, "Please enter actual price of the product"],
    },
    image: {
      type: mongoose.SchemaTypes.Url,
      required: [true, "Please enter a valid URL of the product's image"],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Please enter the category name for this product"],
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

productSchema.virtual("discount").get(function () {
  return Math.round(
    ((this.actualPrice - this.offeredPrice) / this.actualPrice) * 100
  );
});

module.exports = mongoose.model("Product", productSchema);
