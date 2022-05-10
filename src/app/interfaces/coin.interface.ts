export interface ICoin {
    country: string;
    continent: string;
    denomination?: number;
    currency?: string;
    year?: number;
    type?: string;
    material?: string;
    comment?: string;
    image?: Array<string | ArrayBuffer>;
}

export interface ICoinResponse extends ICoin {
    id?: string;
}
