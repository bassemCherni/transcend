import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-worksapce-icon',
  templateUrl: './worksapce-icon.component.html',
  styleUrls: ['./worksapce-icon.component.css']
})
export class WorksapceIconComponent implements OnInit {

  wIcons: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  PIcons: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

  constructor(private dialogRef: MatDialogRef<WorksapceIconComponent>,  @Inject(MAT_DIALOG_DATA) public data ) { }

  ngOnInit() {
  }

  setIcon(icon: number) {
    this.dialogRef.close(icon);
  }

}
