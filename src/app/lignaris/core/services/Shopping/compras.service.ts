import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';


export interface ICompraDetalleDTO {
  idMateriaPrima: number,
  precioUnitario: number,
  cantidad: number,
  numLote: string,
  fechaCaducidad: Date
}

export interface IInventarioDTO {
  cantidadDisponible: number
}

export interface ICompraDTO {
  idEmpleado: number;
  idProveedor: number;
  fechaCompra: Date;
  detallesCompra: ICompraDetalleDTO[];
  inventarios: IInventarioDTO[];
}

export interface IEmpleadoPersonaDTO{
  idEmpleado: number,
  idPersona: number,
  nombre: string,
  apellido_Paterno: string,
  apellido_Materno: string,
  telefono: string,
  direccion: string,
  email: string,
}

export interface IProveedorPersonaDTO{
  idProveedor: number,
  idPersona: number,
  nombre: string,
  apellido_Paterno: string,
  apellido_Materno: string,
  telefono: string,
  direccion: string,
  email: string,
}

export interface IMateriaPrimaDTO{
  idMateriaPrima: number,
  nombre: string,
  tipoMedida: string,
  cantidadMinima: number
}

@Injectable({
  providedIn: 'root'
})

export class ComprasService {

  private _endpoint: string = environment.API_URL;
  private apiUrl: string = this._endpoint + "Compras/"

  constructor(private _http: HttpClient) { }

  getEmployee(): Observable<IEmpleadoPersonaDTO[]> {
    return this._http.get<{ $id: string, $values: IEmpleadoPersonaDTO[] }>(`${this.apiUrl}EmpleadosParaCompras`)
      .pipe(
        map(response => response.$values)  // Extraer el array de $values
      );
  }

  getSuppliers(): Observable<IProveedorPersonaDTO[]> {
    return this._http.get<{ $id: string, $values: IProveedorPersonaDTO[] }>(`${this.apiUrl}ProveedoresParaCompras`)
      .pipe(
        map(response => response.$values)  // Extraer el array de $values
      );
  }

  //raw material
  getRawMaterial(): Observable<IMateriaPrimaDTO[]> {
    return this._http.get<{ $id: string, $values: IMateriaPrimaDTO[] }>(`${this.apiUrl}ListaMateriasPrimas`)
      .pipe(
        map(response => response.$values)  // Extraer el array de $values
      );
  }

  //Método para agregar una compra del endpoint ComprarMateriaPrima.
  buy(request: ICompraDTO): Observable<ICompraDTO>{
    return this._http.post<ICompraDTO>(`${this.apiUrl}ComprarMateriaPrima`, request)
  }  

}
