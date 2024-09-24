

export type UserModel={
    id: number | undefined
    username: string | undefined
    password: string | undefined
    salt: string | undefined
    email: string | undefined
    profilePicture: string | undefined
    fullName: string | undefined
    gender: "M" | "F" | "O" | undefined
    userAddress: string | undefined
    phoneNumber: string | undefined
}
