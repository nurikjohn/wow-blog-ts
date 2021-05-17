import mongoose, { Schema, Document, HookNextFunction } from "mongoose"
import { v4 as uuidv4 } from "uuid"
import Post, { IPost } from "./Post"
import { IUser } from "./User"

export interface IFeedback extends Document {
    _id: string
    feedback: string
    rating: number
    post: IPost
    user: IUser
}

const feedbackSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4()
    },
    feedback: {
        type: String
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

feedbackSchema.index({ post: 1, user: 1 }, { unique: true })

feedbackSchema.statics.calcAverageRatings = async function (postId: string) {
    const stats = await this.aggregate([
        {
            $match: { post: postId }
        },
        {
            $group: {
                _id: "$post",
                rating: { $avg: "$rating" }
            }
        }
    ])

    if (stats.length > 0) {
        await Post.findByIdAndUpdate(postId, {
            rating: stats[0].rating
        })
    } else {
        await Post.findByIdAndUpdate(postId, {
            rating: 0
        })
    }
}

feedbackSchema.post("save", function () {
    // @ts-ignore
    this.constructor.calcAverageRatings(this.post)
})

feedbackSchema.pre(/^findOneAnd/, async function (next: HookNextFunction) {
    // @ts-ignore
    this.doc = await this.findOne()
    next()
})

feedbackSchema.post(/^findOneAnd/, async function () {
    // @ts-ignore
    await this.doc.constructor.calcAverageRatings(this.doc.post)
})

export default mongoose.model<IFeedback>("Feedback", feedbackSchema)
