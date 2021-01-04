import { Affiliation } from './../models/affiliation';
import { WorkSpace } from './../models/workSpace';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkSpaceService {

  constructor(private http: HttpClient) { }

  getWorkSpaces(id: number) {
    return this.http.get<WorkSpace[]>('http://localhost:8085/rest/workSpace/findByAffiliation/getAll/' + id);
  }

  createWorkSpaces(id_user: number, workspace_name: string, logo: string) {
    return this.http.get<Affiliation>('http://localhost:8085/rest/workSpace/save/' + id_user + '/' + workspace_name + '/' + logo);
  }

  archiveWorkSpaces(id: number, id_user: number) {
    return this.http.get<any>('http://localhost:8085/rest/workSpace/archive/' + id + '/' + id_user);
  }
}
