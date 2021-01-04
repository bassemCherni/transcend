import { Account } from './account';
import { WorkSpace } from './workSpace';

export class Affiliation {
    id: number;
    account: Account;
    workSpace: WorkSpace;
    role: string;
    active: boolean;
}