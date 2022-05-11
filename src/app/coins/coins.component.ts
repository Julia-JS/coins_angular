import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { CoinDialogComponent } from '../modals/coin-dialog/coin-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CoinImageDialogComponent } from '../modals/coin-image-dialog/coin-image-dialog.component';
import { TranslocoService } from '@ngneat/transloco';
import { ICoinResponse } from '../interfaces/coin.interface';
import { CoinDeleteDialogComponent } from '../modals/coin-delete-dialog/coin-delete-dialog.component';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CoinsService } from '../services/coins/coins.service';

@Component({
    selector: 'app-coins',
    templateUrl: './coins.component.html',
    styleUrls: ['./coins.component.scss'],
})
export class CoinsComponent implements OnInit, OnDestroy {
    public continents = [];
    public currentContinent: string | null =
        this.activatedRoute.snapshot.paramMap.get('id');
    public coins: Array<ICoinResponse>;
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        public dialog: MatDialog,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private translocoService: TranslocoService,
        private coinsService: CoinsService
    ) {}

    ngOnInit(): void {
        this.getAllCoins();

        this.activatedRoute.url
            .pipe(
                takeUntil(this.ngUnsubscribe),
                tap((x: UrlSegment[]) => (this.currentContinent = x[0].path)),
                switchMap(() => this.coinsService.coins$),
                map((coins: ICoinResponse[]) =>
                    coins.filter(
                        (coin: ICoinResponse) =>
                            coin.continent === this.currentContinent
                    )
                ),
                map((coins: ICoinResponse[]) =>
                    coins.sort((a: ICoinResponse, b: ICoinResponse) =>
                        a.country > b.country ? 1 : -1
                    )
                )
            )
            .subscribe((coins) => (this.coins = coins));
    }

    private getAllCoins(): void {
        this.coinsService.getAllCoins();
    }

    private openDialog(coin: ICoinResponse): void {
        this.dialog.open(CoinDialogComponent, {
            width: '30rem',
            data: {
                dataKey: coin,
            },
        });
    }

    private openCoinImageDialog(image: Array<string | ArrayBuffer>): void {
        this.dialog.open(CoinImageDialogComponent, {
            maxWidth: '55rem',
            height: '28rem',
            data: {
                dataKey: image,
            },
        });
    }

    private openCoinDeleteDialog(id: string): void {
        this.dialog.open(CoinDeleteDialogComponent, {
            width: '30rem',
            data: {
                dataKey: id,
            },
        });
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
