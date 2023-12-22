import mongoose from "mongoose"

const MessagesSchema = mongoose.Schema(
    {
        sender_ID: {
            type: Object
        },
        recipient_ID: {
            type: Object
        },
        content_of_Message: {
            type: String,
        },
        date_of_sending: {
            type: Date,
        }
    },
    { timestamps: true }
)

const Messages = mongoose.model("Messages", MessagesSchema)
export default Messages