import { Sprint } from './../models/sprint';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  constructor(private http: HttpClient) { }

  findByIdProject(id: number) {
    return this.http.get<Sprint[]>('http://localhost:8085/rest/Sprint/getByProject/' + id);
  }

  allSprints(id: number) {
    return this.http.get<Sprint[]>('http://localhost:8085/rest/Sprint/allSprints/' + id);
  }

  getById(id: number) {
    return this.http.get<Sprint>('http://localhost:8085/rest/Sprint/getOne/' + id);
  }

  createSprint(sprint: Sprint, idSm: number) {
    return this.http.post<Sprint>('http://localhost:8085/rest/Sprint/save/' + idSm, sprint);
  }

  activeSprintByProject(id: number) {
    return this.http.get<Sprint>('http://localhost:8085/rest/Sprint/activeSprint/' + id);
  }

  completeSprint(sprint: Sprint, idSm: number) {
    return this.http.post<Sprint>('http://localhost:8085/rest/Sprint/completeSprint/' + idSm, sprint);
  }

  deleteSprint(sprint: Sprint, idSm: number) {
    return this.http.post<any>('http://localhost:8085/rest/Sprint/deleteSprint/' + idSm, sprint);
  }

  remainingPoints(id: number) {
    return this.http.get<number>('http://localhost:8085/rest/Sprint/remainingPoints/' + id);
  }
}
