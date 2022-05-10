import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { DataShareService } from '../services/share/data-share.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-collection',
    templateUrl: './collection.component.html',
    styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit, OnDestroy {
    public isOpened: boolean;
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private dataShareService: DataShareService) {}

    ngOnInit(): void {
        this.dataShareService.isSidenavOpened$
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((isOpened) => (this.isOpened = isOpened));
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
