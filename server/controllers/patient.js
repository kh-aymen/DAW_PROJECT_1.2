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

export const getMyDoctor = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }

        const patient = await Patient.findOne({ User_id: user._id })

        res.status(200).json({ patient });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const addDoctor = async (req, res) => {
    try {
        const doctor = req.body
        const { id } = req.params

        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }

        const patient = await Patient.findOne({ User_id: user._id })
        patient.myDoctor = doctor
        patient.save()
        res.status(200).json({ patient });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getMyplansAndReviews = async (req, res) => {
    try {
        const { id } = req.params

        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }

        const patient = await Patient.findOne({ User_id: user._id })

        const data = patient.MyplansAndReviews
        res.status(200).json({ data });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const setMyplansAndReviews = async (req, res) => {
    try {
        const { scorevalue } = req.body
        console.log(scorevalue)
        const { id } = req.params
        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        const patient = await Patient.findOne({ User_id: user._id })
        patient.score = scorevalue
        patient.save()
        const data = patient.score
        res.status(200).json({ data });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}
export const setMyplansAndReviewsComment = async (req, res) => {
    try {
        const { commentsvalue } = req.body
        console.log(commentsvalue)
        const { id } = req.params
        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        const patient = await Patient.findOne({ User_id: user._id })
        patient.comments = commentsvalue
        patient.save()
        const data = patient.comments
        res.status(200).json({ data });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}
export const setMyplansAndReviewsappointmentDate = async (req, res) => {
    try {
        const { appointmentDate } = req.body
        console.log(appointmentDate)
        const { id } = req.params
        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        const patient = await Patient.findOne({ User_id: user._id })
        patient.appointment = appointmentDate
        patient.save()
        const data = patient.appointment
        res.status(200).json({ data });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}