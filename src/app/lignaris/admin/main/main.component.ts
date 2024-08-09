import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChartLine, faUser, faUserGear, faTruckField, faReceipt, faBagShopping, 
         faTruckRampBox, faFireBurner, faPizzaSlice, faLeftLong, faUtensils, faCartShopping, faEgg  } from '@fortawesome/free-solid-svg-icons';
import { ProductListComponent } from '../../client/cart/product-list/product-list.component';
import { ProductCardComponent } from '../../client/cart/ui/product-card/product-card.component';
import { LoginService } from '../../core/services/Login/login.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FontAwesomeModule, RouterOutlet, RouterLink, ProductListComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  authService = inject(LoginService);

  faChartLine = faChartLine;
  faUser = faUser;
  faUserGear = faUserGear;
  faTruckField = faTruckField; 
  faReceipt = faReceipt;
  faBagShopping = faBagShopping;
  faTruckRampBox = faTruckRampBox;
  faFireBurner = faFireBurner;
  faPizzaSlice = faPizzaSlice;
  faLeftLong = faLeftLong;
  faUtensils = faUtensils;
  faCartShopping = faCartShopping;
  faEgg = faEgg;
  usuario = this.authService.getUserDetail();

}
