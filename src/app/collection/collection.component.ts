import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  setContinent(continent, i): void {
    this.router.navigate(['collection', i], { queryParams: {continent}} );
  }
}
