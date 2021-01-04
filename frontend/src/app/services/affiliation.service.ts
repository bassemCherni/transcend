import { Affiliation } from './../models/affiliation';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AffiliationService {

  constructor(private http: HttpClient) { }

  getAffiliations(id: number) {
    return this.http.get<Affiliation[]>('http://localhost:8085/rest/affiliation/findByAccount/' + id);
  }

  affiliationByWs(id_account: number, id_ws: number) {
    return this.http.get<Affiliation>('http://localhost:8085/rest/affiliation/findByAccountAndWs/' + id_account + '/' + id_ws);
  }

  addAffiliations(affiliation: Affiliation) {
    return this.http.post<Affiliation>('http://localhost:8085/rest/affiliation/add', affiliation);
  }

  affiliationById(id: number) {
    return this.http.get<Affiliation>('http://localhost:8085/rest/affiliation/find/' + id);
  }

  renameWs(affiliation: Affiliation) {
    return this.http.post<Affiliation>('http://localhost:8085/rest/affiliation/renameWs', affiliation);
  }

  quit(affiliation: Affiliation) {
    return this.http.post<Affiliation>('http://localhost:8085/rest/affiliation/quit', affiliation);
  }

  getByAdmin(id: number) {
    return this.http.get<Affiliation[]>('http://localhost:8085/rest/affiliation/searchByAdmin/' + id);
  }

  workspaceMembers(id: number) {
    return this.http.get<Affiliation[]>('http://localhost:8085/rest/affiliation/workspaceMembers/' + id);
  }

  affByWsAndRole(id_ws: number, role: string) {
    return this.http.get<Affiliation[]>('http://localhost:8085/rest/affiliation/searchByWsAndRole/' + id_ws + '/' + role);
  }

  findByAccountAndProject(id_account: number, id_project: number) {
    return this.http.get<Affiliation>('http://localhost:8085/rest/affiliation/findByAccountAndProject/' + id_account + '/' + id_project);
  }
}
