import { ProjectChatService } from './../../services/project-chat.service';
import { ProjectChat } from './../../models/projectChat';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  chat: ProjectChat = {
    id: null,
    id_project: null,
    id_sender: null,
    message: '',
    creation_date: null
  };

  year: number;
  date: Date;
  constructor(private router: Router, private chatser: ProjectChatService) { }

  ngOnInit() {
    if (sessionStorage.getItem('currentUser')) {
      this.router.navigate(['platform']);
    }

  }

  getchat() {
    this.chatser.getchat(1).subscribe(
      res => {
        this.chat = res;
        this.date = new Date(this.chat.creation_date);
        this.year = this.date.getUTCMonth();
        alert('succ');
      },
      err => {
        alert('error');
      }
    );
  }

}
