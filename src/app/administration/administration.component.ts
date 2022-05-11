import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-administration',
    templateUrl: './administration.component.html',
    styleUrls: ['./administration.component.scss'],
})
export class AdministrationComponent {
    // public countryResponse = [];
    countryForm: FormGroup = new FormGroup({
        continent: new FormControl(''),
        ru: new FormControl(''),
        en: new FormControl(''),
        es: new FormControl(''),
        de: new FormControl(''),
    });

    // constructor(private countryService: CountryService) { }
    //
    // addCountry(): void {
    //   const country = this.countryForm.value;
    //   console.log(country);
    //   this.countryService.create(country).subscribe(
    //     res => {
    //       this.countryResponse = res;
    //     }, err => console.log(err));
    // }
}
