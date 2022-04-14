import {FormControl} from '@angular/forms';

export interface ICoin {
  id: string;
  country: string;
  denomination: number;
  currency: string;
  year: number;
  material: string;
  comment: string;
  image: Array<string | ArrayBuffer>;
}
