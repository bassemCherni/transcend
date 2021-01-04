import { Sprint } from './sprint';
import { Epic } from './epic';
import { Project } from './project';
import { Account } from './account';
export class Issue {
    id_issue: number;
    title: string;
    description: string;
    type: string;
    project: Project;
    epic: Epic;
    sprint: Sprint;
    story_point: number;
    creation_date: string;
    assignee: Account;
    status: string;
    vued: boolean;
    indexer: number;
    last_modified: string;
}