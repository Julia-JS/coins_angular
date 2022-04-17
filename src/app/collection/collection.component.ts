import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {DataShareService} from '../services/data-share.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private router: Router, private dataShareService: DataShareService) {
  }

  public isOpened: boolean;
  public activeContinent: number = 3;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.dataShareService.isSidenavOpened
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(isOpened => this.isOpened = isOpened);
  }

  setActiveContinent(id: string, i): void {
    console.log(i);
    this.router.navigate(['collection', id]);
    this.activeContinent = i;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
