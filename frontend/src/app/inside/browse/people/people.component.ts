import { NotifierService } from './../../../services/notifier.service';
import { AccountService } from './../../../services/account.service';
import { Account } from './../../../models/account';
import { debounceTime, filter, distinctUntilChanged, tap, switchMap, finalize } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable, observable, Subscription } from 'rxjs';
import { Affiliation } from './../../../models/affiliation';
import { AffiliationService } from './../../../services/affiliation.service';
import { Component, OnInit } from '@angular/core';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  idAccount: number = null;
  isLoading = false;
  workspaceId: number = null;
  newMember: Account = new Account();
  role: string = null;
  checked: Observable<boolean>;
  aff: Observable<Affiliation> ;
  subscription: Subscription;
  members: Affiliation[];
  memberToAdd: Affiliation = new Affiliation();
  affiliations: Affiliation[] = [];
  accounts: Account[] = [];
  search: FormControl = new FormControl();
  constructor(private affiliationService: AffiliationService,
              private notifierService: NotifierService,
              private accountService: AccountService) { }

  ngOnInit() {
    this.idAccount = Number(sessionStorage.getItem('currentUser'));
    this.affiliationService.getByAdmin(this.idAccount).subscribe(
      res => {
        this.affiliations = res;
        this.workspaceId = this.affiliations[0].workSpace.id_work_space;
        this.affiliationService.workspaceMembers(this.affiliations[0].workSpace.id_work_space).subscribe(
          mem => {
            this.members = mem;
            console.log('members: ', this.members);
          },
          error => {
            alert('error in fetching members');
          }
        );
        this.aff = new Observable((observer) => {
          // observable execution
          observer.next(this.affiliations[0]);
          observer.complete();
        }) ;
        console.log('aff: ', this.affiliations);
      },
      err => {
        alert('error in fetching Affiliations');
      }
    );

    this.search.valueChanges.pipe(
      debounceTime(500),
      filter(value => value),
      distinctUntilChanged(),
      tap(() => {
        this.accounts = [];
        this.isLoading = true;
      }),
      switchMap(value => this.accountService.searchToAddToWs(this.workspaceId, value).pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      )
    ).subscribe(
        res => {
          this.accounts = res;
        },
        err => {
          console.log('error has occured while searching');
        }
      );
  }

  selectWs(affl: Affiliation) {
    this.affiliationService.workspaceMembers(affl.workSpace.id_work_space).subscribe(
      res => {
        this.members = res;
        console.log('members: ', this.members);
      },
      err => {
        alert('error in fetching members');
      }
    );
    this.aff = new Observable((observer) => {
      // observable execution
      observer.next(affl);
      observer.complete();
    }) ;
    this.workspaceId = affl.workSpace.id_work_space;
    this.search.reset();
    this.checked = new Observable((observer) => {
      // observable execution
      observer.next(false);
      observer.complete();
    });
  }

  selectMember(act: Account) {
    this.newMember = act;
    this.check();
  }

  check() {
    if (this.role !== null && this.newMember !== null) {
      this.checked = new Observable((observer) => {
        // observable execution
        observer.next(true);
        observer.complete();
      }) ;
    } else {
      this.checked = new Observable((observer) => {
        // observable execution
        observer.next(false);
        observer.complete();
      }) ;
    }
  }

  addMember() {
    this.subscription = this.aff.subscribe(
      res => {
        this.memberToAdd.id = null;
        this.memberToAdd.account = this.newMember;
        this.memberToAdd.workSpace =  res.workSpace;
        this.memberToAdd.active = true;
        this.memberToAdd.role = this.role;
        this.affiliationService.addAffiliations(this.memberToAdd).subscribe(
          result => {
            this.members.push(result);
            this.notifierService.success('new memeber has been added successfully!');
          },
          error => {
            this.notifierService.failure('failed to add new member!!');
          }
        );
      }
    );
    this.subscription.unsubscribe();
  }

}
