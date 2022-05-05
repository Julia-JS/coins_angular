import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CoinsService} from '../../services/coins.service';
import {ICoinResponse} from '../../interfaces/coin.interface';

@Component({
  selector: 'app-coin-delete-dialog',
  templateUrl: './coin-delete-dialog.component.html',
  styleUrls: ['./coin-delete-dialog.component.scss']
})
export class CoinDeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<CoinDeleteDialogComponent>,
              private coinsService: CoinsService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  public coins: Array<ICoinResponse> = [];

  private deleteCoin(): void {
    this.coinsService.delete(this.data.dataKey)
      .subscribe(() => {
        this.coinsService.rerender();
      }, err => console.log(err));

    this.dialogRef.close();
  }

  private closeCoinDeleteDialog(): void {
    this.dialogRef.close();
  }
}
