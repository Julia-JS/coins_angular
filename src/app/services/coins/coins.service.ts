import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ICoin, ICoinResponse} from '../../interfaces/coin.interface';
import {CoinsHttpService} from '../http/coins-http.service';

@Injectable({
  providedIn: 'root',
})
export class CoinsService {
  private _coins$: BehaviorSubject<ICoinResponse[]>;
  public coins$: Observable<ICoinResponse[]>;

  constructor(private coinsHttpService: CoinsHttpService) {
    this._coins$ = new BehaviorSubject<ICoinResponse[]>([]);
    this.coins$ = this._coins$.asObservable();
  }

  getAllCoins(): void {
    this.coinsHttpService.getAllCoins().subscribe(
      (res: ICoinResponse[]) => {
        this._coins$.next(res);
      },
      (err) => console.log(err)
    );
  }

  createCoin(coin: ICoin): void {
    this.coinsHttpService.createCoin(coin).subscribe(
      (res: ICoinResponse) => {
        console.log(res);
        this._coins$.next([...this._coins$.value, res]);
      },
      (err) => console.log(err)
    );
  }

  updateCoin(id: number, coin: ICoinResponse): void {
    this.coinsHttpService.update(id, coin).subscribe(
      (res: ICoinResponse) => {
        const index = this._coins$.value.findIndex(x => Number(x.id) === id);
        this._coins$.value[index] = res;
        this._coins$.next(this._coins$.value);
      },
      (err) => console.log(err)
    );
  }

  deleteCoin(id: number): void {
    this.coinsHttpService.delete(id).subscribe(
      (res: ICoinResponse) => {
        this._coins$.next([...this._coins$.value.filter(c => Number(c.id) !== id)]);
      },
      (err) => console.log(err)
    );
  }
}
