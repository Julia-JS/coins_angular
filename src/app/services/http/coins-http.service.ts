import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICoinResponse } from '../../interfaces/coin.interface';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CoinsHttpService {
    constructor(private http: HttpClient) {}

    getAllCoins(): Observable<ICoinResponse[]> {
        return this.http.get<ICoinResponse[]>(`${environment.DB_URL}coins`);
    }

    createCoin(coin: ICoinResponse): Observable<ICoinResponse> {
        return this.http.post<ICoinResponse>(`${environment.DB_URL}coins`, coin);
    }

    update(id: number, coin: ICoinResponse): Observable<ICoinResponse> {
        return this.http.patch<ICoinResponse>(`${environment.DB_URL}coins/${id}`, coin);
    }

    delete(id: number): Observable<ICoinResponse> {
        return this.http.delete<ICoinResponse>(`${environment.DB_URL}coins/${id}`);
    }
}
