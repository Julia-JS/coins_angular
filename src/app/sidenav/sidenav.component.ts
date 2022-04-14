import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
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

  constructor(private router: Router, public dataShareService: DataShareService) { }

  @ViewChild('overlay') overlay;

  public isOpened: boolean = false;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.dataShareService.isSidenavOpened
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(isOpened => this.isOpened = isOpened);
  }

  private clickItem(link: string, status: boolean): void {
    this.router.navigate([link]);
    this.dataShareService.toggleSidenavStatus(status);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    if (this.overlay.nativeElement.contains(event.target)) {
      this.dataShareService.toggleSidenavStatus(!this.isOpened);
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
