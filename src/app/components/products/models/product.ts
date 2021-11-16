export class Product
{
    id: number | -1;
    name: string;
    price: number;
    stock_sale: number;
    stock_rent?: number;
    id_brand: number;
    cover: File;
    images: File[];

    constructor() {}
}