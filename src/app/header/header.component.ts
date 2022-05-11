import {
    Component,
    AfterContentChecked,
    ChangeDetectorRef,
    OnInit,
    OnDestroy,
    ViewChild,
    ElementRef,
} from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { MatDialog } from '@angular/material/dialog';
import { CoinDialogComponent } from '../modals/coin-dialog/coin-dialog.component';
import { DataShareService } from '../services/share/data-share.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterContentChecked, OnDestroy {
    public isOpened: boolean;
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private service: TranslocoService,
        private changeDetector: ChangeDetectorRef,
        public dialog: MatDialog,
        public dataShareService: DataShareService
    ) {}

    ngOnInit(): void {
        this.dataShareService.isSidenavOpened$
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((isOpened) => (this.isOpened = isOpened));
    }

    ngAfterContentChecked(): void {
        this.changeDetector.detectChanges();

        if (this.isOpened) {
            document.body.style.position = 'fixed';
            document.body.style.top = '0';
            document.body.style.left = '0';
            document.body.style.right = '0';
        } else {
            document.body.style.position = 'static';
        }
    }

    private changeLang(lang: string): void {
        this.service.setActiveLang(lang);
    }

    private toggleHamburger(value: boolean): void {
        this.dataShareService.toggleSidenavStatus(value);
    }

    private openDialog(): void {
        this.dialog.open(CoinDialogComponent, {
            width: '30rem',
        });
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
