import { ProfilePicUpdate } from './../models/ProfilePicUpdate';
import { Users } from './../models/users';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(user: Users) {
    return this.http.post<Users>('http://localhost:8085/rest/users/register', user);
  }

  updatePic(pic: ProfilePicUpdate) {
    return this.http.post<any>('http://localhost:8085/rest/users/updatePic', pic);
  }

  updateTel(id: number, tel: string) {
    return this.http.get<any>(`http://localhost:8085/rest/users/updateTel/${id}/${tel}`);
  }

  updateOrganization(id: number, org: string) {
    return this.http.get<any>(`http://localhost:8085/rest/users/updateOrganization/${id}/${org}`);
  }

  updateOccupation(id: number, occup: string) {
    return this.http.get<any>(`http://localhost:8085/rest/users/updateOccupation/${id}/${occup}`);
  }

  updateName(id: number, name: string, lastName: string) {
    return this.http.get<any>(`http://localhost:8085/rest/users/updateName/${id}/${name}/${lastName}`);
  }
}
