import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoinsService {
  private url = 'https://coins-5cbbb-default-rtdb.europe-west1.firebasedatabase.app/coins';

  private _coins: BehaviorSubject<[]>;
  public coins: Observable<[]>;

  constructor(private http: HttpClient) {
    this._coins = new BehaviorSubject([]);
    this.coins = this._coins.asObservable();
  }

  fetch(): Observable<any> {
    const coins: any = [];
    return this.http
      .get<any>(`${this.url}.json`)
      .pipe(map(res => {
          for (const key in res) {
            coins.push(
              {id: key, ...res[key]}
            );
          }
          coins.sort((a, b) => (a.country > b.country) ? 1 : -1);
          return coins;
        }
      ));
  }

  create(coin): Observable<any> {
    const coins: any = [];
    return this.http
      .post<any>(`${this.url}.json`, coin)
      .pipe(map(res => {
        for (const key in res) {
          coins.push(
            {id: key, ...res[key]}
          );
        }
        coins.sort((a, b) => (a.country > b.country) ? 1 : -1);
        return coins;
      }));
  }

  update(id, coin): Observable<any> {
    return this.http
      .patch<any>(`${this.url}/${id}.json`, coin)
      .pipe(map(res => {
          return res;
        }
      ));
  }

  delete(id): Observable<any> {
    return this.http
      .delete<any>(`${this.url}/${id}.json`)
      .pipe(map(res => {
          return res;
        }
      ));
  }

  rerender(coins): void {
    this._coins.next(coins);
  }
}
