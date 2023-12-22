import Doctor from "../models/Doctor.js";
import User from "../models/User.js";

export const getDoctor = async (req, res) => {
    try {
        const doctortData = await Doctor.find();

        const doctortsWithUser = await Promise.all(
            doctortData.map(async (doctort) => {
                const user = await User.findById(doctort.User_id);
                return {
                    ...doctort.toObject(),
                    user: user.toObject(),
                };
            })
        );
        res.status(200).json(doctortsWithUser);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const deleteDoctor = async (req, res) => {
    try {
        const { doctorId, userId } = req.body;

        await User.findByIdAndDelete(userId)
        await Doctor.findByIdAndDelete(doctorId)


        res.status(200).json({ message: 'Doctor deleted successfully.' });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}