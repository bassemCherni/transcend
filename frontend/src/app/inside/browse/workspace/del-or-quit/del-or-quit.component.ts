import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-del-or-quit',
  templateUrl: './del-or-quit.component.html',
  styleUrls: ['./del-or-quit.component.css']
})
export class DelOrQuitComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DelOrQuitComponent>, @Inject(MAT_DIALOG_DATA) public data ) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close(false);
  }



}
