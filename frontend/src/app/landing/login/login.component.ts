import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  account: Account;
  notification: string;

  constructor(private authenticate: AuthenticationService, private router: Router) { }

  ngOnInit() {
    if (sessionStorage.getItem('currentUser')) {
      this.router.navigate(['platform/browse/workspace']);
    }
  }

  check() {
    this.authenticate.login(this.email).subscribe(
      res => {
        if (res != null) {

          this.account = res;
          if (bcrypt.compareSync(this.password, this.account.password)) {
            sessionStorage.setItem('currentUser', this.account.id_account.toString());
            this.router.navigate(['platform/browse/workspace']);
          } else {
            this.notification = 'email or password invalid!!';
          }

        } else {
          this.notification = 'email or password invalid!!';
        }
      },
      err => {
        alert('error has occurred, please try again');
      }
    );
  }

}
