import Patient from "../models/Patient.js";
import User from "../models/User.js";

export const getPatient = async (req, res) => {
    try {
        const patientData = await Patient.find();

        const patientsWithUser = await Promise.all(
            patientData.map(async (patient) => {
                const user = await User.findById(patient.User_id);
                return {
                    ...patient.toObject(),
                    user: user.toObject(),
                };
            })
        );
        res.status(200).json(patientsWithUser);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const deletePatient = async (req, res) => {
    try {
        const { patientId, userId } = req.body;
        console.log(patientId, userId);

        await User.findByIdAndDelete(userId)
        await Patient.findByIdAndDelete(patientId)


        res.status(200).json({ message: 'Patient deleted successfully.' });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}
