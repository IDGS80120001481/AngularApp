export interface IProduct{
    idReceta: number;
    nombre: string;
    foto: string
    tamanio: number
    precioUnitario: number;
    descripcion: string;
    estatus: number;
    
}

export interface ProductItemCard{
    product: IProduct;
    quantity: number;
}