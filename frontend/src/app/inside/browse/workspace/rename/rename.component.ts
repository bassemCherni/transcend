import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-rename',
  templateUrl: './rename.component.html',
  styleUrls: ['./rename.component.css']
})
export class RenameComponent implements OnInit {

  newName: string;
  ws_name: string;


  constructor(private dialogRef: MatDialogRef<RenameComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.ws_name = data.ws_name;
   }

  ngOnInit() {
  }

  rename() {
    this.dialogRef.close(this.newName);
  }

  close() {
    this.dialogRef.close();
  }
}
