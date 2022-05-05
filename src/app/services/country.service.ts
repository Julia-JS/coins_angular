import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(private http: HttpClient) {
  }

  create(country): Observable<any> {
    console.log(country.continent.id);
    return this.http
      .post<any>(`http://localhost:3000/countries`,
        {ru: country.ru, en: country.en, es: country.es, de: country.de, continent: country.continent.id})
      .pipe(map(res => {
        console.log(res);
        return res;
      }));
  }
}
