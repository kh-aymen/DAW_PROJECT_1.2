import mongoose from "mongoose"

const AdminSchema = mongoose.Schema(
    {
        User_id: {
            type: Object
        },
        admin_role: {
            type: String,
        },
        permissions: {
            type: String,
        }
    },
    { timestamps: true }
)

const Admin = mongoose.model("Admin", AdminSchema)
export default Admin 