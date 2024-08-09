import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RecetaDetalleDTO {
  idRecetaDetalle: number;
  idMateriaPrima: number;
  cantidad: number;
}

export interface RecetaDTO {
  idReceta: number;
  nombre: string;
  foto: string;
  tamanio: number;
  precioUnitario: number;
  estatus: number;
  recetaDetalles: RecetaDetalleDTO[];
}

@Injectable({
  providedIn: 'root'
})
export class RecetaService {
  private apiUrl = 'http://localhost:5020/api/Recetas';

  constructor(private http: HttpClient) {}

  getRecetas(): Observable<RecetaDTO[]> {
    return this.http.get<RecetaDTO[]>(`${this.apiUrl}/ListaRecetas`);
  }

  getReceta(id: number): Observable<RecetaDTO> {
    return this.http.get<RecetaDTO>(`${this.apiUrl}/ListaRecetas/${id}`);
  }

  createReceta(receta: RecetaDTO): Observable<RecetaDTO> {
    return this.http.post<RecetaDTO>(`${this.apiUrl}/AgregarReceta`, receta);
  }

  updateReceta(id: number, receta: RecetaDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/ModificarReceta/${id}`, receta);
  }

  deleteReceta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/EliminarReceta/${id}`);
  }
}
