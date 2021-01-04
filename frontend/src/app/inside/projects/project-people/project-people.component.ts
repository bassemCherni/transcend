import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-people',
  templateUrl: './project-people.component.html',
  styleUrls: ['./project-people.component.css']
})
export class ProjectPeopleComponent implements OnInit {

  @Input() idProject: number;
  constructor() { }

  ngOnInit() {
  }

}
