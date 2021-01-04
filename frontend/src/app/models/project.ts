import { WorkSpace } from './workSpace';
export class Project {

    id_project: number;
    workSpace: WorkSpace;
    title: string;
    descreption: string;
    creation_date: string;
    starting_date: string;
    due_date: string;
    status: string;
    archived: boolean;
    logo: string;
}