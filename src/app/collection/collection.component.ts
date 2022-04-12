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
  constructor(private route: ActivatedRoute, private router: Router, private dataShare: DataShareService) {
  }

  private ngUnsubscribe = new Subject<void>();

  public isOpened: boolean;

  ngOnInit(): void {
    this.dataShare.isSidenavOpened
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(isOpened => this.isOpened = isOpened);
  }

  setContinent(i): void {
    this.router.navigate(['collection', i]);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
