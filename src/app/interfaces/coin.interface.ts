import {FormControl} from '@angular/forms';

export interface ICoin {
  country: string;
  denomination: number;
  currency: string;
  year: number;
  coinOrBanknote: string;
  material: string;
  comment: string;
  image: Array<string | ArrayBuffer>;
}

export interface ICoinResponse extends ICoin{
  id: string;
}
