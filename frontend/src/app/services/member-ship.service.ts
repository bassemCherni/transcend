import { Assagniee } from './../models/assagniee';
import { MembershipResponse } from './../models/MembershipResponse';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MemberShipService {

  constructor(private http: HttpClient) { }

  getMemberships(id_account: number, id_ws: number) {
    return this.http.get<MembershipResponse[]>('http://localhost:8085/rest/Membership/findSpecific/' + id_account + '/' + id_ws);
  }

  favorit(id: number) {
    return this.http.get<MembershipResponse>('http://localhost:8085/rest/Membership/favorit/' + id);
  }

  membership(id_account: number, id_project: number) {
    return this.http.get<MembershipResponse>('http://localhost:8085/rest/Membership/getMembership/' + id_account + '/' + id_project);
  }

  developersByProject(id_project: number) {
    return this.http.get<Assagniee[]>('http://localhost:8085/rest/Membership/developersByProject/' + id_project);
  }
}
