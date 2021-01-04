import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectChatService {

  constructor(private http: HttpClient) { }

  getchat(id: number) {
    return this.http.get<any>('http://localhost:8085/rest/ProjectChat/getOne/' + id);
  }

}
