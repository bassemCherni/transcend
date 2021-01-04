import { FireBaseService } from './../../../../services/fire-base.service';
import { NotifierService } from './../../../../services/notifier.service';
import { ProjectService } from './../../../../services/project.service';
import { Sprint } from './../../../../models/sprint';
import { SprintService } from './../../../../services/sprint.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {

  idUser: number;
  today: Date = null;
  dueDate: Date = null;
  startingDate: Date = null;
  sprint: Sprint = {
    id_sprint: null,
    project: null,
    title: null,
    description: null,
    creation_date: null,
    starting_date: null,
    due_date: null,
    status: null,
    delaye: null,
    index: null,
    issues: []
  };

  constructor(private dialogRef: MatDialogRef<SprintComponent>,
              private sprintService: SprintService,
              private notifierService: NotifierService,
              private projectService: ProjectService,
              private fireBaseService: FireBaseService,
              @Inject(MAT_DIALOG_DATA) public data ) { }

  ngOnInit() {
    this.idUser = Number(sessionStorage.getItem('currentUser'));
    if (this.data.sprint !== null) {
      this.sprintService.getById(this.data.sprint).subscribe(
        res => {
          this.sprint = res;
          if (this.sprint.starting_date !== null) {
            this.startingDate = new Date(this.sprint.starting_date);
          }
          if (this.sprint.due_date !== null) {
            this.dueDate = new Date(this.sprint.due_date);
          }
        },
        err => {
          alert('an error has occured..please try again!!');
        }
      );
    }
    this.today = new Date();
  }

  close(creation: boolean) {
    this.dialogRef.close(creation);
  }

  createSprint() {

    // active and toActivate sprints
    if (this.data.status !== null) {
      const dueMonth = this.doubleDigit(this.dueDate.getMonth() + 1);
      const dueDay = this.doubleDigit(this.dueDate.getDate());

      this.sprint.due_date = this.dueDate.getFullYear() + '-' + dueMonth + '-' + dueDay + 'T00:00:00.000+0000';
      console.log('sprint: ', this.sprint);

      // toActivate sprint starting date and status
      if (this.data.status === 'toActivate') {
        const startMonth = this.doubleDigit(this.today.getMonth() + 1);
        const startDay = this.doubleDigit(this.today.getDate());

        this.sprint.starting_date = this.today.getFullYear() + '-' + startMonth + '-' + startDay + 'T00:00:00.000+0000';

        this.sprint.status = 'on going';
      }
    }

    this.projectService.getById(this.data.project).subscribe(
      res => {
        this.sprint.project = res;
        this.sprintService.createSprint(this.sprint, this.idUser).subscribe(
          spr => {
            this.sprint = spr;
            if (this.data.status === 'toActivate') {
              const records = [];
              const start = new Date();
              const startRec = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate() + '.' + '0';
              records.push(startRec);
              console.log('test');
              this.fireBaseService.createSprintRecord(this.sprint, records).then(
                () => console.log('done'),
                () => console.error('could not create')
              );
            }

            if (this.data.sprint === null) {
              this.close(true);
              this.notifierService.success('sprint created successfully!!');
            } else if (this.data.status === 'toActivate') {
              this.close(true);
              this.notifierService.success('sprint started successfully!!');
            } else {
              this.close(true);
              this.notifierService.success('sprint updated successfully!!');
            }
          },
          errSpr => {
            this.close(false);
            this.notifierService.failure('could not create sprint..please try again!!');
          }
        );
      },
      err => {
        this.close(false);
        this.notifierService.failure('could not create sprint..please try again!!');
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
