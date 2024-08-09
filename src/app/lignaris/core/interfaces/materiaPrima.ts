import Decimal from "decimal.js";

export interface IMateriaPrima{
    idMateriaPrima: number,
    nombre: string | null,
    tipoMedida: string | null,
    cantidadMinima: Decimal | null
}