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
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private dataShareService: DataShareService) {
  }

  public isOpened: boolean;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.dataShareService.isSidenavOpened
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(isOpened => this.isOpened = isOpened);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
