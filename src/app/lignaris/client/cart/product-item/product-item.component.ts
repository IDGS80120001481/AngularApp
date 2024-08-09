import { Component, effect, input } from '@angular/core';
import { IProduct } from '../../../core/interfaces/Product';
import { SaleService } from '../../../core/services/Sale/sale.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  id = input.required<string>();

  product: IProduct = 
  {
    idReceta: 0,
    nombre: '',
    foto: '',
    tamanio: 0,
    precioUnitario: 0,
    descripcion: '',
    estatus: 0
  }
  isResultLoades = false;

  constructor(private _saleService: SaleService){
    effect(() => {
      this.getProduct(this.id());
    });
  }

  getProduct(id: string){
    this._saleService.getRecipeID(id).subscribe({
      next: (data) => {
        this.product = data;
        this.isResultLoades = true;
        console.log(data)
      }, error:(e) => {
        console.log(e);
      }
    });
  }

  }
