import mongoose, { Schema, Document } from "mongoose"
import { v4 as uuidv4 } from "uuid"
import { ITag } from "./Tag"
import { ICategory } from "./Category"

export interface IPost extends Document {
    _id: string
    title: string
    content: string
    rating: number
    free: Boolean
    author: string
    category: ICategory
    tags: ITag[]
}

const postSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4()
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
        set: (val: number) => Math.round(val * 10) / 10
    },
    free: {
        type: Boolean,
        default: true
    },
    author: {
        type: String,
        ref: "User",
        required: true
    },
    category: [
        {
            type: Schema.Types.ObjectId,
            ref: "Category"
        }
    ],
    tags: [
        {
            type: Schema.Types.ObjectId,
            ref: "Tag"
        }
    ]
})

postSchema.index({ price: 1, ratingsAverage: -1 })

export default mongoose.model<IPost>("Post", postSchema)
