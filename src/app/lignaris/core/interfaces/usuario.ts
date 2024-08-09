export interface IUsuario{
    idUsuario: number,
    nombre: string | null,
    contrasenia: string | null,
    lastoken: string | null,
    dateLastoken: Date | null,
    estatus: number | null
}