import { ChangeDetectorRef, Component } from '@angular/core';
import { MateriaPrima, MateriaPrimaDTO, MateriaPrimaService } from '../../core/services/RawMaterial/materia-prima.service';
import { ProveedorMateriaPrima, ProveedorService } from '../../core/services/Supplier/proveedor.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rawmaterial',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rawmaterial.component.html',
  styleUrl: './rawmaterial.component.css'
})
export class RawmaterialComponent {
  materiasPrimas: MateriaPrima[] = [];
  proveedores: ProveedorMateriaPrima[] = [];
  selectedMateriaPrima: MateriaPrima = this.inicializarMateriaPrima();
  selectedProveedorId: number = 0;

  constructor(
    private materiaPrimaService: MateriaPrimaService,
    private proveedorService: ProveedorService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getMateriasPrimas();
    this.getProveedores();
  }

  getMateriasPrimas(): void {
    this.materiaPrimaService.getMateriasPrimas().subscribe(materiasPrimas => {
      this.materiasPrimas = materiasPrimas;
      this.cdr.detectChanges();
    });
  }

  getProveedores(): void {
    this.proveedorService.getProveedoresMateriaPrima().subscribe(proveedores => {
      this.proveedores = proveedores;
      this.cdr.detectChanges();
    });
  }

  guardarMateriaPrima(): void {
    if (this.selectedMateriaPrima.idMateriaPrima === 0) {
      // Adding a new materia prima
      const materiaPrimaDTO: MateriaPrimaDTO = {
        nombre: this.selectedMateriaPrima.nombre,
        tipoMedida: this.selectedMateriaPrima.tipoMedida,
        cantidadMinima: this.selectedMateriaPrima.cantidadMinima
      };
  
      this.materiaPrimaService.createMateriaPrima(this.selectedProveedorId, [materiaPrimaDTO]).subscribe(() => {
        this.getMateriasPrimas();
        this.limpiar();
      });
    } else {
      this.selectedMateriaPrima.idProveedor = this.selectedProveedorId;
  
      this.materiaPrimaService.updateMateriaPrima(this.selectedMateriaPrima).subscribe(() => {
        this.getMateriasPrimas();
        this.limpiar();
      });
    }
  }
  

  eliminarMateriaPrima(id: number): void {
    this.materiaPrimaService.deleteMateriaPrima(id).subscribe(() => {
      this.materiasPrimas = this.materiasPrimas.filter(mp => mp.idMateriaPrima !== id);
      this.cdr.detectChanges();
    });
  }

  seleccionarMateriaPrima(materiaPrima: MateriaPrima): void {
    this.selectedMateriaPrima = { ...materiaPrima };
    this.selectedProveedorId = materiaPrima.idProveedor;
  }

  limpiar(): void {
    this.selectedMateriaPrima = this.inicializarMateriaPrima();
    this.selectedProveedorId = 0;
  }

  getProveedorNombre(id: number): string {
    const proveedor = this.proveedores.find(p => p.idProveedor === id);
    return proveedor ? proveedor.nombre + ' ' + proveedor.apellidoPaterno + ' ' + proveedor.apellidoMaterno: 'Desconocido';
  }

  confirmacion(id: number | undefined): void {
    if (id !== undefined && confirm('¿Estás seguro de que quieres eliminar esta materia prima?')) {
      this.eliminarMateriaPrima(id);
    }
  }

  private inicializarMateriaPrima(): MateriaPrima {
    return {
      idMateriaPrima: 0,
      nombre: '',
      tipoMedida: '',
      cantidadMinima: 0,
      idProveedor: 0,
      proveedor: null
    };
  }

}
