import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  private _isSidenavOpened: BehaviorSubject<boolean>;
  public isSidenavOpened: Observable<boolean>;
  // private _activeLanguage: BehaviorSubject<string>;
  // public activeLanguage: Observable<string>;

  constructor() {
    this._isSidenavOpened = new BehaviorSubject(false);
    this.isSidenavOpened = this._isSidenavOpened.asObservable();
    // this._activeLanguage = new BehaviorSubject('ru');
    // this.activeLanguage = this._activeLanguage.asObservable();
  }

  public toggleSidenavStatus(value: boolean): void {
    this._isSidenavOpened.next(value);
  }

  // public getLanguage(value: string): void {
  //   this._activeLanguage.next(value);
  // }
}
