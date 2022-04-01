import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  private opened = false;
  private isOpened = new BehaviorSubject(this.opened);

  constructor() { }

  public getSidenavStatus(): Observable<boolean> {
    return this.isOpened.asObservable();
  }

  public toggleSidenavStatus(): void {
    this.opened = !this.opened;
    this.isOpened.next(this.opened);
  }
}
