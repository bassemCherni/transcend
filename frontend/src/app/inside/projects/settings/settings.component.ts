import { Sprint } from './../../../models/sprint';
import { IssueService } from './../../../services/issue.service';
import { ProjectIdService } from './../../../services/project-id.service';
import { SprintService } from './../../../services/sprint.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  idProject: number;
  sprints: Sprint[] = [];
  constructor(private sprintService: SprintService,
              private projectIdService: ProjectIdService,
              private issueService: IssueService) { }

  ngOnInit() {
    this.projectIdService.currentId.subscribe(
      res => {
        this.idProject = res;
        this.sprintService.allSprints(this.idProject).subscribe(
          sp => {
            this.sprints = sp;
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
          },
          err => {
            console.log('error in fetching sprints..');
          }
        );
      }
    );
  }


}
