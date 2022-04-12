import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {CoinsService} from '../services/coins.service';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-coin-dialog',
  templateUrl: './coin-dialog.component.html',
  styleUrls: ['./coin-dialog.component.scss']
})
export class CoinDialogComponent implements OnInit {
  @ViewChild('input') inputRef: ElementRef;
  coinForm: FormGroup = new FormGroup({
    country: new FormControl(this.data?.dataKey?.country || ''),
    denomination: new FormControl(this.data?.dataKey?.denomination || ''),
    currency: new FormControl(this.data?.dataKey?.currency || ''),
    year: new FormControl(this.data?.dataKey?.year || ''),
    material: new FormControl(this.data?.dataKey?.material || ''),
    comment: new FormControl(this.data?.dataKey?.comment || ''),
    image: new FormControl(''),
  });
  imagesArray = this.data?.dataKey?.image ? this.data?.dataKey?.image.slice() : [];
  newArray = [];
  image: File;
  imagePreview: any = '';

  isNewCoin = !this.data;

  constructor(
    public dialogRef: MatDialogRef<CoinDialogComponent>,
    private coinsService: CoinsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {}

  triggerClick(): void {
    this.inputRef.nativeElement.click();
  }

  onFileUpload(event: any): void {
    const file = event.target.files[0];
    this.image = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
      this.imagesArray.push(this.imagePreview);
    };

    reader.readAsDataURL(file);
  }

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close();

    const coin = {
      country: this.coinForm.value.country,
      denomination: this.coinForm.value.denomination,
      currency: this.coinForm.value.currency,
      year: this.coinForm.value.year,
      material: this.coinForm.value.material,
      comment: this.coinForm.value.comment,
      image: this.imagesArray,
    };

    if (this.isNewCoin) {
      this.createCoin(coin);
    } else {
      this.updateCoin(this.data.dataKey.id, coin);
    }
  }

  createCoin(coin): void {
    this.coinsService.create(coin).subscribe(res => {
      this.coinsService.fetch()
        .subscribe(coins => {
          this.coinsService.rerender(coins);
          return coins;
        }, err => console.log(err));
    }, err => console.log(err));
  }

  updateCoin(id, coin): void {
    this.coinsService.update(id, coin).subscribe(res => {
      // Object.assign(res, {id});
      this.coinsService.fetch()
        .subscribe(coins => {
          this.coinsService.rerender(coins);
          return coins;
        }, err => console.log(err));
    }, err => console.log(err));
  }

  deleteImage(i): void {
    this.imagesArray.splice(i, 1);
  }
}
