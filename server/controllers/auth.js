import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Patient from "../models/Patient.js"
import Doctor from "../models/Doctor.js"
import Admin from "../models/Admin.js"

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      birthday,
      email,
      password,
      picturePath,
      role,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      gender,
      birthday,
      email,
      password: passwordHash,
      picturePath,
      role,
      location,
      occupation,
    });
    const savedUser = await newUser.save();
    const user = await User.findOne({ email: email })
    switch (role) {
      case "Patient":
        const newPatient = new Patient({ User_id: savedUser._id })
        await newPatient.save()
        break
      case "Doctor":
        const newDoctor = new Doctor({ User_id: savedUser._id })
        await newDoctor.save()
        break
      case "Admin":
        const newAdmin = new Admin({ User_id: savedUser._id })
        await newAdmin.save()
        break
    }
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const UpdatePassword = async (req, res) => {
  try {
    const {
      password,
    } = req.body;
    const { id } = req.params;

    const user = await User.findOne({ _id: id });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.password = passwordHash;
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};