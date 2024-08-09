import Decimal from "decimal.js";

export interface IInventario{
    idInventario: number,
    idCompraDetalle: number| null,
    cantidadDisponible: Decimal| null,
    estatus: number| null
}