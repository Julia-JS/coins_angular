import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  private _isSidenavOpened: BehaviorSubject<boolean>;
  public isSidenavOpened: Observable<boolean>;

  constructor() {
    this._isSidenavOpened = new BehaviorSubject(false);
    this.isSidenavOpened = this._isSidenavOpened.asObservable();
  }

  public toggleSidenavStatus(value: boolean): void {
    this._isSidenavOpened.next(value);
  }
}
