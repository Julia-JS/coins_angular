import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {CoinsService} from '../../services/coins.service';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Translation, TranslocoService} from '@ngneat/transloco';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ICoin} from '../../interfaces/coin.interface';

@Component({
  selector: 'app-coin-dialog',
  templateUrl: './coin-dialog.component.html',
  styleUrls: ['./coin-dialog.component.scss']
})
export class CoinDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CoinDialogComponent>,
    private http: HttpClient,
    private coinsService: CoinsService,
    private translocoService: TranslocoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  @ViewChild('inputFile') inputFileRef: ElementRef;
  private url = 'https://coins-5cbbb-default-rtdb.europe-west1.firebasedatabase.app/countries';
  private image: File;
  private imagePreview: string | ArrayBuffer = '';
  public imagesArray: Array<string | ArrayBuffer> = this.data?.dataKey?.image ? this.data?.dataKey?.image.slice() : [];
  public isNewCoin = !this.data;
  public continents = [];
  public activeContinent = '';
  public activeLang = this.translocoService.getActiveLang();

  coinForm: FormGroup = new FormGroup({
    country: new FormControl(this.data?.dataKey?.country[this.activeLang] || ''),
    denomination: new FormControl(this.data?.dataKey?.denomination || ''),
    currency: new FormControl(this.data?.dataKey?.currency || ''),
    year: new FormControl(this.data?.dataKey?.year || ''),
    material: new FormControl(this.data?.dataKey?.material || ''),
    coinOrBanknote: new FormControl(this.data?.dataKey?.coinOrBanknote || ''),
    comment: new FormControl(this.data?.dataKey?.comment || ''),
    image: new FormControl(''),
  });


  ngOnInit(): void {
    console.log(this.data?.dataKey);

    this.getCountries()
      .subscribe(res => {
        for (const key in res) {
          const countries = [];
          this.continents.push( {continent: key, countries} );
          for (const prop in res[key]) {
            for (const p in res[key][prop]) {
              if (typeof res[key][prop] === 'object')
              countries.push( {id: p, ...res[key][prop][p]} );
            }
          }
        }
        console.log(this.continents);
      }
    );
  }

  //todo: add type of function return
  private getCountries(): any {
    return this.http.get<Translation>(`${(this.url)}.json`)
      .pipe(map(res => {
          return res;
        }
      ));
  }

  private triggerInputFileClick(): void {
    this.inputFileRef.nativeElement.click();
  }

  private onFileUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    this.image = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
      this.imagesArray.push(this.imagePreview);
    };

    reader.readAsDataURL(file);
  }

  private closeDialog(): void {
    this.dialogRef.close();
  }

  private getActiveContinent(countryValue): any {
    console.log(this.coinForm.value.country);
    console.log(this.activeLang);
    return this.continents.find(continent => continent.countries.find(country => country[this.activeLang] === countryValue[this.activeLang])).continent;
  }

  private submitCoin(): void {
    this.activeContinent = this.getActiveContinent(this.coinForm.value.country);
    const coin = {
      ...this.coinForm.value,
      image: this.imagesArray,
      continent: this.activeContinent
    };

    if (this.isNewCoin) {
      this.createCoin(coin);
    } else {
      this.updateCoin(this.data.dataKey.id, coin);
    }

    this.dialogRef.close();
  }

  private createCoin(coin: ICoin): void {
    this.coinsService.create(coin).subscribe(res => {
      this.coinsService.fetch()
        .subscribe(coins => {
          this.coinsService.rerender(coins);
          return coins;
        }, err => console.log(err));
    }, err => console.log(err));
  }

  private updateCoin(id: string, coin: ICoin): void {
    this.coinsService.update(id, coin).subscribe(res => {
      this.coinsService.fetch()
        .subscribe(coins => {
          this.coinsService.rerender(coins);
          return coins;
        }, err => console.log(err));
    }, err => console.log(err));
  }

  private deleteImage(i: number): void {
    this.imagesArray.splice(i, 1);
  }
}
