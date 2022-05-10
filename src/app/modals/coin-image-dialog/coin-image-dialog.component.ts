import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-coin-image-dialog',
    templateUrl: './coin-image-dialog.component.html',
    styleUrls: ['./coin-image-dialog.component.scss'],
})
export class CoinImageDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
