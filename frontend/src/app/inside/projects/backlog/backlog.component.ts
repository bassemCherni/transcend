import { EpicServiceService } from './../../../services/epic-service.service';
import { Epic } from './../../../models/epic';
import { FireBaseService } from './../../../services/fire-base.service';
import { SprintComponent } from './sprint/sprint.component';
import { NotifierService } from './../../../services/notifier.service';
import { DelOrQuitComponent } from './../../browse/workspace/del-or-quit/del-or-quit.component';
import { IssueComponent } from './issue/issue.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Affiliation } from './../../../models/affiliation';
import { AffiliationService } from './../../../services/affiliation.service';
import { Issue } from './../../../models/issue';
import { IssueService } from './../../../services/issue.service';
import { ProjectIdService } from './../../../services/project-id.service';
import { Router } from '@angular/router';
import { SprintService } from './../../../services/sprint.service';
import { Sprint } from './../../../models/sprint';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AssigneeComponent } from './assignee/assignee.component';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {

  idProject: number;
  idAccount: number;
  affiliation: Affiliation = null;
  id: number;
  sprintIndex: number;
  projectIssues: Issue[] = [];
  sprints: Sprint[];
  epics: Epic[];
  empty: boolean;
  activeSprint: Sprint = null;
  constructor(private sprintService: SprintService,
              private dialog: MatDialog,
              private issueService: IssueService,
              private epicServiceService: EpicServiceService,
              private affiliationService: AffiliationService,
              private notifier: NotifierService,
              private projectIdService: ProjectIdService,
               ) { }

  ngOnInit() {
    this.idAccount = Number(sessionStorage.getItem('currentUser'));
    this.projectIdService.currentId.subscribe(
      id => {
        this.idProject = id;
        this.affiliationService.findByAccountAndProject(this.idAccount, this.idProject).subscribe(
          res => {
            this.affiliation = res;
            console.log(this.affiliation);
          },
          err => {alert('an error has occured!!'); }
        );
        this.getSprints();
        this.getActiveSprint();
        this.getBackLog();
        this.getEpics();
      }
    );
  }

  drop(event: CdkDragDrop<Issue[]>) {
    if (event.previousContainer === event.container) {
      // in sprints
      if (event.container.data[0].sprint !== null) {
        this.sprintIndex = this.getSprintIndex(event.container.data[0].sprint.id_sprint);
        let newIndex: number;
        // moving down
        if (event.previousIndex < event.currentIndex) {
          for (let index = (event.previousIndex + 1); index < (event.currentIndex + 1); index++) {
            this.id = event.container.data[index].id_issue;
            newIndex = event.container.data[index].indexer - 1;
            let holder = this.id;
            let indexHolder = newIndex;
            console.log(this.id);
            console.log(newIndex);
            this.issueService.updateIndex(this.id, newIndex).subscribe(
              res => {
                this.sprints[this.sprintIndex].issues.forEach(issu => {
                  if (issu.id_issue === holder) {
                    issu.indexer = indexHolder;
                    console.log(issu);
                  }
                });
              },
              err => {
                alert('an error has occured!!');
              }
            );
          }
          this.id = event.container.data[event.previousIndex].id_issue;
          newIndex = event.currentIndex + 1;
          this.issueService.updateIndex(this.id, newIndex).subscribe(
            res => {
              this.sprints[this.sprintIndex].issues.forEach(issu => {
                if (issu.id_issue === this.id) {
                  issu.indexer = event.currentIndex + 1;
                  console.log(issu);
                }
              });
            },
            err => {
              alert('an error has occured!!');
            }
          );
          console.log(event);
        } else { // moving up
          for (let index = event.currentIndex; index < event.previousIndex ; index++) {
            this.id = event.container.data[index].id_issue;
            newIndex = event.container.data[index].indexer + 1;
            let holder = this.id;
            let indexHolder = newIndex;
            this.issueService.updateIndex(this.id, newIndex).subscribe(
              res => {
                this.sprints[this.sprintIndex].issues.forEach(issu => {
                  if (issu.id_issue === holder) {
                    issu.indexer = indexHolder;
                    console.log(issu);
                  }
                });
              },
              err => {
                alert('an error has occured!!');
              }
            );
          }
          this.id = event.container.data[event.previousIndex].id_issue;
          newIndex = event.currentIndex + 1;
          this.issueService.updateIndex(this.id, newIndex).subscribe(
            res => {
              this.sprints[this.sprintIndex].issues.forEach(issu => {
                if (issu.id_issue === this.id) {
                  issu.indexer = event.currentIndex + 1;
                  console.log(issu);
                }
              });
            },
            err => {
              alert('an error has occured!!');
            }
          );
          console.log(event);
        }
    } else { // in backlog
      let newIndex: number;
      // moving down
      if (event.previousIndex < event.currentIndex) {
        for (let index = (event.previousIndex + 1); index < (event.currentIndex + 1); index++) {
          this.id = event.container.data[index].id_issue;
          newIndex = event.container.data[index].indexer - 1;
          let holder = this.id;
          let indexHolder = newIndex;
          console.log(this.id);
          console.log(newIndex);
          this.issueService.updateIndex(this.id, newIndex).subscribe(
            res => {
              this.projectIssues.forEach(issu => {
                if (issu.id_issue === holder) {
                  issu.indexer = indexHolder;
                  console.log(issu);
                }
              });
            },
            err => {
              alert('an error has occured!!');
            }
          );
        }
        this.id = event.container.data[event.previousIndex].id_issue;
        newIndex = event.currentIndex + 1;
        this.issueService.updateIndex(this.id, newIndex).subscribe(
          res => {
            this.projectIssues.forEach(issu => {
              if (issu.id_issue === this.id) {
                issu.indexer = event.currentIndex + 1;
                console.log(issu);
              }
            });
          },
          err => {
            alert('an error has occured!!');
          }
        );
        console.log(event);
      } else { // moving up
        for (let index = event.currentIndex; index < event.previousIndex ; index++) {
          this.id = event.container.data[index].id_issue;
          newIndex = event.container.data[index].indexer + 1;
          let holder = this.id;
          let indexHolder = newIndex;
          this.issueService.updateIndex(this.id, newIndex).subscribe(
            res => {
              this.projectIssues.forEach(issu => {
                if (issu.id_issue === holder) {
                  issu.indexer = indexHolder;
                  console.log(issu);
                }
              });
            },
            err => {
              alert('an error has occured!!');
            }
          );
        }
        this.id = event.container.data[event.previousIndex].id_issue;
        newIndex = event.currentIndex + 1;
        this.issueService.updateIndex(this.id, newIndex).subscribe(
          res => {
            this.projectIssues.forEach(issu => {
              if (issu.id_issue === this.id) {
                issu.indexer = event.currentIndex + 1;
                console.log(issu);
              }
            });
          },
          err => {
            alert('an error has occured!!');
          }
        );
        console.log(event);
      }
    }
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // from sprint to =>
      if (event.previousContainer.id !== 'backlog') {
        // to sprint
        if (event.container.id !== 'backlog') {
          let idSprint = parseInt(event.previousContainer.id.slice(1));
          this.sprintIndex = this.getSprintIndex(idSprint);
          let newIndex: number;
          // :previous sprint
          // updating the elements
          for (let index = (event.previousIndex + 1); index < event.previousContainer.data.length; index++) {
            this.id = event.previousContainer.data[index].id_issue;
            newIndex = event.previousContainer.data[index].indexer - 1;
            let holder = this.id;
            let indexHolder = newIndex;
            this.issueService.updateIndex(this.id, newIndex).subscribe(
              res => {
                this.sprints[this.sprintIndex].issues.forEach(issu => {
                  if (issu.id_issue === holder) {
                    issu.indexer = indexHolder;
                    console.log(issu);
                  }
                });
              },
              err => {
                alert('an error has occured!!');
              }
            );
          }
          // :new sprint
          // updating the moved element
          idSprint = parseInt(event.container.id.slice(1));
          const newSprintIndex = this.getSprintIndex(idSprint);
          this.id = event.previousContainer.data[event.previousIndex].id_issue;
          newIndex = event.currentIndex + 1;
          const holder = this.id;
          const indexHolder = newIndex;
          this.issueService.updateIndex(this.id, newIndex).subscribe(
            res => {
              this.sprints[newSprintIndex].issues.forEach(issu => {
                if (issu.id_issue === holder) {
                  issu.indexer = indexHolder;
                  this.issueService.setSprint(holder, idSprint).subscribe(
                    result => {
                      this.sprints[newSprintIndex].issues.forEach(element => {
                        if (element.id_issue === holder) {
                          element.sprint = this.sprints[newSprintIndex];
                          console.log('elem: ', element);
                        }
                      });
                    },
                    error => {
                      alert('an error has occured!!');
                    }
                  );
                }
              });
            },
            err => {
              alert('an error has occured!!');
            }
          );

          // updating the other elements in the new sprint
          if (event.container.data.length > 0) {
            for (let index = (event.currentIndex ); index < event.container.data.length; index++) {
              this.id = event.container.data[index].id_issue;
              newIndex = event.container.data[index].indexer + 1;
              const holder1 = this.id;
              const indexHolder1 = newIndex;
              this.issueService.updateIndex(this.id, newIndex).subscribe(
                res => {
                  this.sprints[newSprintIndex].issues.forEach(issu => {
                    if (issu.id_issue === holder1) {
                      issu.indexer = indexHolder1;
                      console.log(issu);
                    }
                  });
                },
                err => {
                  alert('an error has occured!!');
                }
              );
            }
          }
        } else { // to backlog
          // :previous sprint
          // updating the elements
          let idSprint = parseInt(event.previousContainer.id.slice(1));
          this.sprintIndex = this.getSprintIndex(idSprint);
          for (let index = (event.previousIndex + 1); index < event.previousContainer.data.length; index++) {
            this.id = event.previousContainer.data[index].id_issue;
            let newIndex = event.previousContainer.data[index].indexer - 1;
            let holder = this.id;
            let indexHolder = newIndex;
            this.issueService.updateIndex(this.id, newIndex).subscribe(
              res => {
                this.sprints[this.sprintIndex].issues.forEach(issu => {
                  if (issu.id_issue === holder) {
                    issu.indexer = indexHolder;
                    console.log(issu);
                  }
                });
              },
              err => {
                alert('an error has occured!!');
              }
            );
          }
          // :to backlog
          // updating the moved element
          this.id = event.previousContainer.data[event.previousIndex].id_issue;
          let newIndex = event.currentIndex + 1;
          const holder = this.id;
          const indexHolder = newIndex;
          this.issueService.updateIndex(this.id, newIndex).subscribe(
            res => {
              this.projectIssues.forEach(issu => {
                if (issu.id_issue === holder) {
                  issu.indexer = indexHolder;
                  this.issueService.setSprint(holder, null).subscribe(
                    result => {
                      this.projectIssues.forEach(element => {
                        if (element.id_issue === holder) {
                          element.sprint = null;
                        }
                      });
                    },
                    error => {
                      alert('an error has occured!!');
                    }
                  );
                }
              });
            },
            err => {
              alert('an error has occured!!');
            }
          );

          // updating the other elements in the backlog
          if (event.container.data.length > 0) {
            for (let index = (event.currentIndex ); index < event.container.data.length; index++) {
              this.id = event.container.data[index].id_issue;
              newIndex = event.container.data[index].indexer + 1;
              const holder1 = this.id;
              const indexHolder1 = newIndex;
              this.issueService.updateIndex(this.id, newIndex).subscribe(
                res => {
                  this.projectIssues.forEach(issu => {
                    if (issu.id_issue === holder1) {
                      issu.indexer = indexHolder1;
                      console.log(issu);
                    }
                  });
                },
                err => {
                  alert('an error has occured!!');
                }
              );
            }
          }

        }
      } else {
        let idSprint = parseInt(event.container.id.slice(1));
        this.sprintIndex = this.getSprintIndex(idSprint);
        let newIndex: number;

        // updating the other elements in the backlog
        if (event.previousContainer.data.length > 0) {
          for (let index = (event.previousIndex + 1); index < event.previousContainer.data.length; index++) {
            this.id = event.previousContainer.data[index].id_issue;
            newIndex = event.previousContainer.data[index].indexer - 1;
            const holder1 = this.id;
            const indexHolder1 = newIndex;
            this.issueService.updateIndex(this.id, newIndex).subscribe(
              res => {
                this.projectIssues.forEach(issu => {
                  if (issu.id_issue === holder1) {
                    issu.indexer = indexHolder1;
                    console.log(issu);
                  }
                });
              },
              err => {
                alert('an error has occured!!');
              }
            );
          }
        }

        // :new sprint
        // updating the moved element
        this.id = event.previousContainer.data[event.previousIndex].id_issue;
        newIndex = event.currentIndex + 1;
        const holder = this.id;
        const indexHolder = newIndex;
        this.issueService.updateIndex(this.id, newIndex).subscribe(
            res => {
              this.sprints[this.sprintIndex].issues.forEach(issu => {
                if (issu.id_issue === holder) {
                  issu.indexer = indexHolder;
                  this.issueService.setSprint(holder, idSprint).subscribe(
                    result => {
                      this.sprints[this.sprintIndex].issues.forEach(element => {
                        if (element.id_issue === holder) {
                          element.sprint = this.sprints[this.sprintIndex];
                          console.log('elem: ', element);
                        }
                      });
                    },
                    error => {
                      alert('an error has occured!!');
                    }
                  );
                }
              });
            },
            err => {
              alert('an error has occured!!');
            }
          );

        // :to sprint
        // updating the elements
        if (event.container.data.length > 0) {
          for (let index = (event.currentIndex ); index < event.container.data.length; index++) {
            this.id = event.container.data[index].id_issue;
            newIndex = event.container.data[index].indexer + 1;
            let holder = this.id;
            let indexHolder = newIndex;
            this.issueService.updateIndex(this.id, newIndex).subscribe(
              res => {
                this.sprints[this.sprintIndex].issues.forEach(issu => {
                  if (issu.id_issue === holder) {
                    issu.indexer = indexHolder;
                    console.log(issu);
                  }
                });
              },
              err => {
                alert('an error has occured!!');
              }
            );
          }
        }

      }
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  getSprints() {
    this.sprintService.findByIdProject(this.idProject).subscribe(
      res => {
        this.sprints = res;
        console.log(this.sprints);
        if (res.length < 1) {
          this.empty = true;
        } else {
          this.empty = false;
          this.sprints.forEach(sprint => {
            this.issueService.findBySprint(sprint.id_sprint).subscribe(
              resu => {
                sprint.issues = resu;
              },
              error => {
                alert('an error has occured!!');
              }
            );
          });
        }
      },
      err => {
        alert('an error has occured!!');
      }
    );
  }

  getEpics() {
    this.epicServiceService.findByProject(this.idProject).subscribe(
      res => {
        this.epics = res;
      },
      err => {alert('an error has occured!!'); }
    );
  }

  getActiveSprint() {
    this.sprintService.activeSprintByProject(this.idProject).subscribe(
      res => {
        this.activeSprint = res;
        if (res != null) {
          this.issueService.findBySprint(this.activeSprint.id_sprint).subscribe(
            resu => {
              this.activeSprint.issues = resu;
              console.log('activ: ', this.activeSprint);
            },
            error => {
              alert('an error has occured!!');
            }
          );
        }
      },
      err => {
        alert('an error has occured!!');
      }
    );
  }

  getBackLog() {
    this.issueService.backLog(this.idProject).subscribe(
      res => {
        this.projectIssues = res;
      },
      err => {
        alert('an error has occured!!');
      }
    );
  }

  getSprintIndex(idS: number): number {
    let spI: number;
    this.sprints.forEach(element => {
      if (element.id_sprint === idS) {
        spI = this.sprints.indexOf(element);
      }
    });
    return spI;
  }

  createOrUpdateIssue(idIssue: number, idProject: number, container: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {issue: idIssue, project: idProject};
    dialogConfig.width = '20%';
    const ref = this.dialog.open(IssueComponent, dialogConfig);
    ref.afterClosed().subscribe(result => {
      if (result) {
        if (container === 'backlog') {
          this.getBackLog();
        } else if (container === 'active') {
          this.getActiveSprint();
        } else {
          this.getSprints();
        }
      }
    });
  }

  deleteIssue(issue: Issue) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.data = {alert: 'are you sure you want to delete this issue!!', button: 'delete'};
    const ref = this.dialog.open(DelOrQuitComponent, dialogConfig);
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.issueService.deleteIssue(this.idAccount, issue).subscribe(
          res => {
            this.getBackLog();
            this.notifier.success('the issue has been deleted successfully!!');
          },
          err => {
            this.notifier.failure('an error has occured..please try again!!');
          }
        );
      }
    });
  }

  createOrUpdateSprint(idSprint: number, stat: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // status: active, toActivate, null
    dialogConfig.data = {sprint: idSprint, project: this.idProject, status: stat};
    dialogConfig.width = '20%';
    const ref = this.dialog.open(SprintComponent, dialogConfig);
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.getSprints();
        this.getActiveSprint();
      }
    });
  }

  startSprint() {
    if (this.sprints[0].issues.length > 0 ) {
      this.createOrUpdateSprint(this.sprints[0].id_sprint, 'toActivate');
    } else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '30%';
      dialogConfig.data = {alert: 'sprints that containes no issues can\'t be started!!', button: 'ok'};
      const ref = this.dialog.open(DelOrQuitComponent, dialogConfig);
    }
  }

  completeSprint() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.data = {alert: 'all un-done issues will be moved to backlog!!', button: 'ok'};
    const ref = this.dialog.open(DelOrQuitComponent, dialogConfig);
    ref.afterClosed().subscribe(
      result => {
        if (result) {
          if (this.activeSprint !== null) {
            this.sprintService.completeSprint(this.activeSprint, this.idAccount).subscribe(
              res => {
                this.activeSprint = null;
                this.notifier.success('sprint has been completed successfully!!');
                this.getBackLog();
              },
              err => {
                this.notifier.failure('an error has occured while modifing sprint!!');
              }
            );
          }
        }
      }
    );
  }

  deleteSprint(spr: Sprint) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.data = {alert: 'all related issues will be deleted with this sprint!!', button: 'ok'};
    const ref = this.dialog.open(DelOrQuitComponent, dialogConfig);
    ref.afterClosed().subscribe(
      result => {
        if (result) {
          this.sprintService.deleteSprint(spr, this.idAccount).subscribe(
            res => {
              this.getActiveSprint();
              this.getSprints();
              this.notifier.success('sprint deleted successfully!!');
            },
            err => {
              this.notifier.failure('error occured during sprint deletion!!');
            }
          );
        }
      }
    );
  }

  assigneIssue(issue1: Issue) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.data = {issue: issue1, project: this.idProject};
    const ref = this.dialog.open(AssigneeComponent, dialogConfig);
  }

  setEpic(issue: Issue, epc: Epic) {
    issue.epic = epc;
    this.issueService.simpleUpdate(issue).subscribe(
      res => {
        this.notifier.success('issue has been added to epic successfully!!');
      },
      err => {
        this.notifier.failure('error occured during epic selection!!');
      }
    );
  }
}
