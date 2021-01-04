import { FireBaseService } from './../../services/fire-base.service';
import { ProjectService } from './../../services/project.service';
import { IssueService } from './../../services/issue.service';
import { Sprint } from './../../models/sprint';
import { SprintService } from './../../services/sprint.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-burndown-chart',
  templateUrl: './burndown-chart.component.html',
  styleUrls: ['./burndown-chart.component.css']
})
export class BurndownChartComponent implements OnInit {

  public lineCharData = [
                        {data: [],
                          label: 'remaning story-points',
                          fill: false,
                          borderColor: '#29d3e6'
                          }
                        ];
  public lineChartLabels = [];
  public lineChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };
  public lineColor = [
    {backgroundColor: '#29d3e6'}
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  @Input() idProject: number = null;
  activeSprint = new Sprint();
  constructor(private sprintService: SprintService,
              private projectService: ProjectService,
              private fireBaseService: FireBaseService,
              private issueService: IssueService) { }

  ngOnInit() {
    this.sprintService.activeSprintByProject(this.idProject).subscribe(
      res => {
        this.activeSprint = res;
        this.fireBaseService.updateSprintRrecords(this.activeSprint);
        this.fireBaseService.sprintRecordLiveChange(this.activeSprint).subscribe(
          rec => {
            let record = rec['record'];
            this.lineChartLabels = [];
            this.lineCharData[0].data = [];
            record.forEach(plot => {
              let holder: string[] = plot.split('.', 2);
              console.log('holder: ', holder[0]);
              let date : string[] = holder[0].split('-', 3);
              this.lineChartLabels.push(date[2] + '/' + date[1]);
              this.lineCharData[0].data.push(holder[1]);

            });
          },
          error => {
            alert('error in fetching sprint records');
          }
        );
      },
      err => {
        alert('error in fetching sprint');
      }
    );
  }

}
