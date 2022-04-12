import {Component, AfterContentChecked, ChangeDetectorRef, OnInit, OnDestroy} from '@angular/core';
import {TranslocoService} from '@ngneat/transloco';
import {MatDialog} from '@angular/material/dialog';
import {CoinDialogComponent} from '../coin-dialog/coin-dialog.component';
import {DataShareService} from '../services/data-share.service';
import {Subject} from 'rxjs';
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

    if(this.isOpened) {
      document.body.style.position = 'fixed';
      document.body.style.top = '0';
      document.body.style.left = '0';
      document.body.style.right = '0';
    } else {
      document.body.style.position = 'static';
    }
  }

  change(lang): void {
    this.service.setActiveLang(lang.value);
  }

  toggle(value: boolean): void {
    this.dataShare.toggleSidenavStatus(value);
  }

  openDialog(): void {
    this.dialog.open(CoinDialogComponent, {
      width: '30rem',
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
