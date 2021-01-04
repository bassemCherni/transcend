import { NotifierService } from './../../../services/notifier.service';
import { ProfilePicUpdate } from './../../../models/ProfilePicUpdate';
import { UserService } from './../../../services/user.service';
import { Account } from 'src/app/models/account';
import { AccountService } from './../../../services/account.service';
import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import * as bcrypt from 'bcryptjs';
import { FormGroup, NgForm } from '@angular/forms';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('occup', {read: ElementRef, static: false}) occup1: ElementRef;
  @ViewChild('occupChange', {read: ElementRef, static: false}) occupChange1: ElementRef;
  @ViewChild('organisation', {read: ElementRef, static: false}) organisation1: ElementRef;
  @ViewChild('organisationChange', {read: ElementRef, static: false}) organisationChange1: ElementRef;
  @ViewChild('phone', {read: ElementRef, static: false}) phone1: ElementRef;
  @ViewChild('phoneChange', {read: ElementRef, static: false}) phoneChange1: ElementRef;
  @ViewChild('select', {read: ElementRef, static: false}) selectImg1: ElementRef;
  @ViewChild('saveImg', {read: ElementRef, static: false}) saveImg1: ElementRef;
  @ViewChild('uploadBTN', {read: ElementRef, static: false}) uploadBTN1: ElementRef;
  @ViewChild('userName', {read: ElementRef, static: false}) userName1: ElementRef;
  @ViewChild('userNameUpdate', {read: ElementRef, static: false}) userNameUpdate1: ElementRef;
  @ViewChild('reset', {read: ElementRef, static: false}) reset1: ElementRef;
  @ViewChild('resetPass', {read: ElementRef, static: false}) resetPass1: ElementRef;


  idUser: number;
  account: Account = new Account();
  img: File;
  extension: string;
  UserName: string;
  UserLastname: string;
  occupation: string;
  organization: string;
  tel: string;
  email: string;
  pass: string;
  currentPass: string;
  newPass: string;
  emailNotif: string;
  passNotif: string;
  pic: ProfilePicUpdate = new ProfilePicUpdate();

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  constructor(private accountService: AccountService,
              private storage: AngularFireStorage,
              private db: AngularFirestore,
              private detector: ChangeDetectorRef,
              private notifierService: NotifierService,
              private userService: UserService
              ) {}

  ngOnInit() {
    console.log(this.occup1);
    this.idUser = Number(sessionStorage.getItem('currentUser'));
    this.accountService.getAccountById(this.idUser).subscribe(
      res => {
        this.account = res;
        console.log(this.account);
      },
      err => {
        alert('an error has occured');
      }
    );
  }

  disable(toDisable: ElementRef, toInable: ElementRef) {
    console.log(this.occup1);
    console.log(toDisable);
    toDisable.nativeElement.setAttribute('hidden', '');
    toInable.nativeElement.removeAttribute('hidden');
  }

  selectImg(event) {
    this.img = event.target.files[0];
    console.log(this.img);
    this.disable(this.selectImg1, this.saveImg1);
  }

  cancelChange() {
    this.disable(this.saveImg1, this.selectImg1);
  }

  updateName() {
    this.userService.updateName(this.idUser, this.UserName, this.UserLastname).subscribe(
      res => {
        this.account.id_user.user_name = this.UserName;
        this.account.id_user.last_name = this.UserLastname;
        this.disable(this.userNameUpdate1, this.userName1);
      },
      err => {
        this.notifierService.failure('an error has occured..try again or reconnect!');
      }
    );
  }

  changeOccup() {
    this.userService.updateOccupation(this.idUser, this.occupation).subscribe(
      res => {
        this.account.id_user.occupation = this.occupation;
        this.disable(this.occupChange1, this.occup1);
      },
      err => {
        this.notifierService.failure('an error has occured..try again or reconnect!');
      }
    );
  }

  changeOrg() {
    this.userService.updateOrganization(this.idUser, this.organization).subscribe(
      res => {
        this.account.id_user.organization = this.organization;
        this.disable(this.organisationChange1, this.organisation1);
      },
      err => {
        this.notifierService.failure('an error has occured..try again or reconnect!');
      }
    );
  }

  changeTel() {
    this.userService.updateTel(this.idUser, this.tel).subscribe(
      res => {
        this.account.id_user.tel_num = this.tel;
        this.disable(this.phoneChange1, this.phone1);
      },
      err => {
        this.notifierService.failure('an error has occured..try again or reconnect!');
      }
    );
  }

  onUpload() {

    this.uploadBTN1.nativeElement.setAttribute('disabled', '');

    this.extension = this.img.name.split('.').pop();

    if (this.account.id_user.profile_pic !== null && this.account.id_user.profile_pic !== '') {
      if (this.account.id_user.pic_extension !== null
          && this.account.id_user.pic_extension !== ''
          && this.account.id_user.pic_extension !== this.extension) {
        // deleting the old image
        const oldImgPath = `pictures/${this.idUser}.${this.account.id_user.pic_extension}`;

        // Reference to old img storage bucket
        const oldRef = this.storage.ref(oldImgPath);
        oldRef.delete();
      }
    }

    // The storage path
    const path = `pictures/${this.idUser}.${this.extension}`;

     // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.img);

     // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize( async () =>  {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        console.log(this.downloadURL);

        this.pic.id = this.account.id_user.id_user;
        this.pic.picLink = this.downloadURL;
        this.pic.extension = this.extension;
        this.userService.updatePic(this.pic).subscribe(
          res => {
            console.log('change complete..');
            this.disable(this.saveImg1, this.selectImg1);
            window.location.reload();
          },
          err => {
            alert('backend error');
          }
        );
      }),
    );
  }

  changeEmail() {
    if (bcrypt.compareSync(this.pass, this.account.password)) {
      this.account.email = this.email;
      this.accountService.updateAccount(this.account).subscribe(
        res => {
          this.resetPass1.nativeElement.click();
          this.account = res;
          this.notifierService.success('your email has been updated successfully!');
        },
        err => {
          this.notifierService.failure('an error has occured..try again or reconnect!');
        }
      );
    } else {
      this.emailNotif = 'invalid password!!';
    }
  }

  changePassword() {

    if (bcrypt.compareSync(this.currentPass, this.account.password)) {

      // hashing password
      const salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(this.newPass, salt);
      this.account.password = hash;
      this.accountService.updateAccount(this.account).subscribe(
        res => {
          this.account = res;
          this.reset1.nativeElement.click();
          this.notifierService.success('your email has been updated successfully!');
        },
        err => {
          this.notifierService.failure('an error has occured..try again or reconnect!');
        }
      );
    } else {
      this.passNotif = 'invalid current password!!';
    }
  }
}
