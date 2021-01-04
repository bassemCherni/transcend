import { EpicServiceService } from './../../../../services/epic-service.service';
import { Epic } from './../../../../models/epic';
import { ProjectService } from './../../../../services/project.service';
import { NotifierService } from './../../../../services/notifier.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-epic',
  templateUrl: './epic.component.html',
  styleUrls: ['./epic.component.css']
})
export class EpicComponent implements OnInit {


  epic: Epic = {
    id_epic: null,
    project: null,
    title: null,
    description: null,
    creation_date: null,
    status: null,
    issues:  []
  };
  idAccount: number;

  constructor(private dialogRef: MatDialogRef<EpicComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private epicServiceService: EpicServiceService,
              private projectService: ProjectService,
              private notifierService: NotifierService) { }

  ngOnInit() {
    this.idAccount = Number(sessionStorage.getItem('currentUser'));
    if (this.data.epic !== null) {
      this.epicServiceService.getById(this.data.epic).subscribe(
        res => {
          this.epic = res;
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

  createEpic() {

    this.projectService.getById(this.data.project).subscribe(
      res => {
        this.epic.project = res;
        this.epicServiceService.createEpic(this.epic).subscribe(
          result => {
            this.close(true);
            if (this.epic.id_epic !== null) {
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
