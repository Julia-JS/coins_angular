import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-coin-image-dialog',
  templateUrl: './coin-image-dialog.component.html',
  styleUrls: ['./coin-image-dialog.component.scss']
})
export class CoinImageDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {}
}
