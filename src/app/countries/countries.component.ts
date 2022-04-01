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

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngAfterContentChecked(): void {
    this.continent = this.activatedRoute.snapshot.queryParamMap.get('continent');
  }
}
