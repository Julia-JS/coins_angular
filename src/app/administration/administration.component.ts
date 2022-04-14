import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CountryService} from '../services/country.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Translation} from '@ngneat/transloco';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {
  countryForm: FormGroup = new FormGroup({
    // continentRu: new FormControl(''),
    countryRu: new FormControl(''),
    // continentEn: new FormControl(''),
    // countryEn: new FormControl(''),
    // continentEs: new FormControl(''),
    // countryEs: new FormControl(''),
    // continentDe: new FormControl(''),
    // countryDe: new FormControl(''),
  });


  constructor(private countryService: CountryService) { }

  public country: string = '';

  ngOnInit(): void {}

  addCountry(): void {
    console.log(this.countryForm.value);
    this.countryService.create(this.countryForm.value).subscribe(
      res => {
        this.country = res;
      }, err => console.log(err));
  }
}
