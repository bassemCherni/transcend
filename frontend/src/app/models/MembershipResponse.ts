import { Project } from './project';
export class MembershipResponse {
    id: number;
    project: Project;
    account: number;
    favorite: boolean;
    active: boolean;
    start_date: string;
    end_date: string;
}