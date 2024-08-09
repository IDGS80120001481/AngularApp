import Decimal from "decimal.js";

export interface ICompraDetalle{
    idCompraDetalle: number,
    idCompra: number | null,
    idMateriaPrima: number| null,
    precioUnitario: Decimal| null,
    numLote: string| null,
    fechaCaducidad: Date| null
}