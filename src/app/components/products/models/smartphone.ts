import { Product } from './product';
export class Smartphone extends Product
{
    id_product_type: number;
    storage: number;
    ram: number;
    inches: number;
    battery: number;
    camera: number;
    has_sd: boolean;
    id_color: number;

    constructor() 
    { 
        super();
    }
}