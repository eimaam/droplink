import { UserRoleEnum } from "../../../shared/types/user.types";

export interface IUser {
    _id: string;
    role: UserRoleEnum;
    username: string;
    fullName: string;
    email: string; 
    phoneNumber?: string;
}

