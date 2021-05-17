import mongoose, { Schema, Document } from "mongoose"
import { v4 as uuidv4 } from "uuid"
import { ITag } from "./Tag"
import { ICategory } from "./Category"

export interface IUser extends Document {
    _id: string
    name: string
    firstname: string
    lastname: string
    email: string
    role: Object
    password: string
    phone_number: string
    intgerested_categories: ICategory[]
    intgerested_tags: ITag[]
    address: Object
}

let roles = {
    user: {
        name: "user",
        operations: ["read", "edit", "create", "delete"]
    },
    admin: {
        name: "admin",
        operations: ["read", "delete", "edit"]
    },
    manager: {
        name: "manager",
        operations: ["read", "edit"]
    }
}

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4()
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: Object,
        default: roles.user
    },
    password: {
        type: String,
        required: true
    },
    phone_number: {
        type: String
    },
    intgerested_categories: [
        {
            type: Schema.Types.ObjectId,
            ref: "Category"
        }
    ],
    intgerested_tags: [
        {
            type: Schema.Types.ObjectId,
            ref: "Tag"
        }
    ],
    address: {
        type: {
            type: String,
            default: "Point",
            enum: ["Point"]
        },
        coordinates: [Number],
        address: String
    }
})

export default mongoose.model<IUser>("Users", userSchema)
