export type User = {
    uid: string
    username: string
    email: string
    chatGroups: string[]
    following: string[]
    followers: string[]
}

export type CreateUser = {
    username: string
    email: string
    password: string
}

export type LoginUser = {
    email: string
    password: string
}