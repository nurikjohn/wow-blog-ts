import mongoose, { Schema, Document } from "mongoose"
import { v4 as uuidv4 } from "uuid"

export interface ITag extends Document {
    _id: string
    name: string
}

let tagSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4()
    },
    name: {
        type: String
    }
})

export default mongoose.model<ITag>("Tag", tagSchema)
