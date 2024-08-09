import Decimal from "decimal.js";

export interface IVentaDetalle{
    idVentaDetalle: number,
    idVenta: number | null,
    idReceta: number | null,
    cantidad: Decimal | null
}