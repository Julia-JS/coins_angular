import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ICoinResponse} from '../interfaces/coin.interface';

@Injectable({
  providedIn: 'root'
})
export class CoinsService {
  private url = 'http://localhost:3000/coins';

  private _coins: BehaviorSubject<ICoinResponse[]>;
  public coins: Observable<ICoinResponse[]>;

  constructor(private http: HttpClient) {
    this._coins = new BehaviorSubject<ICoinResponse[]>([]);
    this.coins = this._coins.asObservable();
  }

  fetch(): Observable<ICoinResponse[]> {
    return this.http
      .get<any>('http://localhost:3000/coins')
      .pipe(map(res => {
        res.sort((a, b) => (a.country > b.country) ? 1 : -1);
        return res;
      }));
  }

  create(coin): Observable<ICoinResponse> {
    return this.http
      .post<any>('http://localhost:3000/coins', coin)
      .pipe(map(res => {
        return res;
      }));
  }

  update(id, coin): Observable<ICoinResponse> {
    return this.http
      .patch<any>(`http://localhost:3000/coins/${id}`, coin)
      .pipe(map(res => {
        return res;
      }
    ));
  }

  delete(id): Observable<any> {
    return this.http
      .delete<any>(`http://localhost:3000/coins/${id}`)
      .pipe(map(res => {
          return res;
        }
      ));
  }

  rerender(): void {
    this.fetch().subscribe(res => {
      this._coins.next(res);
      }, err => console.log(err));
  }
}
