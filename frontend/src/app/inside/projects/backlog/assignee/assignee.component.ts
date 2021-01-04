import { NotifierService } from './../../../../services/notifier.service';
import { IssueService } from './../../../../services/issue.service';
import { Issue } from './../../../../models/issue';
import { Account } from 'src/app/models/account';
import { AccountService } from './../../../../services/account.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { debounceTime, distinctUntilChanged, tap, switchMap, finalize, min, filter, delay } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-assignee',
  templateUrl: './assignee.component.html',
  styleUrls: ['./assignee.component.css']
})
export class AssigneeComponent implements OnInit {

  accounts: Account[] = [];
  assignee: Account = new Account();
  isLoading = false;
  idAccount: number;
  issue: Issue;
  search: FormControl = new FormControl();

  constructor(private dialogRef: MatDialogRef<AssigneeComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private issueService: IssueService,
              private notifierService: NotifierService,
              private accountService: AccountService ) {
                this.issue = this.data.issue;
               }

  ngOnInit() {
    this.idAccount = Number(sessionStorage.getItem('currentUser'));
    this.search.valueChanges.pipe(
              debounceTime(500),
              filter(value => value),
              distinctUntilChanged(),
              tap(() => {
                this.accounts = [];
                this.isLoading = true;
              }),
              switchMap(value => this.accountService.searchAccount(this.data.project, value).pipe(
                finalize(() => {
                  this.isLoading = false;
                }),
              )
              )
            )
            .subscribe(
              res => {
                this.accounts = res;
              },
              err => {
                console.log('error has occured while searching');
              }
            );
  }

  selectAssignee(act: Account) {
    this.assignee = act;
    this.issue.assignee = this.assignee;
    this.issueService.assigneDev(this.idAccount, this.issue).subscribe(
      res => {
        console.log('success');
        this.close(true);
        this.notifierService.success('assignee updated successfully!!');
      },
      err => {
        console.log('err');
        this.close(false);
        this.notifierService.failure('an error has occured during updated!!');
      }
    );
  }

  close(creation: boolean) {
    setTimeout(() => this.dialogRef.close(creation), 200);
  }

}
