import { UserStorage } from "./mongo/user"

interface IStorage {
    user: UserStorage
}

export let storage: IStorage = {
    user: new UserStorage()
}
