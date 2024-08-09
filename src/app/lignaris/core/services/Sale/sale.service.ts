import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProduct, ProductItemCard } from '../../interfaces/Product';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private apiUrl = environment.API_URL;

  constructor(private _http: HttpClient) { }

  //Metodo para invocar los productos
  getRecipes(): Observable<IProduct[]> {
    return this._http.get<IProduct[]>(`${this.apiUrl}/Venta`);
  }

  getRecipeID(id: string):Observable<IProduct> {
    return this._http.get<IProduct>(`${this.apiUrl}/Venta/${id}`);
  }

  loadProducts():Observable<ProductItemCard[]> {
    const rawProducts = localStorage.getItem('products'); 
    return of(rawProducts ? JSON.parse(rawProducts) : [])
  }

  saveProducts(products: ProductItemCard[]): void{
    localStorage.setItem('products', JSON.stringify(products));
  }

  removeProduct(productId: number): void {
    const storedCart = JSON.parse(localStorage.getItem('products') || '[]') as ProductItemCard[];
    const updatedCart = storedCart.filter((p: ProductItemCard) => p.product.idReceta !== productId);

    this.saveProducts(updatedCart);
    this.loadProducts();
  }

  decreaseProduct(productId: number): void {
    // Cargar el carrito desde localStorage
    const storedCart = JSON.parse(localStorage.getItem('products') || '[]') as ProductItemCard[];
    const product = storedCart.find((p: ProductItemCard) => p.product.idReceta === productId);
  
    if (product) {
      product.quantity -= 1;
  
      if (product.quantity <= 0) {
        const updatedCart = storedCart.filter((p: ProductItemCard) => p.product.idReceta !== productId);
        this.saveProducts(updatedCart);
      } else {
        this.saveProducts(storedCart);
      }
    }
  }

  increaseProduct(product: IProduct): void {
    const productItemCard: ProductItemCard = {
      product: product,
      quantity: 1
    };
  
    const shoppingcart = JSON.parse(localStorage.getItem('products') || '[]') as ProductItemCard[];
    const existingProduct = shoppingcart.find((p: ProductItemCard) => p.product.idReceta === productItemCard.product.idReceta);
  
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      shoppingcart.push(productItemCard);
    }
  
    this.saveProducts(shoppingcart);
  }

  getTotal(): number {
    const shoppingcart = JSON.parse(localStorage.getItem('products') || '[]') as ProductItemCard[];

    var result = 0;
    for(var i = 0; i < shoppingcart.length; i++){
      result += shoppingcart[i].product.precioUnitario * shoppingcart[i].quantity
    }

    return result
  }

}
