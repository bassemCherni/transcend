import { NotifierService } from './../../../../services/notifier.service';
import { ProjectService } from './../../../../services/project.service';
import { Project } from './../../../../models/project';
import { AffiliationService } from './../../../../services/affiliation.service';
import { Affiliation } from './../../../../models/affiliation';
import { WorksapceIconComponent } from './../../workspace/new-workspace/worksapce-icon/worksapce-icon.component';
import { MemberShipService } from './../../../../services/member-ship.service';
import { MatDialogRef, MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  currentUser: number;
  icon = '1';
  startingDate: Date;
  dueDate: Date;
  projectTitle: string;
  description: string;
  scrumMaster: number;
  affMaster: Affiliation[];
  project: Project = {
    id_project: null,
    workSpace: null,
    title: null,
    descreption: null,
    creation_date: null,
    starting_date: null,
    due_date: null,
    status: null,
    archived: null,
    logo: null,
  };


  constructor(private dialogRef: MatDialogRef<NewProjectComponent>,
              private memberShipService: MemberShipService,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data,
              private affiliationService: AffiliationService,
              private projectService: ProjectService,
              private notifier: NotifierService
              ) { }

  ngOnInit() {
    this.currentUser = Number(sessionStorage.getItem('currentUser'));

    this.affiliationService.affByWsAndRole(this.data.ws, 's.m').subscribe(
      res => {
        this.affMaster = res;
      },
      err => {
        alert('an error has occured.. please try again!!');
      }
    );
  }

  close(creation: boolean) {
    this.dialogRef.close(creation);
  }

  setIcon() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.height = '80%';
    dialogConfig.data = { origins: 'project' };
    const ref = this.dialog.open(WorksapceIconComponent, dialogConfig);
    ref.afterClosed().subscribe(
      data => this.icon = data.toString()
    );

  }

  createProject() {

    const startMonth = this.doubleDigit(this.startingDate.getMonth() + 1);
    const startDay = this.doubleDigit(this.startingDate.getDate());
    const dueMonth = this.doubleDigit(this.dueDate.getMonth() + 1);
    const dueDay = this.doubleDigit(this.dueDate.getDate());

    this.affiliationService.affiliationById(this.data.aff).subscribe(
      res => {
        if (res !== null) {
          this.project.workSpace = res.workSpace;

          this.project.title = this.projectTitle;
          this.project.descreption = this.description;
          this.project.starting_date = this.startingDate.getFullYear()
                                                                      + '-'
                                                                      + startMonth
                                                                      + '-'
                                                                      + startDay
                                                                      + 'T00:00:00.000+0000';
          this.project.due_date = this.dueDate.getFullYear()
                                                            + '-'
                                                            + dueMonth
                                                            + '-'
                                                            + dueDay
                                                            + 'T00:00:00.000+0000';
          this.project.status = 'pending';
          this.project.archived = false;
          this.project.logo = this.icon;

          this.projectService.createProject(this.currentUser, this.scrumMaster, this.project).subscribe(
            result => {
              if (result !== null) {
                console.log('success');
                this.notifier.success('new project has been added successfully!!');
              }
            },
            error => {
              this.notifier.failure('an error has occured, please try again!!');
              alert('error has occured, please try again');
            }
          );
          this.close(true);
        }
      },
      err => {
        this.notifier.failure('an error has occured, please try again!!');
        this.close(false);
      }
    );
  }

  doubleDigit(n: number) {
    if (n < 10) {
      return '0' + n;
    }
    return n;
  }

}
