import { AccountService } from './../../services/account.service';
import { Account } from 'src/app/models/account';
import { ProjectIdService } from './../../services/project-id.service';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { ProjectService } from './../../services/project.service';
import { MembershipResponse } from './../../models/MembershipResponse';
import { Affiliation } from './../../models/affiliation';
import { AffiliationService } from './../../services/affiliation.service';
import { MemberShipService } from './../../services/member-ship.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  @ViewChild('avatar', {read: ElementRef, static: true}) avatar1: ElementRef;
  account: Account = new Account();
  affiliated = true;
  id_user: number;
  id_project: number;
  affiliation: Affiliation;
  membershipResponses: MembershipResponse[];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private actiRoute: ActivatedRoute,
              private accountService: AccountService,
              private projectService: ProjectService,
              private affiliationService: AffiliationService,
              private projectIdService: ProjectIdService,
              private memberShipService: MemberShipService) {}

  ngOnInit() {
    this.id_user = parseInt(sessionStorage.getItem('currentUser'));

    console.log(this.avatar1);
    this.actiRoute.paramMap.subscribe((params: ParamMap) => {
      this.id_project = parseInt(params.get('id'));
      this.projectIdService.changeId(this.id_project);
    });

    this.accountService.getAccountById(this.id_user).subscribe(
      res => {
        this.account = res;
        let img;
        if (this.account.id_user.profile_pic !== null && this.account.id_user.profile_pic !== '') {
          img = "background-image: url('" + this.account.id_user.profile_pic + "');"
        } else {
          img = "background-image: url('../../assets/images/default-avatar.png');"
        }
        this.avatar1.nativeElement.setAttribute('style', img);
        console.log(this.account);
      },
      err => {
        alert('an error has occured');
      }
    );

    this.memberShipService.membership(this.id_user, this.id_project).subscribe(
      res => {
        if (res == null) {
          this.affiliated = false;
        } else {
          this.affiliationService.findByAccountAndProject(this.id_user, this.id_project).subscribe(
            suc => {
              this.affiliation = suc;
              this.getMemberships();
            }
          );
        }
      },
      err => {
        alert('an error has occured please try again!!');
      }
    );
  }

  handsetToggle(nav: MatSidenav, handset: Observable<boolean>) {
    handset.subscribe(
      res => {
        if (res) {
          nav.toggle();
        }
      }
    );
  }

  signOut() {
    sessionStorage.clear();
    this.router.navigate(['home/sign-in']);
  }

  getMemberships() {
    this.memberShipService.getMemberships(this.id_user, this.affiliation.workSpace.id_work_space).subscribe(
      result => {
        this.membershipResponses = result;
      }
    );
  }
}
