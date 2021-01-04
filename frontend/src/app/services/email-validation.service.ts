import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailValidationService {

  constructor(private http: HttpClient) { }

  login(username: string) {
    return this.http.get<any[]>('http://localhost:8085/rest/account/byEmail/' + username);
  }
}
