import mongoose from "mongoose";
const { Schema, model } = mongoose;

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },

        // image: {
        //     type: String,
        //     required: true,
        // },
        // adminUsername: {
        //     type: String,
        //     required: true,
        // },
    },

    {
        collection: "categories",
        timestamps: true,
    }
);

const Category = model("Category", categorySchema);
export default Category;
