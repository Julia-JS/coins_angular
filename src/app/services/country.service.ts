import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private url = 'https://coins-5cbbb-default-rtdb.europe-west1.firebasedatabase.app/countries';

  constructor(private http: HttpClient) {
  }

  create(country): Observable<any> {
    console.log(country);
    return this.http
      .post<any>(`${this.url}/${country.continent.id}/countries.json`,
        {ru: country.ru, en: country.en, es: country.es, de: country.de})
      .pipe(map(res => {
        console.log(res);
        return res;
      }));
  }
}
