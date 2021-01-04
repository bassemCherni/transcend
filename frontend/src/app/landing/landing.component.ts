import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if (sessionStorage.getItem('currentUser')) {
      this.router.navigate(['platform/browse/workspace']);
    }
  }

 }
