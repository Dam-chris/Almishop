import { Product } from './product';
export class Videoconsole extends Product
{
    id_product_type: number = 4;
    storage: number;
    has_cd: boolean = false;
    ram: number;
    cpu: number;
    gpu: number;

    constructor()
    {
        super();
    }
}