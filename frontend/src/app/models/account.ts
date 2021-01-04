import { Users } from './users';

export class Account {
    id_account: number;
    id_user: Users;
    email: string;
    password: string;
    status: string;
    admin: boolean;
}
