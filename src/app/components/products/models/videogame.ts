import { Product } from './product';
export class Videogame extends Product
{
    id_product_type: number = 3;
    description: string;
    release_date: string;
    pegi: number;
    id_platform: number;
    id_genre: number;
    id_developer: number;

    constructor()
    {
        super();
    }
}