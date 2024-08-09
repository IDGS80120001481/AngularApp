import { Component, inject } from '@angular/core';
import { SaleService } from '../../../core/services/Sale/sale.service';
import { IProduct, ProductItemCard } from '../../../core/interfaces/Product';
import { ProductCardComponent } from '../ui/product-card/product-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, FontAwesomeModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent { 
  productsList: IProduct[] = [];
  isResultLoades = false;
  faSearch = faSearch;

  constructor(private _saleService: SaleService){
    this.allRecipes()
  }

  allRecipes(){
    this._saleService.getRecipes().subscribe({
      next: (data) => {
        this.productsList = data;
        this.isResultLoades = true;
        console.log(data)
      }, error:(e) => {
        console.log(e);
      }
    });
  }

  // Mostrar Productos del carrito
  shoppingcart: ProductItemCard[] = [];
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
}
