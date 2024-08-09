import { Injectable } from '@angular/core';
//import Decimal from 'decimal.js';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment.development';

export interface IInventarioDetalleDTO{
  idInventario: number,
  nombre: string,
  //cantidadDisponible: Decimal,
  fechaCompra: Date,
  fechaCaducidad: Date,
  numLote: string,
  estatus: number
}

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private _endpoint: string = environment.API_URL;
  private apiUrl: string = this._endpoint + "Inventario/"

  constructor(private _http: HttpClient) { }

  //Método para invocar al endpoint de ListaInventario.
  getList(): Observable<IInventarioDetalleDTO[]> {
    return this._http.get<{ $id: string, $values: IInventarioDetalleDTO[] }>(`${this.apiUrl}ListaInventario`)
      .pipe(
        map(response => response.$values)  // Extraer el array de $values
      );
  }
}
