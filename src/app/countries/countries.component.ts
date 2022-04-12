import {
  AfterContentChecked,
  Component, Inject,
  OnInit
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CoinsService} from '../services/coins.service';
import {CoinDialogComponent} from '../coin-dialog/coin-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {CoinImageDialogComponent} from '../coin-image-dialog/coin-image-dialog.component';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit, AfterContentChecked {
  public continent = '';
  public coins = [];

  constructor(private activatedRoute: ActivatedRoute,
              public dialog: MatDialog,
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

  delete(id): void {
    this.coinsService.delete(id)
      .subscribe(res => {
        this.coins = res;
        this.fetchCoins();
      }, err => console.log(err));
  }

  openDialog(coin): void {
    this.dialog.open(CoinDialogComponent, {
      width: '30rem',
      data: {
        dataKey: coin
      }
    });
  }

  openCoin(image): void {
    this.dialog.open(CoinImageDialogComponent, {
      width: '55rem',
      height: '28rem',
      data: {
        dataKey: image
      }
    });
  }

  ngAfterContentChecked(): void {
    this.continent = this.activatedRoute.snapshot.paramMap.get('id');
  }
}
