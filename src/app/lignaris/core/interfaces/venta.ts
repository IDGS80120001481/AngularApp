import Decimal from "decimal.js";

export interface IVenta{
    idVenta: number,
    idEmpleado: number | null,
    idCliente: number | null,
    estatus: number | null,
    fechaVenta: Date | null,
    total: Decimal | null
}