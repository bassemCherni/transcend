import { WorksapceIconComponent } from './worksapce-icon/worksapce-icon.component';
import { WorkSpaceService } from './../../../../services/work-space.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-workspace',
  templateUrl: './new-workspace.component.html',
  styleUrls: ['./new-workspace.component.css']
})
export class NewWorkspaceComponent implements OnInit {

  workspaceName: string;
  icon = '1';
  currentUser: number;

  constructor(private dialogRef: MatDialogRef<NewWorkspaceComponent>,
              private workSpaceService: WorkSpaceService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.currentUser = Number(sessionStorage.getItem('currentUser'));
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
    dialogConfig.data = {origins: 'workspace'};
    const ref = this.dialog.open(WorksapceIconComponent, dialogConfig);
    ref.afterClosed().subscribe(
      data => this.icon = data.toString()
    );

  }

  createWorksapce() {
    this.workSpaceService.createWorkSpaces(this.currentUser, this.workspaceName, this.icon).subscribe(
      res => {
        if (res !== null) {
          console.log('success');
        }
      },
      error => {
        alert('error has occured, please try again');
      }
    );
    this.close(true);
  }
}
