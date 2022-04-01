import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-new-coin-dialog',
  templateUrl: './new-coin-dialog.component.html',
  styleUrls: ['./new-coin-dialog.component.scss']
})
export class NewCoinDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NewCoinDialogComponent>,
  ) {}

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close();
  }
}
