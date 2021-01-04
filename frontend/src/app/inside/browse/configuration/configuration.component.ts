import { NewProjectComponent } from './new-project/new-project.component';
import { DelOrQuitComponent } from './../workspace/del-or-quit/del-or-quit.component';
import { RenameComponent } from './../workspace/rename/rename.component';
import { NotifierService } from './../../../services/notifier.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProjectService } from './../../../services/project.service';
import { MemberShipService } from './../../../services/member-ship.service';
import { MembershipResponse } from './../../../models/MembershipResponse';
import { AffiliationService } from './../../../services/affiliation.service';
import { Affiliation } from './../../../models/affiliation';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  id_user: number;
  id_ws : number;
  affiliation: Affiliation;
  affiliated = true;
  search: string;
  manager: boolean;
  membershipResponses: MembershipResponse[];

  constructor(private actiRoute: ActivatedRoute,
              private router: Router,
              private affiliationService: AffiliationService,
              private memberShipService: MemberShipService,
              private projectService: ProjectService,
              private dialog: MatDialog,
              private notifier: NotifierService) { }

  ngOnInit() {
    this.id_user = parseInt(sessionStorage.getItem('currentUser'));
    this.id_ws = parseInt(this.actiRoute.snapshot.paramMap.get('id'));

    this.affiliationService.affiliationByWs(this.id_user, this.id_ws).subscribe(
      res => {
        if (res !== null) {
          this.affiliation = res;
          if (this.affiliation.role === 'p.o') {
            this.manager = true;
          } else {
            this.manager = false;
          }
          this.getMemberships();
        } else {
          this.affiliated = false;
        }
      },
      err => {
        alert('an error has occured please try again!!');
      }
    );
  }

  navigateTo(id: number) {
    this.router.navigate(['platform/projects', id]);
  }

  newProject() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.data = {role: this.affiliation.role, ws: this.affiliation.workSpace.id_work_space, aff: this.affiliation.id};
    const ref = this.dialog.open(NewProjectComponent, dialogConfig);
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.getMemberships();
      }
    });
  }

  renameProject(membershipResponse: MembershipResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '20%';
    dialogConfig.data = { ws_name: membershipResponse.project.title };
    const ref = this.dialog.open(RenameComponent, dialogConfig);
    ref.afterClosed().subscribe(
      newName => {
        if (newName != null) {
          const index = this.membershipResponses.indexOf(membershipResponse);
          membershipResponse.project.title = newName;
          this.projectService.rename(membershipResponse.project.id_project, newName).subscribe(
            res => {
              this.membershipResponses[index] = membershipResponse;
              this.notifier.success('the project has been renamed successfully!!');
            },
            error => {
              this.notifier.failure('an error has occured..please try again!!');
            }
          );
        }
      });
  }

  archiveProject(membershipResponse: MembershipResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.data = {alert: 'are you sure you want to delete this project!!', button: 'delete'};
    const ref = this.dialog.open(DelOrQuitComponent, dialogConfig);
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.archiveProject(membershipResponse.account, membershipResponse.project.id_project).subscribe(
          res => {
            this.getMemberships();
            this.notifier.success('the project has been deleted successfully!!');
          },
          error => {
            this.notifier.failure('an error has occured..please try again!!');
          }
        );
      }
    });
  }

  favorit(membershipResponse: MembershipResponse) {
    this.memberShipService.favorit(membershipResponse.id).subscribe(
      res => {
        const ms = this.membershipResponses.indexOf(membershipResponse);
        this.membershipResponses[ms] = res;
      },
      err => {
        alert('an error has occured please try again!!');
      }
    );
  }

  role(affiliation: Affiliation) {
    if (affiliation.role === 's.m' || affiliation.role === 'p.o') {
      this.manager = true;
    } else {
      this.manager = false;
    }
  }

  getMemberships() {
    this.memberShipService.getMemberships(this.id_user, this.affiliation.workSpace.id_work_space).subscribe(
      result => {
        this.membershipResponses = result;
      }
    );
  }

}
