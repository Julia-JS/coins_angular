import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {CoinsService} from '../services/coins.service';
import {CoinDialogComponent} from '../modals/coin-dialog/coin-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {CoinImageDialogComponent} from '../modals/coin-image-dialog/coin-image-dialog.component';
import {TranslocoService} from '@ngneat/transloco';
import {ICoinResponse} from '../interfaces/coin.interface';
import {CoinDeleteDialogComponent} from '../modals/coin-delete-dialog/coin-delete-dialog.component';
import {takeUntil} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})

export class CountriesComponent implements OnInit, OnDestroy {
  constructor(private router: Router,
              private http: HttpClient,
              private activatedRoute: ActivatedRoute,
              public dialog: MatDialog,
              private translocoService: TranslocoService,
              private coinsService: CoinsService) {
  }

  public continents = [];
  public currentContinent: string | null = this.activatedRoute.snapshot.paramMap.get('id');
  public coins: Array<ICoinResponse>;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.coinsService.coins
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this.coins = res.filter(coin => coin.continent === this.currentContinent);
      });

    this.fetchCoins();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.fetchCoins();
        this.getActiveContinent();
      }
    });
  }

  private getActiveContinent(): void {
    this.currentContinent = this.activatedRoute.snapshot.paramMap.get('id');
  }

  private fetchCoins(): void {
    this.coinsService.fetch()
      .subscribe(res => {
        this.coins = res.filter(coin => coin.continent === this.currentContinent);
      }, err => console.log(err));
  }

  private openDialog(coin: ICoinResponse): void {
    this.dialog.open(CoinDialogComponent, {
      width: '30rem',
      data: {
        dataKey: coin
      }
    });
  }

  private openCoinImageDialog(image: Array<string | ArrayBuffer>): void {
    this.dialog.open(CoinImageDialogComponent, {
      maxWidth: '55rem',
      height: '28rem',
      data: {
        dataKey: image
      }
    });
  }

  private openCoinDeleteDialog(id: string): void {
    this.dialog.open(CoinDeleteDialogComponent, {
      width: '30rem',
      data: {
        dataKey: id
      }
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
