import {Component, HostListener, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataShareService} from '../services/data-share.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

  constructor(private router: Router, public dataShare: DataShareService) { }

  @ViewChild('overlay') overlay;

  private ngUnsubscribe = new Subject<void>();

  public isOpened = false;

  ngOnInit(): void {
    this.dataShare.isSidenavOpened
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(isOpened => this.isOpened = isOpened);
  }

  clickItem(link, status): void {
    this.router.navigate([link]);
    this.dataShare.toggleSidenavStatus(status);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    if (this.overlay.nativeElement.contains(event.target)) {
      this.dataShare.toggleSidenavStatus(!this.isOpened);
    }
  }
}
