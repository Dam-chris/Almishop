import { Product } from './product';
export class Videoconsole extends Product
{
    id_product_type: number;
    storage: number;
    has_cd: boolean;
    ram: number;
    cpu: number;
    gpu: number;

    constructor()
    {
        super();
    }
}