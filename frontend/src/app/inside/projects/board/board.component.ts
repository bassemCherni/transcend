import { FireBaseService } from './../../../services/fire-base.service';
import { Issue } from './../../../models/issue';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Sprint } from './../../../models/sprint';
import { Affiliation } from './../../../models/affiliation';
import { ProjectIdService } from './../../../services/project-id.service';
import { NotifierService } from './../../../services/notifier.service';
import { AffiliationService } from './../../../services/affiliation.service';
import { IssueService } from './../../../services/issue.service';
import { SprintService } from './../../../services/sprint.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  dataReady = false;
  idProject: number;
  idAccount: number;
  affiliation: Affiliation = null;
  activeSprint: Sprint = null;
  toDo: Issue[] = [];
  records: string[] = [];
  inProgress: Issue[] = [];
  done: Issue[] = [];


  constructor(private sprintService: SprintService,
              private issueService: IssueService,
              private affiliationService: AffiliationService,
              private notifier: NotifierService,
              private fireBase: FireBaseService,
              private projectIdService: ProjectIdService) { }

  ngOnInit() {
    this.idAccount = Number(sessionStorage.getItem('currentUser'));
    this.projectIdService.currentId.subscribe(
      id => {
        this.idProject = id;
        this.affiliationService.findByAccountAndProject(this.idAccount, this.idProject).subscribe(
          res => {
            this.affiliation = res;
            this.getActiveSprint();
            console.log(this.affiliation);
          },
          err => {alert('an error has occured!!'); }
        );
      }
    );
  }

  getActiveSprint() {
    this.sprintService.activeSprintByProject(this.idProject).subscribe(
      res => {
        this.activeSprint = res;
        this.getIssueByStatus();
      },
      err => {
        alert('an error has occured!!');
      }
    );
  }

  drop(event: CdkDragDrop<Issue[]>) {
    if (event.previousContainer === event.container) {
      this.issueService.updateStatus(event.container.data[event.previousIndex]).subscribe(
        res => {
          console.log('to do');
        },
        err => {
          alert('error in status');
        }
      );
      moveItemInArray(event.container.data, event.previousIndex, 0);
    } else {
      console.log('id: ', event.container.id);
      console.log('item: ', event.previousContainer.data[event.previousIndex]);
      if (event.container.id === 'todo') {
        event.previousContainer.data[event.previousIndex].status = 'to do';
        this.issueService.updateStatus(event.previousContainer.data[event.previousIndex]).subscribe(
          res => {
            console.log('to do');
          },
          err => {
            alert('error in status');
          }
        );
      } else if (event.container.id === 'inProgress') {
        event.previousContainer.data[event.previousIndex].status = 'in progress';
        this.issueService.updateStatus(event.previousContainer.data[event.previousIndex]).subscribe(
          res => {
            console.log('prog');
          },
          err => {
            alert('error in status');
          }
        );
      } else {
        event.previousContainer.data[event.previousIndex].status = 'done';
        this.issueService.updateStatus(event.previousContainer.data[event.previousIndex]).subscribe(
          res => {
            console.log('done');
          },
          err => {
            alert('error in status');
          }
        );
      }

      if ((event.previousContainer.id !== 'done' && event.container.id === 'done')
      || (event.previousContainer.id === 'done' && event.container.id !== 'done')) {
        this.fireBase.updateSprintRrecords(this.activeSprint);
      }



      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        0);
    }
  }

  getIssueByStatus() {
    if (this.affiliation.role !== 'dev') {
      this.issueService.getBySprintAndStatus(this.activeSprint.id_sprint, 'to do').subscribe(
        res => {
          this.toDo = res;
          this.issueService.getBySprintAndStatus(this.activeSprint.id_sprint, 'in progress').subscribe(
            prog => {
              this.inProgress = prog;
              this.issueService.getBySprintAndStatus(this.activeSprint.id_sprint, 'done').subscribe(
                don => {
                  this.done = don;
                  this.dataReady = true;
                },
                err => {
                  alert('error in fetching issues');
                }
              );
            },
            err => {
              alert('error in fetching issues');
            }
          );
        },
        err => {
          alert('error in fetching issues');
        }
      );
    } else {
      this.issueService.getBySprintStatusAssignee(this.activeSprint.id_sprint, 'to do', this.idAccount).subscribe(
        res => {
          this.toDo = res;
          this.issueService.getBySprintStatusAssignee(this.activeSprint.id_sprint, 'in progress', this.idAccount).subscribe(
            prog => {
              this.inProgress = prog;
              this.issueService.getBySprintStatusAssignee(this.activeSprint.id_sprint, 'done', this.idAccount).subscribe(
                don => {
                  this.done = don;
                  this.dataReady = true;
                },
                err => {
                  alert('error in fetching issues');
                }
              );
            },
            err => {
              alert('error in fetching issues');
            }
          );
        },
        err => {
          alert('error in fetching issues');
        }
      );
    }

  }


}
