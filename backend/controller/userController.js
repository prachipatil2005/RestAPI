import mongoose from "mongoose";
import userModel from "../model/userModel.js";

export const create = async (req, res) => {
  try {
    const userData = new userModel(req.body);
    const { email } = userData;

    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }
    await userData.validate();
    const savedUser = await userData.save();
    res.status(200).json(savedUser);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

export const fetch = async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 1;
    const limit =
      parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : 10;
    const skip = (page - 1) * limit;

    // Filtering
    const filter = {};
    if (req.query.name) {
      filter.name = { $regex: req.query.name, $options: "i" };
    }
    if (req.query.email) {
      filter.email = { $regex: req.query.email, $options: "i" };
    }
    if (req.query.address) {
      filter.address = { $regex: req.query.address, $options: "i" };
    }

    const users = await userModel.find(filter).skip(skip).limit(limit);
    const total = await userModel.countDocuments(filter);

    res.status(200).json({
      users,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalUsers: total,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await userModel.findOne({ _id: id });
    if (!userExist) {
      return res.status(404).json({ message: "User not found." });
    }
    await userModel.validate(req.body);
    const updateUser = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json(updateUser);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteuser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await userModel.findOne({ _id: id });
    if (!userExist) {
      return res.status(404).json({ message: "User not found." });
    }
    await userModel.findByIdAndDelete(id);
    res.status(201).json({ message: "User deleted." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
