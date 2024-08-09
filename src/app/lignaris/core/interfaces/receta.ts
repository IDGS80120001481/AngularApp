import Decimal from "decimal.js"

export interface IReceta{
    idReceta: number,
    nombre: string | null,
    foto: string | null,
    precioUnitario: Decimal | null,
    estatus: number | null
}