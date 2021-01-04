import { UserService } from './../../services/user.service';
import { Users } from './../../models/users';
import { AccountService } from './../../services/account.service';
import { Account } from 'src/app/models/account';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  account: Account = {
    id_account: null,
    id_user: null,
    email: '',
    password: '',
    status: 'active',
    admin: false
  };

  user: Users = {
    id_user: null,
    user_name: '',
    last_name: '',
    tel_num: '',
    profile_pic: '',
    pic_extension: '',
    occupation: '',
    organization: ''
  };

  hash: string;

  constructor(private router: Router, private accountService: AccountService, private userService: UserService) { }

  ngOnInit() {
    this.checkUser();
  }

  checkUser() {
    if (sessionStorage.getItem('currentUser')) {
      this.router.navigate(['platform/browse/workspace']);
    }
  }

  createAccount() {

    // creating a user
    this.userService.createUser(this.user).subscribe(
      res => {
        this.user = res;
        this.account.id_user = this.user;

        // hashing password
        const salt = bcrypt.genSaltSync(10);
        this.hash = bcrypt.hashSync(this.account.password, salt);
        this.account.password = this.hash;


        // sending the account to api
        this.accountService.createAccount(this.account).subscribe(
          suc => {
            sessionStorage.setItem('currentUser', suc.id_account.toString());
            this.checkUser();
          },
          error => {
            alert('error has occured, please try again');
          }
        );
      },
      error => {
        alert('error has occured');
      }
    );


  }

}
