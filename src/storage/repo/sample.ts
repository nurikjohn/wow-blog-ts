import { IUser } from "../../models/User"
import { findAllQuery } from "../../types/querymodel"

export interface IUserAllResponse {
    payloads: IUser[]
    count: number
}

export interface UserRepo {
    create(payload: IUser): Promise<IUser>
    update(slug: string, payload: IUser): Promise<string>
    delete(slug: string): Promise<any>
    findAll(query: findAllQuery): Promise<IUserAllResponse>
    findOne(query: IUser): Promise<IUser>
}
