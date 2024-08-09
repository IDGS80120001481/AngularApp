import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecetaDetalleDTO, RecetaDTO, RecetaService } from '../../core/services/Recipe/receta.service';
import { MateriaPrima, MateriaPrimaService } from '../../core/services/RawMaterial/materia-prima.service';

@Component({
  selector: 'app-receta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {
  recetas: RecetaDTO[] = [];
  materiasPrimas: MateriaPrima[] = [];
  selecReceta: RecetaDTO = this.inicializarReceta();
  selecDetalle: RecetaDetalleDTO = this.inicializarRecetaDetalle();
  isEditing: boolean = false;

  constructor(private recetaService: RecetaService, private materiaPrimaService: MateriaPrimaService) {}

  ngOnInit(): void {
    this.getRecetas();
    this.getMateriasPrimas();
  }

  getRecetas(): void {
    this.recetaService.getRecetas().subscribe(recetas => {
      this.recetas = recetas;
    });
  }

  getMateriasPrimas(): void {
    this.materiaPrimaService.getMateriasPrimas().subscribe(materiasPrimas => {
      this.materiasPrimas = materiasPrimas;
    });
  }

  guardarReceta(): void {
    if (this.selecReceta.foto === '') {
      alert('Por favor, seleccione una imagen.');
      return;
    }
    if (this.selecReceta.precioUnitario <= 0) {
      alert('El precio unitario debe ser mayor a 0.');
      return;
    }
    if (this.selecReceta.recetaDetalles.some(detalle => detalle.cantidad <= 0)) {
      alert('La cantidad en los detalles de la receta debe ser mayor a 0.');
      return;
    }
  
    if (this.isEditing) {
      this.recetaService.updateReceta(this.selecReceta.idReceta, this.selecReceta).subscribe(() => {
        this.getRecetas();
        this.limpiar();
      });
    } else {
      this.selecReceta.estatus = 1; // Asignar estatus activo al crear una nueva receta
      this.recetaService.createReceta(this.selecReceta).subscribe(() => {
        this.getRecetas();
        this.limpiar();
      });
    }
  }  

  eliminarReceta(id: number): void {
    this.recetaService.deleteReceta(id).subscribe(() => {
      this.recetas = this.recetas.filter(r => r.idReceta !== id);
    });
  }

  inactivarReceta(id: number): void {
    const receta = this.recetas.find(r => r.idReceta === id);
    if (receta) {
      receta.estatus = 0; 
      this.recetaService.updateReceta(id, receta).subscribe(() => {
        this.getRecetas();
      });
    }
  }

  activarReceta(id: number): void {
    const receta = this.recetas.find(r => r.idReceta === id);
    if (receta) {
      receta.estatus = 1; 
      this.recetaService.updateReceta(id, receta).subscribe(() => {
        this.getRecetas();
      });
    }
  }

  seleccionarReceta(receta: RecetaDTO): void {
    this.selecReceta = { ...receta };
    this.isEditing = true;
  }

  addDetalle(): void {
    this.selecReceta.recetaDetalles.push({ ...this.selecDetalle });
    this.selecDetalle = this.inicializarRecetaDetalle();
  }

  eliminarDetalle(index: number): void {
    this.selecReceta.recetaDetalles.splice(index, 1);
  }

  limpiar(): void {
    this.selecReceta = this.inicializarReceta();
    this.selecDetalle = this.inicializarRecetaDetalle();
    this.isEditing = false;
    // Limpiar el input de archivo
    const fileInput: any = document.getElementById('foto');
    if (fileInput) {
      fileInput.value = '';
    }
  }

  imagenSeleccionada(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selecReceta.foto = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  getTamanioTexto(tamanio: number): string {
    switch (tamanio) {
      case 1:
        return 'Chico/a';
      case 2:
        return 'Mediano/a';
      case 3:
        return 'Grande';
      case 4:
        return 'Jumbo';
      default:
        return 'Desconocido';
    }
  }  

  confirmacion(id: number | undefined): void {
    if (id !== undefined && confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      this.eliminarReceta(id);
    }
  }

  private inicializarReceta(): RecetaDTO {
    return {
      idReceta: 0,
      nombre: '',
      foto: '',
      tamanio: 0,
      precioUnitario: 0,
      estatus: 0,
      recetaDetalles: []
    };
  }

  private inicializarRecetaDetalle(): RecetaDetalleDTO {
    return {
      idRecetaDetalle: 0,
      idMateriaPrima: 0,
      cantidad: 0
    };
  }
}
