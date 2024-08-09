import { Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProductCardComponent } from "../client/cart/ui/product-card/product-card.component";
import { ProductListComponent } from "../client/cart/product-list/product-list.component";
import { ProductItemComponent } from "../../lignaris/client/cart/product-item/product-item.component";
import { ShoppingCartComponent } from "../client/cart/shopping-cart/shoppingcart.component";
import { RawmaterialComponent } from "./rawmaterial/rawmaterial.component";
import { RecetaComponent } from "./recipe/receta.component";
import { ProveedorComponent } from "./supplier/proveedor.component";
import { InventarioComponent } from "./inventory/inventario.component";
import { ComprasComponent } from "./shopping/compras.component";


export const ADMIN_ROUTES: Routes = [
    {
        path: '', component: MainComponent, children: [
            {path: '', component: DashboardComponent},
            {path: 'dashboard', component: DashboardComponent},
            {path: 'shopping-cart', component: ShoppingCartComponent},
            {path: 'sale-cart', component: ProductListComponent},
            {path: 'raw-material', component: RawmaterialComponent},
            {path: 'recipe', component: RecetaComponent},
            {path: 'supplier', component: ProveedorComponent},
            {path: 'inventory', component: InventarioComponent},
            {path: 'shopping', component: ComprasComponent},
            {path: 'product/:id', component: ProductItemComponent },
            {path: 'product/:id', component: ProductItemComponent }
        ]
    }
]