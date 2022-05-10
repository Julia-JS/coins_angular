import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CoinsHttpService } from '../../services/http/coins-http.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { CoinsService } from '../../services/coins/coins.service';

@Component({
    selector: 'app-coin-dialog',
    templateUrl: './coin-dialog.component.html',
    styleUrls: ['./coin-dialog.component.scss'],
})
export class CoinDialogComponent {
    public coinForm: FormGroup = new FormGroup({
        country: new FormControl(this.data?.dataKey?.country || ''),
        denomination: new FormControl(this.data?.dataKey?.denomination || ''),
        currency: new FormControl(this.data?.dataKey?.currency || ''),
        year: new FormControl(this.data?.dataKey?.year || ''),
        material: new FormControl(this.data?.dataKey?.material || ''),
        type: new FormControl(this.data?.dataKey?.type || ''),
        comment: new FormControl(this.data?.dataKey?.comment || ''),
        image: new FormControl(''),
    });

    public imagesArray: Array<string | ArrayBuffer> = this.data?.dataKey?.image
        ? this.data?.dataKey?.image.slice()
        : [];
    public isNewCoin: boolean = !this.data;
    @ViewChild('inputFile') inputFileRef: ElementRef;
    private imagePreview: string | ArrayBuffer | null = '';
    private image: File;

    constructor(
        public dialogRef: MatDialogRef<CoinDialogComponent>,
        private http: HttpClient,
        private coinsService: CoinsService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    private triggerInputFileClick(): void {
        this.inputFileRef.nativeElement.click();
    }

    private onFileUpload(event: Event): void {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            this.image = file;
        }
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result;
            if (this.imagePreview) {
                this.imagesArray.push(this.imagePreview);
            }
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    private closeDialog(): void {
        this.dialogRef.close();
    }

    private submitCoin(): void {
        const coin = {
            ...this.coinForm.value,
            id: this.data?.dataKey.id,
            continent: this.coinForm.value.country[0],
            country: this.coinForm.value.country[1],
            image: this.imagesArray,
        };

        if (this.isNewCoin) {
            this.createCoin(coin);
        } else {
            this.updateCoin(this.data.dataKey.id, coin);
        }

        this.dialogRef.close();
    }

    private createCoin(coin): void {
        this.coinsService.createCoin(coin);
    }

    private updateCoin(id, coin): void {
        this.coinsService.updateCoin(id, coin);
    }

    private deleteImage(i: number): void {
        this.imagesArray.splice(i, 1);
    }
}
