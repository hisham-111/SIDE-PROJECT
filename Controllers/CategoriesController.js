import Model from "../Models/CategoriesModel.js";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

// get all the categories
export const getAll = async (req, res, next) => {
    try {
        const response = await Model.find({});
        res.status(200).send({ success: true, response });
    } catch (err) {
        return next(err);
    }
};

// get a category by id
export const get = async (req, res, next) => {
    try {
        const category = await Model.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json(category);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, err: err.message });
    }
};

// add category
export const addCategories = async (req, res, next) => {
    try {
        console.log(req.body);
        const form = new Model({
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            // adminUsername: req.admin.username,
        });

        await form.save().then((response) => {
            if (response) {
                res.status(200).send({
                    status: 200,
                    message: "Added category successfuly",
                    response,
                });
            }
        });
    } catch (err) {
        return next(err);
    }
};

// edit category
export const updateCategories = async (req, res, next) => {
    const { name, description, image } = req.body;
    try {
        let category = await Model.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        if (category.image) {
            fs.unlinkSync(`${category.image}`);
        }
       
        category.name = name;
        category.description = description;
        category.image = image;
        await category.save();
        res.json(category);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, err: err.message });
    }
};

// delete category
export const deleteCategories = async (req, res) => {
    let { id } = req.params;
    try {
        const category = await Model.findByIdAndDelete({ _id: id });
        if (category !== null && category !== undefined) {
            fs.unlinkSync(`${category.image}`, (err) => {
                if (err) throw err;
                console.log(`Successfully deleted image ${category.image}`);
            });
        }

        res.status(200).json("category deleted successfully");
    } catch (error) {
        res.json({ error: error.message });
    }
};

const Controller = {
    getAll,
    get,
    addCategories,
    updateCategories,
    deleteCategories,
};

export default Controller;
