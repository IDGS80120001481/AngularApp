import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Persona {
  idPersona: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  telefono: string;
  direccion: string;
  email: string;
}

export interface Proveedor {
  idProveedor: number;
  idPersona: number;
  persona: Persona;
  estatus: number;
}

export interface ProveedorMateriaPrima {
  idProveedor: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private apiUrl = 'http://localhost:5020/api/Proveedores';

  constructor(private http: HttpClient) {}

  getProveedoresMateriaPrima(): Observable<ProveedorMateriaPrima[]> {
    return this.http.get<ProveedorMateriaPrima[]>(`${this.apiUrl}/ProveedoresMateriaPrima`);
  }

  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(`${this.apiUrl}/ListaProveedores`);
  }

  createProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(`${this.apiUrl}/AgregarProveedor`, proveedor);
  }

  updateProveedor(proveedor: Proveedor): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/ModificarProveedor/${proveedor.idProveedor}`, proveedor);
  }

  deleteProveedor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/EliminarProveedor/${id}`);
  }
}
