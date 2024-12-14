import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({ message: "Name is required" }); // Use 400 for Bad Request
    }

    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(409).send({
        // Use 409 for Conflict
        success: false,
        message: "Category already exists",
      });
    }

    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      // Use 201 for Created
      success: true,
      message: "New category created",
      category,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: "Error creating category",
      error: err.message, // Send only the error message
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    if (!name) {
      return res.status(400).send({ message: "Name is required" }); // Validate input
    }

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: "Error while updating category",
      error: err.message,
    });
  }
};

export const categoryController = async (req, res) => {
  try {
    const category = await categoryModel.find();
    res.status(200).send({
      success: true,
      message: "All category list",
      category,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: "Error while fetching all categories",
      error: err.message,
    });
  }
};

export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get Single Category SUccessfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Category",
    });
  }
};

//delete category
export const deleteCategoryCOntroller = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Categry Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting category",
      error,
    });
  }
};
