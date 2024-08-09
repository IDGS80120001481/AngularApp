import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MateriaPrima {
  idMateriaPrima: number;
  nombre: string;
  tipoMedida: string;
  cantidadMinima: number;
  idProveedor: number;
  proveedor: any;
}

export interface MateriaPrimaDTO {
  nombre: string;
  tipoMedida: string;
  cantidadMinima: number;
}

@Injectable({
  providedIn: 'root'
})
export class MateriaPrimaService {
  private apiUrl = 'http://localhost:5020/api/MateriaPrimas';

  constructor(private http: HttpClient) {}

  getMateriasPrimas(): Observable<MateriaPrima[]> {
    return this.http.get<MateriaPrima[]>(`${this.apiUrl}/ListaMateriaPrima`);
  }

  getMateriaPrima(id: number): Observable<MateriaPrima> {
    return this.http.get<MateriaPrima>(`${this.apiUrl}/${id}`);
  }

  createMateriaPrima(idProveedor: number, materiaPrimaDTOs: MateriaPrimaDTO[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${idProveedor}/AgregarMateriaPrima`, materiaPrimaDTOs);
  }

  updateMateriaPrima(materiaPrima: MateriaPrima): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/ModificarMateriaPrima/${materiaPrima.idMateriaPrima}`, materiaPrima);
  }

  deleteMateriaPrima(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/EliminarMateriaPrima/${id}`);
  }
}
