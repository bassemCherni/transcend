import { EpicComponent } from './epic/epic.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { IssueService } from './../../../services/issue.service';
import { AffiliationService } from './../../../services/affiliation.service';
import { Affiliation } from './../../../models/affiliation';
import { NotifierService } from './../../../services/notifier.service';
import { EpicServiceService } from './../../../services/epic-service.service';
import { ProjectIdService } from './../../../services/project-id.service';
import { Epic } from './../../../models/epic';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-road-map',
  templateUrl: './road-map.component.html',
  styleUrls: ['./road-map.component.css']
})
export class RoadMapComponent implements OnInit {

  idAccount: number;
  idProject: number;
  affiliation: Affiliation = new Affiliation();
  epics: Epic[] = [];

  constructor(private projectIdService: ProjectIdService,
              private epicServiceService: EpicServiceService,
              private affiliationService: AffiliationService,
              private issueService: IssueService,
              private dialog: MatDialog,
              private notifierService: NotifierService
              ) { }

  ngOnInit() {
    this.idAccount = Number(sessionStorage.getItem('currentUser'));
    this.projectIdService.currentId.subscribe(
      id => {
        this.idProject = id;
        this.affiliationService.findByAccountAndProject(this.idAccount, this.idProject).subscribe(
          res => {
            this.affiliation = res;
          },
          err => {alert('an error has occured!!'); }
        );
        this.getEpics();
      }
    );
  }

  createEpic(idEpic: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {epic: idEpic, project: this.idProject};
    dialogConfig.width = '20%';
    const ref = this.dialog.open(EpicComponent, dialogConfig);
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.getEpics();
      }
    });
  }

  getEpics() {
    this.epicServiceService.findByProject(this.idProject).subscribe(
      res => {
        this.epics = res;
        this.epics.forEach(epc => {
          this.issueService.findByEpic(epc.id_epic).subscribe(
            resu => {
              epc.issues = resu;
            },
            error => {
              alert('an error has occured!!');
            }
          );
        });
      },
      err => {alert('an error has occured!!'); }
    );
  }

}
