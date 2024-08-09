import { Component, input } from '@angular/core';
import { IProduct, ProductItemCard } from '../../../../core/interfaces/Product';
import { SaleService } from '../../../../core/services/Sale/sale.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  product = input.required<ProductItemCard>();
  isResultLoades = false;
  

  constructor(private _saleService: SaleService){
    
  }

  // Eliminar Producto
  removeProduct(id: number){
    this._saleService.removeProduct(id)
    window.location.reload();
  }

  increaseProduct(product: IProduct){
    this._saleService.increaseProduct(product)
    window.location.reload();
  }
  
  decreaseProduct(id: number){
    this._saleService.decreaseProduct(id)
    window.location.reload();
  }
}
