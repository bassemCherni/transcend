import { Issue } from './issue';
import { Project } from './project';
export class Sprint {
    id_sprint: number;
    project: Project;
    title: string;
    description: string;
    creation_date: string;
    starting_date: string;
    due_date: string;
    status: string;
    delaye: boolean;
    index: number;
    issues: Issue[] = [];
}
