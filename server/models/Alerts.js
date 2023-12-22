import mongoose from "mongoose"

const AlertsSchema = mongoose.Schema(
    {
        Patient_id: {
            type: Object
        },
        date_of_Alerts: {
            type: Date,
        },
        type_of_Alerts: {
            type: String,
        }
    },
    { timestamps: true }
)

const Alerts = mongoose.model("Alerts", AlertsSchema)
export default Alerts