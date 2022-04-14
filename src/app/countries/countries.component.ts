import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CoinsService} from '../services/coins.service';
import {CoinDialogComponent} from '../modals/coin-dialog/coin-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {CoinImageDialogComponent} from '../modals/coin-image-dialog/coin-image-dialog.component';
import {TranslocoService} from '@ngneat/transloco';
import {ICoinResponse} from '../interfaces/coin.interface';
import {CoinDeleteDialogComponent} from '../modals/coin-delete-dialog/coin-delete-dialog.component';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit, AfterContentChecked {
  public continent: string = '';
  public coins: Array<ICoinResponse> = [];

  constructor(private activatedRoute: ActivatedRoute,
              public dialog: MatDialog,
              private service: TranslocoService,
              private coinsService: CoinsService) {
    this.fetchCoins();
  }

  ngOnInit(): void {
    this.coinsService.coins
      .pipe()
      .subscribe(coins => this.coins = coins);
  }

  private fetchCoins(): void {
    this.coinsService.fetch()
      .subscribe(res => {
        this.coins = res;
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
      width: '55rem',
      height: '28rem',
      data: {
        dataKey: image
      }
    });
  }

  private openCoinDeleteDialog(id: string): void {
    console.log(id);
    this.dialog.open(CoinDeleteDialogComponent, {
      width: '30rem',
      data: {
        dataKey: id
      }
    });
  }

  ngAfterContentChecked(): void {
    this.continent = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.service.getActiveLang());
  }
}
