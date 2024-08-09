import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IEmpleadoPersonaDTO, ICompraDTO, IProveedorPersonaDTO, 
  ICompraDetalleDTO, IInventarioDTO, IMateriaPrimaDTO, 
  ComprasService } from '../../core/services/Shopping/compras.service';


@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit { 
  listaEmpleados: IEmpleadoPersonaDTO[] = [];
  listaProveedores: IProveedorPersonaDTO[] = [];
  listaMateriasPrimas: IMateriaPrimaDTO[] = [];
  idEmpleadoActual: number = 0;
  idProveedorActual: number = 0;
  idMateriaPrimaActual: number = 0;
  detallesCompra: ICompraDetalleDTO[] = [];
  inventarios: IInventarioDTO[] = [];
  cantidadComprada: number = 0;
  precioUnitario: number = 0;
  numLote: string = '';
  fechaCaducidad: Date = new Date();

  constructor(private _comprasService: ComprasService) {}

  ngOnInit(): void {
    this.obtenerEmpleados();
    this.obtenerProveedores();
    this.obtenerMateriasPrimas();
  }

  obtenerEmpleados() {
    this._comprasService.getEmployee().subscribe({
      next: (data) => {
        console.log(data);
        this.listaEmpleados = data;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  obtenerProveedores() {
    this._comprasService.getSuppliers().subscribe({
      next: (data) => {
        console.log(data);
        this.listaProveedores = data;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  obtenerMateriasPrimas() {
    this._comprasService.getRawMaterial().subscribe({
      next: (data) => {
        console.log('Materias primas:', data);
        this.listaMateriasPrimas = data;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  agregarDetalle() {
    console.log('ID Materia Prima:', this.idMateriaPrimaActual);

    if (this.idMateriaPrimaActual === 0) {
      console.log('Seleccione una materia prima válida');
      return;
    }

    const detalle: ICompraDetalleDTO = {
      idMateriaPrima: this.idMateriaPrimaActual,      
      precioUnitario: this.precioUnitario,
      cantidad: this.cantidadComprada,
      numLote: this.numLote,
      fechaCaducidad: this.fechaCaducidad,
    };

    this.detallesCompra.push(detalle);
    console.log('Detalle agregado:', detalle);

    // Limpiar los campos del formulario
    this.idMateriaPrimaActual = 0;
    this.cantidadComprada = 0;
    this.precioUnitario = 0;
    this.numLote = '';
    this.fechaCaducidad = new Date();
  }

  obtenerNombreMateriaPrima(id: number): string {
    const materiaPrima = this.listaMateriasPrimas.find(mp => mp.idMateriaPrima === id);
    console.log('Materia Prima encontrada:', materiaPrima);
    return materiaPrima ? materiaPrima.nombre : 'Desconocido';
  }

  eliminarDetalle(index: number) {
    this.detallesCompra.splice(index, 1);
  }

  agregarCompra() {
    const request: ICompraDTO = {
      idEmpleado: this.idEmpleadoActual,
      idProveedor: this.idProveedorActual,
      fechaCompra: new Date(),
      detallesCompra: this.detallesCompra,
      inventarios: this.inventarios
    }

    this._comprasService.buy(request).subscribe({
      next: (data) => {
        this.idEmpleadoActual = 0;
        this.idProveedorActual = 0;
        this.detallesCompra = [];
        this.inventarios = [];
      }, error: (e) => { console.log(e) }
    });
  }
}
