import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { Proveedor, ProveedorService } from '../../core/services/Supplier/proveedor.service';

@Component({
  selector: 'app-proveedor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {
  proveedores: Proveedor[] = [];
  selectedProveedor: Proveedor = this.inicializarProveedor();

  constructor(private proveedorService: ProveedorService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getProveedores();
  }

  getProveedores(): void {
    this.proveedorService.getProveedores().subscribe(proveedores => {
      this.proveedores = proveedores;
      this.cdr.detectChanges();
    });
  }

  async addProveedor(proveedor: Proveedor):Promise<void>  {
    proveedor.estatus = 1;
    this.proveedorService.createProveedor(proveedor).subscribe(newProveedor => {
      console.log(newProveedor);
      this.proveedores.push(newProveedor);
      this.getProveedores();
      this.cdr.detectChanges();
      this.limpiar();
    });
  }
  

  actualizarProveedor(proveedor: Proveedor): void {
    this.proveedorService.updateProveedor(proveedor).subscribe(() => {
      this.getProveedores();
      this.limpiar();
    });
  }

  eliminarProveedor(id: number): void {
    this.proveedorService.deleteProveedor(id).subscribe(() => {
      this.proveedores = this.proveedores.filter(p => p.idProveedor !== id);
      this.cdr.detectChanges();
    });
  }

  seleccionarProveedor(proveedor: Proveedor): void {
    this.selectedProveedor = JSON.parse(JSON.stringify(proveedor));
  }

  limpiar(): void {
    this.selectedProveedor = this.inicializarProveedor();
  }

  getEstatus(estatus: number): string {
    return estatus === 1 ? 'Activo' : 'Inactivo';
  }

  inactivarProveedor(proveedor: Proveedor): void {
    proveedor.estatus = 2;
    this.actualizarProveedor(proveedor);
  }

  activarProveedor(proveedor: Proveedor): void {
    proveedor.estatus = 1;
    this.actualizarProveedor(proveedor);
  }

  confirmacion(id: number | undefined): void {
    if (id !== undefined && confirm('¿Estás seguro de que quieres eliminar este proveedor?')) {
      this.eliminarProveedor(id);
    }
  }

  private inicializarProveedor(): Proveedor {
    return {
      idProveedor: 0,
      idPersona: 0,
      persona: {
        idPersona: 0,
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        telefono: '',
        direccion: '',
        email: ''
      },
      estatus: 1
    };
  }
}
