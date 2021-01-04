import { Issue } from './../models/issue';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor(private http: HttpClient) { }

  findBySprint(id: number) {
    return this.http.get<Issue[]>('http://localhost:8085/rest/Issue/getBySprint/' + id);
  }

  findByEpic(id: number) {
    return this.http.get<Issue[]>('http://localhost:8085/rest/Issue/findByEpic/' + id);
  }

  createIssue(id_creator: number, issue: Issue) {
    return this.http.post<Issue>('http://localhost:8085/rest/Issue/save/' + id_creator, issue);
  }

  simpleUpdate(issue: Issue) {
    return this.http.post<Issue>('http://localhost:8085/rest/Issue/simpleUpdate', issue);
  }

  updateStatus(issue: Issue) {
    return this.http.post<Issue>('http://localhost:8085/rest/Issue/updateStatus', issue);
  }

  deleteIssue(id_creator: number, issue: Issue) {
    return this.http.post<any>('http://localhost:8085/rest/Issue/delete/' + id_creator, issue);
  }

  getById(id: number) {
    return this.http.get<Issue>('http://localhost:8085/rest/Issue/getOne/' + id);
  }

  getBySprintAndStatus(id: number, status: string) {
    return this.http.get<Issue[]>(`http://localhost:8085/rest/Issue/findBySprintAndStatus/${id}/${status}`);
  }

  getBySprintStatusAssignee(id: number, status: string, idAssignne: number) {
    return this.http.get<Issue[]>(`http://localhost:8085/rest/Issue/findBySprintStatusAssignee/${id}/${status}/${idAssignne}`);
  }

  backLog(id: number) {
    return this.http.get<Issue[]>('http://localhost:8085/rest/Issue/getByProject/' + id);
  }

  updateIndex(id: number, index: number) {
    return this.http.get<any>('http://localhost:8085/rest/Issue/updateIndex/' + id + '/' + index);
  }

  assigneDev(id: number, issue: Issue) {
    return this.http.post<Issue>('http://localhost:8085/rest/Issue/assigne/' + id, issue);
  }

  setSprint(idIssue: number, idSprint: number) {
    if (idSprint !== null) {
      return this.http.get<any>('http://localhost:8085/rest/Issue/setSprint/' + idIssue + '/' + idSprint);
    } else {
      return this.http.get<any>('http://localhost:8085/rest/Issue/setSprint/' + idIssue );
    }
  }
}
