import { Component, input } from '@angular/core';
import { IProduct, ProductItemCard } from '../../../../core/interfaces/Product';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping  } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { SaleService } from '../../../../core/services/Sale/sale.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './product-card.component.html',
  styles: ``
})
export class ProductCardComponent {
  shoppingcart: ProductItemCard[] = [];
  faCartShopping = faCartShopping;
  isResultLoades = false;
  product = input.required<IProduct>();

  constructor(private _saleService: SaleService){
    this.loadShoppingCart();
  }

  loadShoppingCart() {
    this._saleService.loadProducts().subscribe({
      next: (data) => {
        this.shoppingcart = data;
        this.isResultLoades = true;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  saveProducts(product: IProduct) {
    // Convierte el producto de IProduct a ProductItemCard
    const productItemCard: ProductItemCard = {
      product: product,
      quantity: 1
    };

    const existingProduct = this.shoppingcart.find(p => p.product.idReceta === productItemCard.product.idReceta);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.shoppingcart.push(productItemCard);
    }

    this._saleService.saveProducts(this.shoppingcart);
    
  }
}
