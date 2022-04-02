import {AfterContentChecked, AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements AfterContentChecked {
  public continent = '';

  constructor(private activatedRoute: ActivatedRoute) {}

  ngAfterContentChecked(): void {
    this.continent = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.continent);
  }
}
