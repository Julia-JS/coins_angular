import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CoinsService} from '../../services/coins.service';
import {ICoinResponse} from '../../interfaces/coin.interface';

@Component({
  selector: 'app-coin-delete-dialog',
  templateUrl: './coin-delete-dialog.component.html',
  styleUrls: ['./coin-delete-dialog.component.scss']
})
export class CoinDeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CoinDeleteDialogComponent>,
              private coinsService: CoinsService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  public coins: Array<ICoinResponse> = [];

  ngOnInit(): void {
    console.log(this.data.dataKey);
  }

  private fetchCoins(): void {
    this.coinsService.fetch()
      .subscribe(res => {
        this.coins = res;
      }, err => console.log(err));
  }

  private deleteCoin(): void {
    this.coinsService.delete(this.data.dataKey)
      .subscribe(res => {
        this.coinsService.fetch()
          .subscribe(coins => {
            this.coinsService.rerender(coins);
            return coins;
          }, err => console.log(err));
      }, err => console.log(err));

    this.dialogRef.close();
  }

  private closeCoinDeleteDialog(): void {
    this.dialogRef.close();
  }
}
