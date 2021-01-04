import { Project } from './../models/project';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  rename(id: number, name: string) {
    return this.http.get<Project>('http://localhost:8085/rest/project/rename/' + id + '/' + name);
  }

  archiveProject(id_account: number, idProject: number) {
    return this.http.get<any>('http://localhost:8085/rest/project/archive/' + id_account + '/' + idProject );
  }

  createProject(id_creator: number, id_sm: number, project: Project) {
    return this.http.post<Project>('http://localhost:8085/rest/project/createProject/' + id_creator + '/' + id_sm, project );
  }

  getById(id: number) {
    return this.http.get<Project>('http://localhost:8085/rest/project/getOne/' + id);
  }

  projectsByWs(idWs: number) {
    return this.http.get<Project[]>('http://localhost:8085/rest/project/projectsByWs/' + idWs );
  }

}
