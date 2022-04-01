import {Component, AfterContentChecked, ChangeDetectorRef, OnInit, OnChanges, OnDestroy} from '@angular/core';
import {TranslocoService} from '@ngneat/transloco';
import {MatDialog} from '@angular/material/dialog';
import {NewCoinDialogComponent} from '../new-coin-dialog/new-coin-dialog.component';
import {DataShareService} from '../services/data-share.service';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterContentChecked, OnDestroy {

  constructor(private service: TranslocoService, private changeDetector: ChangeDetectorRef, public dialog: MatDialog, public dataShare: DataShareService) {
  }

  private ngUnsubscribe = new Subject<void>();

  public isOpened: boolean;

  ngOnInit(): void {
    this.dataShare.isSidenavOpened
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(isOpened => this.isOpened = isOpened);
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  change(lang): void {
    this.service.setActiveLang(lang.value);
  }

  toggle(value: boolean): void {
    this.dataShare.toggleSidenavStatus(value);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewCoinDialogComponent, {
      width: '30rem',
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
