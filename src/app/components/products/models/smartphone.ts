import { Product } from './product';
export class Smartphone extends Product
{
    id_product_type: number = 1;
    storage: number;
    ram: number;
    inches: number;
    battery: number;
    camera: number;
    has_sd: boolean = false;
    id_color: number;

    constructor() 
    { 
        super();
    }
}