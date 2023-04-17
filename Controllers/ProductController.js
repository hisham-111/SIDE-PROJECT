import Model from "../Models/ProductModel.js";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();




// get a Products by id
export const get = async (req, res, next) => {
  try {
      const product = await Model.findById(req.params.id);
      if (!product) {
          return res.status(404).json({ message: "product not found" });
      }
      res.json(product);
  } catch (err) {
      console.log(err);
      res.status(500).json({ status: 500, err: err.message });
  }
};



// get all the Products
export const getAll = async (req, res, next) => {
    try {
        const response = await Model.find({});
        res.status(200).send({ success: true, response });
    } catch (err) {
        return next(err);
    }
};

// add Products
export const addProduct = async (req, res, next) => {
    try {
        console.log(req.body);
        const form = new Model({
            name: req.body.name,
            description: req.body.description,
            price:req.body.price,
            image: req.body.image,
            // adminUsername: req.admin.username,
        });

        await form.save().then((response) => {
            if (response) {
                res.status(200).send({
                    status: 200,
                    message: "Added product successfuly",
                    response,
                });
            }
        });
    } catch (err) {
        return next(err);
    }
};

// edit Products
export const updateProduct = async (req, res, next) => {
    const { name, description,price, image } = req.body;
    try {
        let product = await Model.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "product not found" });
        }
        if (product.image) {
            fs.unlinkSync(`${product.image}`);
        }
       
        product.name = name;
        product.description = description;
        product.image = image;
        product.price = price;
        await product.save();
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, err: err.message });
    }
};

// delete Products
export const deleteProduct = async (req, res) => {
    let { id } = req.params;
    try {
        const product = await Model.findByIdAndDelete({ _id: id });
        if (product !== null && product !== undefined) {
            fs.unlinkSync(`${product.image}`, (err) => {
                if (err) throw err;
                console.log(`Successfully deleted image ${product.image}`);
            });
        }

        res.status(200).json("product deleted successfully");
    } catch (error) {
        res.json({ error: error.message });
    }
};

const Controller = {
    getAll,
    get,
    addProduct,
    updateProduct,
    deleteProduct,
};

export default Controller;

// export const getAllProducts = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;

//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;
    
//     const allProducts = await productModel.find()
//     .populate('category')
//     .skip(startIndex)
//     .limit(limit);
//     const totalCount = await productModel.countDocuments();

//     const pagination = {};
//     if (endIndex < totalCount) {
//       pagination.next = {
//         page: page + 1,
//         limit: limit
//       };
//     }
//     if (startIndex > 0) {
//       pagination.prev = {
//         page: page - 1,
//         limit: limit
//       };
//     }

//     res.status(200).json({ message: allProducts, pagination });
//   } catch (err) {
//     res.json({ error: err.message });
//   }
// };

