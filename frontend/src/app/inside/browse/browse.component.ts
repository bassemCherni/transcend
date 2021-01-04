import { Account } from 'src/app/models/account';
import { AccountService } from './../../services/account.service';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  @ViewChild('avatar', {read: ElementRef, static: true}) avatar1: ElementRef;
  idUser: number;
  account: Account = new Account();

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private accountService: AccountService) {}

  ngOnInit() {
    this.idUser = Number(sessionStorage.getItem('currentUser'));
    this.accountService.getAccountById(this.idUser).subscribe(
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
  }

  signOut() {
    sessionStorage.clear();
    this.router.navigate(['home/sign-in']);
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

}
