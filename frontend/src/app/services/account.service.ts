import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  createAccount(account: Account) {
    return this.http.post<Account>('http://localhost:8085/rest/account/register', account);
  }

  updateAccount(account: Account) {
    return this.http.post<Account>('http://localhost:8085/rest/account/register', account);
  }

 getAccountById(id: number) {
  return this.http.get<Account>('http://localhost:8085/rest/account/find/' + id);
 }

 searchToAddToWs(id: number, search: string) {
  return this.http.get<Account[]>('http://localhost:8085/rest/account/searchToAddToWs/' + id + '/' + search);
 }

 searchAccount(id: number, search: string) {
  return this.http.get<Account[]>('http://localhost:8085/rest/account/search/' + id + '/' + search);
 }
}
