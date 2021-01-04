import { NotifierService } from './../../../../services/notifier.service';
import { ProjectService } from './../../../../services/project.service';
import { MemberShipService } from './../../../../services/member-ship.service';
import { Assagniee } from './../../../../models/assagniee';
import { Issue } from './../../../../models/issue';
import { IssueService } from './../../../../services/issue.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {

  issue: Issue = {
    id_issue: null,
    title: null,
    description: null,
    type: null,
    project: null,
    epic: null,
    sprint: null,
    story_point: null,
    creation_date: null,
    assignee: null,
    status: null,
    vued: null,
    indexer: null,
    last_modified: null,

  };
  idUser: number;
  type = 'userStory';
  constructor(private dialogRef: MatDialogRef<IssueComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private memberShipService: MemberShipService,
              private projectService: ProjectService,
              private notifierService: NotifierService,
              private issueService: IssueService) { }

  ngOnInit() {
    this.idUser = Number(sessionStorage.getItem('currentUser'));
    if (this.data.issue !== null) {
      this.issueService.getById(this.data.issue).subscribe(
        res => {
          this.issue = res;
          this.type = this.issue.type;
        },
        err => {
          alert('an error has occured!!');
        }
      );
    }
  }

  close(creation: boolean) {
    this.dialogRef.close(creation);
  }

  setType(issueType: string) {
    this.type = issueType;
  }

  createIssue() {

    this.projectService.getById(this.data.project).subscribe(
      res => {
        this.issue.project = res;
        this.issue.project.status = 'on going';
        this.issue.type = this.type;
        this.issueService.createIssue(this.idUser, this.issue).subscribe(
          result => {
            this.close(true);
            if (this.issue.id_issue !== null) {
              this.notifierService.success('issue has been updated successfuly!!');
            } else {
              this.notifierService.success('new issue has been added successfuly!!');
            }
          },
          error => {
            this.close(false);
            this.notifierService.failure('an error has occured..please try again!!');
          }
        );
      },
      err => {
        this.close(false);
        alert('an error has occured!!');
      }
    );
  }

}
