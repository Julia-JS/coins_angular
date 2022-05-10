import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICoinResponse } from '../../interfaces/coin.interface';
import { CoinsService } from '../../services/coins/coins.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-coin-delete-dialog',
    templateUrl: './coin-delete-dialog.component.html',
    styleUrls: ['./coin-delete-dialog.component.scss'],
})
export class CoinDeleteDialogComponent implements OnDestroy {
    public coins: Array<ICoinResponse> = [];
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        public dialogRef: MatDialogRef<CoinDeleteDialogComponent>,
        private coinsService: CoinsService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    private deleteCoin(): void {
        this.coinsService.deleteCoin(this.data.dataKey);

        this.dialogRef.close();
    }

    private closeCoinDeleteDialog(): void {
        this.dialogRef.close();
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
