import mongoose from "mongoose"

const Statistics_UsageSchema = mongoose.Schema(
    {
        number_of_connections: {
            type: Number,
        },
        time_passes_on_application: {
            type: Number
        }
    },
    { timestamps: true }
)

const Statistics_Usage = mongoose.model("Statistics_Usage", Statistics_UsageSchema)
export default Statistics_Usage