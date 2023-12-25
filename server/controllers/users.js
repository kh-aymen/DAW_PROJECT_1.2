import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updatePersonalInfoForm = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName } = req.body;
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.firstName = firstName;
    user.lastName = lastName;
    await user.save();

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateLocationAndOccupation = async (req, res) => {
  try {
    const { id } = req.params;
    const { location, occupation } = req.body;
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.location = location;
    user.occupation = occupation;
    await user.save();

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};