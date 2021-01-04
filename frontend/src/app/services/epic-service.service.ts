import { Epic } from './../models/epic';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EpicServiceService {

  constructor(private http: HttpClient) { }

  findByProject(id: number) {
    return this.http.get<Epic[]>('http://localhost:8085/rest/Epic/getByProject/' + id);
  }

  getById(id: number) {
    return this.http.get<Epic>('http://localhost:8085/rest/Epic/getOne/' + id);
  }

  createEpic(epic: Epic) {
    return this.http.post<Epic>('http://localhost:8085/rest/Epic/save' , epic);
  }

}
