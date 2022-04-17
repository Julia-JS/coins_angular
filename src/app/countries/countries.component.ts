import {AfterContentChecked, AfterContentInit, AfterViewChecked, Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {CoinsService} from '../services/coins.service';
import {CoinDialogComponent} from '../modals/coin-dialog/coin-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {CoinImageDialogComponent} from '../modals/coin-image-dialog/coin-image-dialog.component';
import {Translation, TranslocoService} from '@ngneat/transloco';
import {ICoinResponse} from '../interfaces/coin.interface';
import {CoinDeleteDialogComponent} from '../modals/coin-delete-dialog/coin-delete-dialog.component';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit, AfterContentChecked {
  constructor(private router: Router,
              private http: HttpClient,
              private activatedRoute: ActivatedRoute,
              public dialog: MatDialog,
              private translocoService: TranslocoService,
              private coinsService: CoinsService) {
    this.fetchCoins();
  }

  public continents = [];
  public continent: string = this.activatedRoute.snapshot.paramMap.get('id');
  public activeContinent: string = 'Europe';
  public coins: Array<ICoinResponse> = [];
  public activeLang = 'ru';
  private url = 'https://coins-5cbbb-default-rtdb.europe-west1.firebasedatabase.app/countries';

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.fetchCoins();
      }
    });

    this.getContinents()
      .subscribe(res => {
        this.continents = res;
      });

    this.getActiveContinet();
  }

  private getActiveContinet(): void {
    this.activeLang = this.translocoService.getActiveLang();
    this.continent = this.activatedRoute.snapshot.paramMap.get('id');
    this.activeContinent = Object.entries(this.continents).filter(continent => continent[0] === this.continent)[0][1][this.activeLang];
  }

  private getContinents(): any {
    return this.http.get<Translation>(`${(this.url)}.json`)
      .pipe(map(res => {
          return res;
        }
      ));
  }

  private fetchCoins(): void {
    this.coinsService.fetch()
      .subscribe(res => {
        this.coins = res.filter(coin => coin.continent === this.continent);
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

  ngAfterContentChecked(): void {
    this.getActiveContinet();
  }
}
