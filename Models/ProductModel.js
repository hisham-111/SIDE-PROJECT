import { Schema, model } from "mongoose";

const productSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',

      },
      image: {
        type: String,
      },
  },
  {
        collection: "Product",
        timestamps: true,
  }
);
productSchema.pre(['find', 'findOne'], function () {
    this.populate(['category'])
});
const Model = model("product", productSchema);

export default Model;