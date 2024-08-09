import Decimal from "decimal.js"

export interface IRecetaDetalle{
    idRecetaDetalle: number | null,
    idReceta: number | null,
    idMateriaPrima: number | null,
    cantidad: Decimal | null
}