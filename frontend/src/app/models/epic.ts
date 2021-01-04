import { Issue } from './issue';
import { Project } from './project';
export class Epic {
    id_epic: number;
    project: Project;
    title: string;
    description: string;
    creation_date: string;
    status: string;
    issues: Issue[];
}