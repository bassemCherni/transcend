import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectIdService {

  private messageSource = new BehaviorSubject<number>(1);
  currentId = this.messageSource.asObservable();

  constructor() { }

  changeId(id: number) {
    this.messageSource.next(id);
  }
}
