import { NotifierService } from './../../../services/notifier.service';
import { WorkSpaceService } from './../../../services/work-space.service';
import { DelOrQuitComponent } from './del-or-quit/del-or-quit.component';
import { RenameComponent } from './rename/rename.component';
import { NewWorkspaceComponent } from './new-workspace/new-workspace.component';
import { AffiliationService } from './../../../services/affiliation.service';
import { Affiliation } from './../../../models/affiliation';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'],
})
export class WorkspaceComponent implements OnInit {

  roles: string[] = ['all', 'admin', 'member'];
  affiliations: Affiliation[];
  currentUser: number;
  search: string;
  selectedRole: string;

  constructor(private router: Router,
              private affiliationService: AffiliationService,
              private workSpaceService: WorkSpaceService,
              private dialog: MatDialog,
              private notifier: NotifierService
  ) { }

  ngOnInit() {
    this.currentUser = Number(sessionStorage.getItem('currentUser'));
    this.getAffiliations(this.currentUser);
  }


  createWorksapce() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '20%';
    const ref = this.dialog.open(NewWorkspaceComponent, dialogConfig);
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.getAffiliations(this.currentUser);
        this.notifier.success('new workspace has been added successfully!!');
      }
    });

  }

  quitWorksapce(affiliation: Affiliation) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.data = {alert: 'are you sure you want to quit this workspace!!', button: 'quit'};
    const ref = this.dialog.open(DelOrQuitComponent, dialogConfig);
    ref.afterClosed().subscribe(result => {
      if (result) {
        affiliation.active = false;
        this.affiliationService.quit(affiliation).subscribe(
          res => {
            this.getAffiliations(this.currentUser);
            this.notifier.success('you are no longer part of the workspace!!');
          },
          err => {
            this.notifier.failure('an error has occured..please try again!!');
          }
        );
      }
    });

  }

  archiveWorksapce(affiliation: Affiliation) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.data = {alert: 'are you sure you want to delete this workspace!!', button: 'delete'};
    const ref = this.dialog.open(DelOrQuitComponent, dialogConfig);
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.workSpaceService.archiveWorkSpaces(affiliation.workSpace.id_work_space, affiliation.account.id_account).subscribe(
          res => {
            if (res === 1) {
              this.getAffiliations(this.currentUser);
              this.notifier.success('the workspace has been archived successfully!!');
            } else {
              this.notifier.failure('an error has occured..please try again!!');
            }
          },
          error => {
            this.notifier.failure('an error has occured..please try again!!');
          }
        );
      }
    });

  }

  renameWorksapce(affiliation: Affiliation) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '20%';
    dialogConfig.data = { ws_name: affiliation.workSpace.name };
    const ref = this.dialog.open(RenameComponent, dialogConfig);
    ref.afterClosed().subscribe(
      newName => {
        if (newName != null) {
          const index = this.affiliations.indexOf(affiliation);
          affiliation.workSpace.name = newName;
          this.affiliationService.renameWs(affiliation).subscribe(
            res => {
              this.affiliations[index] = affiliation;
              this.notifier.success('the workspace has been renamed successfully!!');
            },
            error => {
              this.notifier.failure('an error has occured..please try again!!');
            }
          );
        }
      });

  }


  navigateTo(id: number) {
    this.router.navigate(['platform/browse/workspace', id]);
  }

  getAffiliations(id_user: number) {
    this.affiliationService.getAffiliations(id_user).subscribe(
      res => {
        this.affiliations = res;
      },
      error => {
        alert('error has occurred in affiliations');
      }
    );
  }
}
