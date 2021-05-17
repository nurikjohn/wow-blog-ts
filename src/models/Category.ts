import mongoose, { Schema, Document } from "mongoose"
import { v4 as uuidv4 } from "uuid"

export interface ICategory extends Document {
    _id: string
    name: string
}

let categorySchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4()
    },
    name: {
        type: String
    }
})

export default mongoose.model<ICategory>("Category", categorySchema)
