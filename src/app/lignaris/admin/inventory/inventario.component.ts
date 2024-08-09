import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IInventarioDetalleDTO, InventarioService } from '../../core/services/Inventory/inventario.service';


@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  listaInventario: IInventarioDetalleDTO[] = [];

  constructor(private _inventarioService: InventarioService) {}

  ngOnInit(): void {
    this.obtenerInventario();
  }

  obtenerInventario() {
    this._inventarioService.getList().subscribe({
      next: (data) => {
        console.log(data);
        this.listaInventario = data;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
}
