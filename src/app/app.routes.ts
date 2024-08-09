import { Routes } from '@angular/router';
import { LoginComponent } from './lignaris/auth/login/login.component';

export const routes: Routes = [
    {
        path: '', component: LoginComponent
    },
    {
        path:'admin',
        loadChildren: () => import('./lignaris/admin/admin.routes').then(m => m.ADMIN_ROUTES)
    },
    {
        path:'client',
        loadChildren: () => import('./lignaris/client/client.routes').then(m => m.CLIENT_ROUTES)
    },
    {
        path:'auth',
        loadChildren: () => import('./lignaris/auth/auth.routes').then(m => m.AUTH_ROUTES)
    }
];
