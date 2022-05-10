import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CoinDialogComponent } from '../modals/coin-dialog/coin-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CoinImageDialogComponent } from '../modals/coin-image-dialog/coin-image-dialog.component';
import { TranslocoService } from '@ngneat/transloco';
import { ICoinResponse } from '../interfaces/coin.interface';
import { CoinDeleteDialogComponent } from '../modals/coin-delete-dialog/coin-delete-dialog.component';
import { takeUntil } from 'rxjs/operators';
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
        // console.log(this.translocoService.selectTranslateObject('countries'));
        this.coinsService.coins$
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((res: ICoinResponse[]) => {
                this.coins = res
                    .filter((coin) => coin.continent === this.currentContinent)
                    .sort((a: ICoinResponse, b: ICoinResponse) =>
                        a.country > b.country ? 1 : -1
                    );
            });

        this.getAllCoins();

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.getActiveContinent();
                this.coinsService.coins$
                    .pipe(takeUntil(this.ngUnsubscribe))
                    .subscribe((res: ICoinResponse[]) => {
                        this.coins = res
                            .filter(
                                (coin) =>
                                    coin.continent === this.currentContinent
                            )
                            .sort((a: ICoinResponse, b: ICoinResponse) =>
                                a.country > b.country ? 1 : -1
                            );
                    });
            }
        });
    }

    private getAllCoins(): void {
        this.coinsService.getAllCoins();
    }

    private getActiveContinent(): void {
        this.currentContinent = this.activatedRoute.snapshot.paramMap.get('id');
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
