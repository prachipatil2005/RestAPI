import userModel from "../model/userModel.js";

export const create = async (req, res) => {
  try {
    const userData = new userModel(req.body);
    const { email } = userData;

    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "user already exist" });
    }
    const savedUser = await userData.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server Error" });
  }
};
export const fetch = async (req, res) => {
  try {
    const users = await userModel.find();
    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server Error" });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await userModel.findOne({ _id: id });
    if (!userExist) {
      return res.status(404).json({ message: "user not found." });
    }
    const updateUser = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(updateUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server Error" });
  }
};


export const deleteuser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await userModel.findOne({ _id: id });
    if (!userExist) {
      return res.status(404).json({ message: "user not found." });
    }
    await userModel.findByIdAndDelete(id);
    res.status(201).json({message:"User deleted."})

  } catch (error) {
    res.status(500).json({ error: "Internal server Error" });
  }
};
