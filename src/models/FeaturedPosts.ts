import mongoose, { Schema, Document } from "mongoose"
import { v4 as uuidv4 } from "uuid"
import { IPost } from "./Post"

export interface IFeaturedPosts extends Document {
    _id: string
    name: string
    posts: IPost[]
}

const featuredPostsSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4()
    },
    name: {
        type: String
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
})

export default mongoose.model<IFeaturedPosts>("FeaturedPosts", featuredPostsSchema)
