export type User = {
    uid: string
    username: string
    email: string
    chatGroups: string[]
    following: string[]
    followers: string[]
    uniqueNumber: number
    profilePicture: string
}

export type CreateUser = {
    username: string
    email: string
    password: string
    profilePicture: string
}

export type LoginUser = {
    email: string
    password: string
}

export type LastUniqueNumber = {
    LastUniqueNumber: number
}