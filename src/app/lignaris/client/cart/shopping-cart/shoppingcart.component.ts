import { Component } from '@angular/core';
import { ProductItemCard } from '../../../core/interfaces/Product';
import { SaleService } from '../../../core/services/Sale/sale.service';
import { CartComponent } from '../ui/cart/cart.component';

@Component({
  selector: 'app-shoppingcart',
  standalone: true,
  imports: [CartComponent],
  templateUrl: './shoppingcart.component.html',
  styleUrl: './shoppingcart.component.css'
})
export class ShoppingCartComponent {
  shoppingcart: ProductItemCard[] = [];
  isResultLoades = false;
  totalPrice = 0;

  constructor(private _saleService: SaleService){
    this.loadShoppingCart()
  }

  loadShoppingCart() {
    this._saleService.loadProducts().subscribe({
      next: (data) => {
        this.shoppingcart = data;
        this.isResultLoades = true;
        this.getTotalPrice()
      },
      error: (e) => {
        console.log(e);
      }
    });
  }


  // Agregar el precio total
  getTotalPrice() {
    this.totalPrice = this._saleService.getTotal();
  }
}
